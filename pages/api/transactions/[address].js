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
    // V2 API for transactions
    const txResponse = await axios.get(
      `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${address}&page=${pageNum}&offset=${offsetNum}&sort=desc&apikey=${ETHERSCAN_API_KEY}`,
      {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SmartContractDashboard/1.0)',
          'Accept': 'application/json'
        }
      }
    );

    if (txResponse.data.status !== '1') {
      return res.status(404).json({
        error: 'No transactions found',
        details: txResponse.data.result || txResponse.data.message
      });
    }

    const transactions = txResponse.data.result.map(tx => ({
      hash: tx.hash,
      from: tx.from.toLowerCase(),
      to: tx.to.toLowerCase(),
      value: (parseInt(tx.value) / 1e18).toFixed(6),
      gasUsed: parseInt(tx.gasUsed),
      gasPrice: parseInt(tx.gasPrice),
      timestamp: parseInt(tx.timeStamp) * 1000,
      status: tx.isError === '0' ? 'success' : 'failed',
      blockNumber: parseInt(tx.blockNumber),
      functionName: tx.functionName || 'Transfer'
    }));

    res.status(200).json({
      transactions,
      total: transactions.length,
      page: pageNum
    });
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
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
      error: 'Failed to fetch transactions',
      details: error.message
    });
  }
}
