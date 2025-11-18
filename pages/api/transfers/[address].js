import axios from 'axios';

export default async function handler(req, res) {
  const { address } = req.query;
  const { page = 1, offset = 20 } = req.query;

  // Input validation
  if (!address) {
    return res.status(400).json({ error: 'Contract address is required' });
  }

  // Validate Ethereum address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid Ethereum address format' });
  }

  // Validate pagination parameters
  const pageNum = parseInt(page);
  const offsetNum = parseInt(offset);

  if (isNaN(pageNum) || pageNum < 1) {
    return res.status(400).json({ error: 'Invalid page number' });
  }

  if (isNaN(offsetNum) || offsetNum < 1 || offsetNum > 10000) {
    return res.status(400).json({ error: 'Invalid offset (1-10000)' });
  }

  const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

  if (!ETHERSCAN_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // V2 API for token transfers
    const transferResponse = await axios.get(
      `https://api.etherscan.io/v2/api?chainid=1&module=account&action=tokentx&address=${address}&page=${pageNum}&offset=${offsetNum}&sort=desc&apikey=${ETHERSCAN_API_KEY}`,
      {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SmartContractDashboard/1.0)',
          'Accept': 'application/json'
        }
      }
    );

    if (transferResponse.data.status !== '1') {
      return res.status(404).json({
        error: 'No token transfers found',
        details: transferResponse.data.result || transferResponse.data.message
      });
    }

    const transfers = transferResponse.data.result.map(transfer => {
      const decimals = parseInt(transfer.tokenDecimal || 18);
      const value = parseInt(transfer.value);
      const formattedValue = decimals > 0 ? (value / Math.pow(10, decimals)).toFixed(6) : value.toString();

      return {
        hash: transfer.hash,
        from: transfer.from.toLowerCase(),
        to: transfer.to.toLowerCase(),
        value: formattedValue,
        tokenSymbol: transfer.tokenSymbol || 'UNKNOWN',
        tokenName: transfer.tokenName || 'Unknown Token',
        tokenDecimal: transfer.tokenDecimal || '18',
        contractAddress: transfer.contractAddress.toLowerCase(),
        timestamp: parseInt(transfer.timeStamp) * 1000,
        blockNumber: parseInt(transfer.blockNumber)
      };
    });

    res.status(200).json({
      transfers,
      total: transfers.length,
      page: pageNum
    });
  } catch (error) {
    console.error('Error fetching token transfers:', error.message);
    if (error.response) {
      // Handle rate limiting
      if (error.response.status === 429) {
        return res.status(429).json({
          error: 'Rate limit exceeded. Please try again later.',
          details: 'Too many requests to Etherscan API'
        });
      }
    }
    res.status(500).json({
      error: 'Failed to fetch token transfers',
      details: error.message
    });
  }
}
