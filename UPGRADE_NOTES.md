# SmartMonitor - SaaS Level Smart Contract Dashboard

A professional, enterprise-grade blockchain monitoring platform built with Next.js, React, and Tailwind CSS. Monitor smart contracts in real-time across multiple blockchains.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Contract Monitoring** - Track smart contract activity instantly with live updates
- **Advanced Analytics** - Comprehensive insights into transaction volumes, gas usage, and token transfers
- **Multiple Data Points** - Monitor transactions, token transfers, price data, and holder information
- **Interactive Charts** - Visual representation of 7-day activity trends
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### 🏢 SaaS Features
- **Professional UI/UX** - Modern, clean design following SaaS best practices
- **Authentication** - User login and registration system
- **Dashboard** - Personalized contract monitoring hub
- **Sidebar Navigation** - Easy access to all features
- **Settings** - Comprehensive user preferences and account management
- **Alerts Management** - Create and manage smart contract alerts
- **Contract Management** - Add, monitor, and delete tracked contracts
- **Notifications** - Multi-channel notification preferences (email, push, SMS)
- **Security** - Two-factor authentication and API key management

### 📊 Pages & Sections
1. **Landing Page** - Feature showcase, pricing plans, and call-to-action
2. **Dashboard** - Main monitoring interface with contract search
3. **Contracts** - Manage all monitored contracts with detailed stats
4. **Alerts** - View and manage contract alerts and notifications
5. **Settings** - Account preferences, security, and notification settings
6. **Login** - User authentication interface

## 🛠 Tech Stack

- **Frontend Framework**: Next.js 14.0.4
- **UI Library**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.6
- **Charts**: Recharts 2.10.3
- **Icons**: Lucide React 0.263.1
- **Blockchain**: ethers.js 6.9.0
- **HTTP Client**: axios 1.6.2

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/pnpm
- Etherscan API key (for contract data)
- Alchemy API key (optional, for WebSocket support)
- CoinGecko API access (for price data)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd smart-contract-dashboard

# Install dependencies
pnpm install

# Create environment variables
cp .env.example .env.local

# Add your API keys to .env.local
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_key_here
NEXT_PUBLIC_ALCHEMY_WS_URL=your_websocket_url
```

### Running Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
smart-contract-dashboard/
├── components/
│   ├── Header.jsx           # Top navigation with user menu
│   ├── Sidebar.jsx          # Left navigation sidebar
│   ├── Dashboard.jsx        # Original dark dashboard (legacy)
│   ├── DashboardContent.jsx # New light dashboard content
│   ├── LandingPage.jsx      # Marketing landing page
│   ├── Card.jsx             # Reusable card components
│   └── Button.jsx           # Reusable button component
├── pages/
│   ├── index.js             # Home (landing/dashboard switch)
│   ├── dashboard.js         # Dashboard page
│   ├── contracts.js         # Contract management
│   ├── alerts.js            # Alert management
│   ├── settings.js          # User settings
│   ├── login.js             # Login page
│   ├── test.js              # Test page
│   ├── _app.js              # Next.js App wrapper
│   ├── _document.js         # HTML document structure
│   └── api/                 # API routes
│       ├── contract/        # Contract data endpoints
│       ├── transactions/    # Transaction data endpoints
│       ├── transfers/       # Token transfer endpoints
│       └── price/           # Price data endpoints
├── styles/
│   └── globals.css          # Global Tailwind styles
├── lib/
│   └── utils.js             # Utility functions
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies
└── pnpm-lock.yaml          # Locked dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Blue (`from-blue-600 to-purple-600`)
- **Backgrounds**: Clean white with subtle gray overlays
- **Borders**: Light gray (`border-gray-200`)
- **Text**: Dark gray (`text-gray-900`)

### Component Hierarchy
- **Card**: Container for content sections
- **Button**: Primary, secondary, danger, ghost variants
- **Header**: Fixed navigation with user menu
- **Sidebar**: Collapsible navigation with upgrade prompt

## 🔌 API Integration

### Contract Data
```javascript
GET /api/contract/[address]
// Returns: name, symbol, decimals, verified, tokenType, ...
```

### Transactions
```javascript
GET /api/transactions/[address]?page=1&offset=20
// Returns: hash, from, to, value, gasUsed, timestamp, status, ...
```

### Token Transfers
```javascript
GET /api/transfers/[address]?page=1&offset=20
// Returns: hash, from, to, value, timestamp, tokenSymbol, ...
```

### Price Data
```javascript
GET /api/price/[address]
// Returns: price, marketCap, volume, change24h, ...
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with responsive grid layouts and hidden navigation elements.

## 🔐 Security Features

- Password strength validation
- Two-factor authentication support
- API key management
- Secure session handling
- HTTPS ready

## 🎯 User Flows

### First-Time User
1. Land on marketing page
2. Click "Get Started Free"
3. Sign up / Create account
4. Access dashboard
5. Search for a contract
6. View analytics and transactions
7. Set up alerts and preferences

### Returning User
1. Sign in with credentials
2. Access personalized dashboard
3. View previously monitored contracts
4. Check active alerts
5. Update preferences

## 🚢 Deployment

### Vercel (Recommended)
```bash
pnpm vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 📈 Future Enhancements

- [ ] Multi-blockchain support (Polygon, Arbitrum, Optimism)
- [ ] Advanced filtering and search
- [ ] Export data to CSV/PDF
- [ ] Webhook alerts
- [ ] Custom dashboard widgets
- [ ] API rate limiting and quotas
- [ ] User teams and collaboration
- [ ] Advanced permission management
- [ ] Dark mode toggle
- [ ] Mobile app

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@smartmonitor.dev or open an issue on GitHub.

## 🔗 Links

- [Documentation](#)
- [API Reference](#)
- [Community Discord](#)
- [Twitter](#)
- [GitHub](#)
