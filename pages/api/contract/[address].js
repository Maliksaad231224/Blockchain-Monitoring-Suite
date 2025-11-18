import axios from 'axios';

export default async function handler(req, res) {
  const { address } = req.query;

  console.log('=== CONTRACT API CALLED ===');
  console.log('Address:', address);

  // Input validation
  if (!address) {
    return res.status(400).json({ error: 'Contract address is required' });
  }

  // Validate Ethereum address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid Ethereum address format' });
  }

  const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

  if (!ETHERSCAN_API_KEY) {
    console.error('❌ No API key found!');
    return res.status(500).json({ error: 'API key not configured' });
  }

  console.log('✅ Using Etherscan API V2');

  try {
    // V2 API endpoint with chainid=1
    const url = `https://api.etherscan.io/v2/api?chainid=1&module=contract&action=getsourcecode&address=${address}&apikey=${ETHERSCAN_API_KEY}`;

    console.log('🔍 Fetching from Etherscan V2...');

    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SmartContractDashboard/1.0)',
        'Accept': 'application/json'
      }
    });

    console.log('📦 Response status:', response.data.status);
    console.log('📦 Response message:', response.data.message);

    if (response.data.status !== '1') {
      console.error('❌ Error:', response.data.result);
      return res.status(404).json({
        error: 'Contract not found',
        details: response.data.result || response.data.message
      });
    }

    const contractData = response.data.result[0];
    console.log('✅ Contract found:', contractData.ContractName);

    // Parse token type from ABI with better error handling
    let tokenType = 'Contract';
    if (contractData.ABI && contractData.ABI !== 'Contract source code not verified') {
      try {
        const abi = JSON.parse(contractData.ABI);
        if (Array.isArray(abi)) {
          const hasTransfer = abi.some(item => item.name === 'transfer');
          const hasBalanceOf = abi.some(item => item.name === 'balanceOf');
          const hasOwnerOf = abi.some(item => item.name === 'ownerOf');

          if (hasOwnerOf) {
            tokenType = 'ERC721';
          } else if (hasTransfer && hasBalanceOf) {
            tokenType = 'ERC20';
          }
        }
      } catch (e) {
        console.log('Could not parse ABI:', e.message);
      }
    }

    const result = {
      address: address.toLowerCase(),
      name: contractData.ContractName || 'Unknown Contract',
      compiler: contractData.CompilerVersion || 'Unknown',
      verified: contractData.ABI !== 'Contract source code not verified',
      tokenType: tokenType,
      optimizationUsed: contractData.OptimizationUsed === '1',
      runs: contractData.Runs || '0'
    };

    console.log('✅ Returning contract data:', result.name);
    return res.status(200).json(result);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('❌ Response data:', error.response.data);
      // Handle rate limiting
      if (error.response.status === 429) {
        return res.status(429).json({
          error: 'Rate limit exceeded. Please try again later.',
          details: 'Too many requests to Etherscan API'
        });
      }
    }
    return res.status(500).json({
      error: 'Failed to fetch contract data',
      details: error.message
    });
  }
}
