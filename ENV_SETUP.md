# Environment Configuration Guide

## .env.local Setup

Create a `.env.local` file in your project root with the following variables:

### Required API Keys

```env
# Etherscan API (Required for contract data)
# Get from: https://etherscan.io/apis
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Alchemy WebSocket URL (Optional but recommended for real-time updates)
# Get from: https://www.alchemy.com/
NEXT_PUBLIC_ALCHEMY_WS_URL=wss://eth-mainnet.g.alchemy.com/v2/your_alchemy_key_here
```

### Optional Configuration

```env
# CoinGecko API (For price data)
# Get from: https://www.coingecko.com/api
NEXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_key

# Backend API URL (If using separate backend)
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Environment
NEXT_PUBLIC_ENV=development
```

## Getting API Keys

### 1. Etherscan API Key

1. Visit https://etherscan.io/apis
2. Create a free account or sign in
3. Create a new API token
4. Copy the key to `NEXT_PUBLIC_ETHERSCAN_API_KEY`

**What it's used for:**
- Contract information (name, symbol, decimals)
- Transaction history
- Token transfer data
- Contract verification status
- Gas usage information

### 2. Alchemy WebSocket URL

1. Visit https://www.alchemy.com/
2. Sign up for a free account
3. Create a new application
4. Get the WebSocket URL for Ethereum Mainnet
5. Copy to `NEXT_PUBLIC_ALCHEMY_WS_URL`

**What it's used for:**
- Real-time event notifications
- Live transaction updates
- WebSocket subscriptions (optional feature)

### 3. CoinGecko API Key (Optional)

1. Visit https://www.coingecko.com/api
2. No signup needed for free tier
3. Optional: Create account for extended limits

**What it's used for:**
- Token price data
- Market cap information
- Volume tracking
- Price history charts

## Environment Setup Example

### Development Environment (.env.local)

```env
# Development configuration
NEXT_PUBLIC_ETHERSCAN_API_KEY=YourEtherscanKeyHere
NEXT_PUBLIC_ALCHEMY_WS_URL=wss://eth-mainnet.g.alchemy.com/v2/YourAlchemyKeyHere
NEXT_PUBLIC_COINGECKO_API_KEY=YourCoinGeckoKeyHere
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Production Environment (.env.production.local)

```env
# Production configuration
NEXT_PUBLIC_ETHERSCAN_API_KEY=YourProductionEtherscanKey
NEXT_PUBLIC_ALCHEMY_WS_URL=wss://eth-mainnet.g.alchemy.com/v2/YourProductionAlchemyKey
NEXT_PUBLIC_COINGECKO_API_KEY=YourProductionCoinGeckoKey
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_API_URL=https://api.yourproduction.com/api
```

## Network Support

The app currently supports Ethereum mainnet. To add support for other networks:

### Supported Networks to Add:

```env
# Polygon (Matic)
NEXT_PUBLIC_POLYGON_SCAN_API_KEY=key
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-rpc.com

# Arbitrum
NEXT_PUBLIC_ARBITRUM_SCAN_API_KEY=key
NEXT_PUBLIC_ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc

# Optimism
NEXT_PUBLIC_OPTIMISM_SCAN_API_KEY=key
NEXT_PUBLIC_OPTIMISM_RPC_URL=https://mainnet.optimism.io

# Base
NEXT_PUBLIC_BASE_SCAN_API_KEY=key
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
```

## API Rate Limits

### Etherscan Free Tier
- 5 calls/second
- 100,000 calls/day

### Alchemy Free Tier
- 25 million compute units/month
- 15 requests/second

### CoinGecko Free Tier
- 10-50 calls/minute
- Varies by endpoint

## Security Considerations

⚠️ **Important Security Notes:**

1. **Never commit `.env.local` to git**
   - Add to `.gitignore`:
   ```
   .env.local
   .env*.local
   ```

2. **Use different keys for dev and production**
   - Keep separate API keys
   - Rotate keys periodically

3. **Monitor API usage**
   - Watch for unusual activity
   - Set up billing alerts
   - Use API key restrictions if available

4. **Public vs Private Keys**
   - `NEXT_PUBLIC_*` variables are visible in browser (safe for keys with usage restrictions)
   - Sensitive backend keys should not use `NEXT_PUBLIC_` prefix

## Verifying Configuration

Test your setup:

```javascript
// pages/api/test-config.js
export default function handler(req, res) {
  res.status(200).json({
    etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY ? '✓' : '✗',
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_WS_URL ? '✓' : '✗',
    coingecko: process.env.NEXT_PUBLIC_COINGECKO_API_KEY ? '✓' : '✗',
  })
}
```

Visit `http://localhost:3000/api/test-config` to verify.

## Troubleshooting

### "API key is invalid"
- Double-check you copied the key correctly
- No extra spaces or special characters
- Key hasn't been revoked

### "Rate limit exceeded"
- Upgrade to premium tier
- Implement caching
- Reduce API call frequency
- Use batch requests

### "CORS error"
- Some APIs have CORS restrictions
- Use backend proxy for CORS-restricted APIs
- Check API documentation for allowed origins

### "Undefined variables in components"
- Make sure variable names start with `NEXT_PUBLIC_`
- Restart dev server after adding new env variables
- Check `.env.local` file exists in project root

## Environment in Next.js

Next.js loads environment variables in this order:

1. `.env.local` (local development)
2. `.env.development.local` (development)
3. `.env` (all environments)

For more info: https://nextjs.org/docs/basic-features/environment-variables

## Production Deployment

### Vercel
1. Go to project settings
2. Go to Environment Variables
3. Add each variable
4. Redeploy

### Docker
```dockerfile
ENV NEXT_PUBLIC_ETHERSCAN_API_KEY=${ETHERSCAN_API_KEY}
ENV NEXT_PUBLIC_ALCHEMY_WS_URL=${ALCHEMY_WS_URL}
```

### Self-hosted
1. Create `.env.production.local` with production keys
2. Build: `pnpm build`
3. Deploy with environment variables set

## Quick Reference

| Variable | Required | Format | Purpose |
|----------|----------|--------|---------|
| `NEXT_PUBLIC_ETHERSCAN_API_KEY` | ✓ | String | Contract data |
| `NEXT_PUBLIC_ALCHEMY_WS_URL` | Optional | WebSocket URL | Real-time updates |
| `NEXT_PUBLIC_COINGECKO_API_KEY` | Optional | String | Price data |
| `NEXT_PUBLIC_API_URL` | Optional | URL | Backend API |
| `NEXT_PUBLIC_ENV` | Optional | String | Environment type |

## Support

For API key issues, contact respective service support:
- **Etherscan**: support@etherscan.io
- **Alchemy**: support@alchemy.com
- **CoinGecko**: support@coingecko.com
