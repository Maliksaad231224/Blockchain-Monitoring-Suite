# 🚀 Quick Start Guide - SmartMonitor SaaS Dashboard

## Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
cd smart-contract-dashboard
pnpm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory:

```env
# Blockchain APIs
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_api_key
NEXT_PUBLIC_ALCHEMY_WS_URL=wss://eth-mainnet.g.alchemy.com/v2/your_alchemy_key

# Optional: For advanced features
NEXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_key
```

Get API keys from:
- **Etherscan**: https://etherscan.io/apis
- **Alchemy**: https://www.alchemy.com/
- **CoinGecko**: https://www.coingecko.com/api

### 3. Run Development Server
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. First Time User Flow

1. **Landing Page** - You'll see the marketing homepage with features and pricing
2. **Get Started** - Click "Get Started Free" to enter the dashboard
3. **Monitor a Contract** - Enter an Ethereum contract address (e.g., `0xdAC17F958D2ee523a2206206994597C13D831ec7` for USDT)
4. **View Analytics** - See real-time transaction activity and charts
5. **Explore Features** - Check out Contracts, Alerts, and Analytics pages

## 🗺️ Navigation Guide

### Pages Overview

| Page | URL | Purpose |
|------|-----|---------|
| Landing | `/` | Marketing page with features and pricing |
| Dashboard | `/dashboard` | Main contract monitoring interface |
| Contracts | `/contracts` | Manage all monitored contracts |
| Alerts | `/alerts` | Create and manage alerts |
| Analytics | `/analytics` | View detailed analytics and metrics |
| Settings | `/settings` | User account and preferences |
| Login | `/login` | User authentication |

### Sidebar Navigation (When Logged In)

- 📊 **Dashboard** - Main monitoring interface
- 🛡️ **Contracts** - Contract management
- 📈 **Analytics** - Advanced analytics
- ⚡ **Alerts** - Alert management (shows badge with count)
- ⚙️ **Settings** - Account settings
- ❓ **Help & Support** - Documentation and support

## 💡 Features to Try

### 1. Monitor Your First Contract
1. Go to Dashboard
2. Enter a contract address in the search box
3. Click the search button or press Enter
4. View real-time data, transactions, and transfers
5. Try the demo with USDT contract

### 2. Explore Multiple Contracts
1. Go to Contracts page
2. View all monitored contracts in a table
3. Copy addresses, refresh data, or delete contracts
4. Click "Add Contract" to add a new one

### 3. Set Up Alerts
1. Go to Alerts page
2. Click "Create Alert"
3. Configure alert conditions (volume, suspicious activity, gas spikes)
4. Choose notification method (email, push, SMS)

### 4. View Advanced Analytics
1. Go to Analytics page
2. See 7-day activity trends
3. Monitor gas prices
4. View contract type distribution
5. Check top contracts by volume

### 5. Customize Your Settings
1. Go to Settings page
2. Update profile information
3. Change password
4. Configure notification preferences
5. Manage API keys and 2FA

## 🎨 Customization

### Change Colors
Edit colors in components:
```jsx
// Example: Change primary color from blue to your brand color
className="from-blue-600 to-purple-600"
// Change to your brand colors
```

### Add Your Logo
Replace the "SC" logo in Header and LandingPage:
```jsx
{/* Replace with your logo */}
<img src="/logo.png" alt="Logo" className="w-8 h-8" />
```

### Update Company Info
Update in LandingPage and Footer:
- Company name
- Contact information
- Social media links
- Navigation links

## 📊 Component Hierarchy

```
App (index.js)
├── LandingPage (logged out)
└── Header + Sidebar + Main Content (logged in)
    ├── Dashboard (/dashboard)
    ├── Contracts (/contracts)
    ├── Alerts (/alerts)
    ├── Analytics (/analytics)
    ├── Settings (/settings)
    └── Login (/login)
```

## 🔌 API Integration

The app expects these API endpoints:

```javascript
// Get contract info
GET /api/contract/[address]

// Get transactions
GET /api/transactions/[address]?page=1&offset=20

// Get token transfers
GET /api/transfers/[address]?page=1&offset=20

// Get price data
GET /api/price/[address]
```

Make sure your API routes return the expected data structure.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Deploy to Docker

```bash
# Build image
docker build -t smartmonitor .

# Run container
docker run -p 3000:3000 smartmonitor
```

### Deploy to Any Node Server

```bash
pnpm build
pnpm start
```

## 🐛 Troubleshooting

### Components not rendering?
- Check if all dependencies are installed: `pnpm install`
- Verify file paths are correct
- Check browser console for errors

### Charts not showing?
- Ensure Recharts is installed: `pnpm add recharts`
- Check that data is being passed correctly
- Verify CSS is loaded

### API errors?
- Check API keys in `.env.local`
- Verify API endpoints are correct
- Check browser Network tab for failed requests
- Ensure CORS is configured on backend

### Styling issues?
- Make sure Tailwind CSS is configured
- Check `tailwind.config.js` exists
- Rebuild CSS: `pnpm dev`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Lucide Icons](https://lucide.dev)

## 🆘 Getting Help

- Check UPGRADE_NOTES.md for detailed feature documentation
- Check CHANGES.md for all modifications
- Review component files for implementation details
- Check API routes for data structure requirements

## 📝 Next Steps After Setup

1. ✅ Install dependencies
2. ✅ Set up environment variables
3. ✅ Run `pnpm dev`
4. ✅ Test the landing page and dashboard
5. ✅ Implement authentication backend
6. ✅ Connect your API endpoints
7. ✅ Customize branding and colors
8. ✅ Deploy to production

## 🎉 You're All Set!

Your professional SaaS dashboard is ready to go. Start monitoring smart contracts in real-time!

Have questions? Check the documentation files or review the component source code.

Happy monitoring! 🚀
