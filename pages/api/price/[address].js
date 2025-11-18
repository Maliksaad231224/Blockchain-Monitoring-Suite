import axios from 'axios';

// Token address to CoinGecko ID mapping (common tokens)
const TOKEN_ID_MAP = {
  '0xdac17f958d2ee523a2206206994597c13d831ec7': 'tether', // USDT
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 'usd-coin', // USDC
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': 'weth', // WETH
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': 'wrapped-bitcoin', // WBTC
  '0x6b175474e89094c44da98b954eedeac495271d0f': 'dai', // DAI
  '0x514910771af9ca656af840dff83e8264ecf986ca': 'chainlink', // LINK
  '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0': 'matic-network', // MATIC
  '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984': 'uniswap', // UNI
  '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9': 'aave', // AAVE
  '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce': 'shiba-inu', // SHIB
};

export default async function handler(req, res) {
  const { address } = req.query;

  // Input validation
  if (!address) {
    return res.status(400).json({ error: 'Contract address is required' });
  }

  // Validate Ethereum address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid Ethereum address format' });
  }

  const normalizedAddress = address.toLowerCase();

  try {
    // Check if we have a CoinGecko ID for this token
    const coinId = TOKEN_ID_MAP[normalizedAddress];

    if (!coinId) {
      // Try to get token info from CoinGecko by contract address
      try {
        const contractResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`,
          {
            timeout: 10000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; SmartContractDashboard/1.0)',
              'Accept': 'application/json'
            }
          }
        );

        if (contractResponse.data) {
          const marketData = contractResponse.data.market_data;
          const priceData = {
            price: marketData?.current_price?.usd || 0,
            priceChange24h: marketData?.price_change_percentage_24h || 0,
            marketCap: marketData?.market_cap?.usd || 0,
            volume24h: marketData?.total_volume?.usd || 0,
            symbol: contractResponse.data.symbol?.toUpperCase() || '',
            name: contractResponse.data.name || '',
            image: contractResponse.data.image?.small || null
          };

          return res.status(200).json(priceData);
        }
      } catch (err) {
        console.log('Token not found on CoinGecko by contract address:', err.message);
      }

      return res.status(404).json({
        error: 'Price data not available for this token'
      });
    }

    // Fetch price data using CoinGecko ID
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`,
      {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SmartContractDashboard/1.0)',
          'Accept': 'application/json'
        }
      }
    );

    if (!response.data || !response.data[coinId]) {
      return res.status(404).json({ error: 'Price data not found' });
    }

    const data = response.data[coinId];
    const priceData = {
      price: data.usd || 0,
      priceChange24h: data.usd_24h_change || 0,
      marketCap: data.usd_market_cap || 0,
      volume24h: data.usd_24h_vol || 0
    };

    res.status(200).json(priceData);
  } catch (error) {
    console.error('Error fetching price data:', error.message);

    if (error.response) {
      // Handle rate limiting
      if (error.response.status === 429) {
        return res.status(429).json({
          error: 'Rate limit exceeded. Please try again later.',
          details: 'Too many requests to CoinGecko API'
        });
      }
    }

    // Return graceful fallback
    res.status(500).json({
      error: 'Failed to fetch price data',
      details: error.message
    });
  }
}
