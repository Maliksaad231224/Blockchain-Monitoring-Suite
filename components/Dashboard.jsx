import React, { useState, useEffect, useRef } from 'react';
import { Search, Activity, Coins, Users, TrendingUp, ExternalLink, CheckCircle, XCircle, Clock, AlertCircle, DollarSign, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

const Dashboard = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contractData, setContractData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [tokenTransfers, setTokenTransfers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [activeTab, setActiveTab] = useState('transactions');
  const [txPage, setTxPage] = useState(1);
  const [transferPage, setTransferPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const wsRef = useRef(null);

  const demoAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT

  // Fetch contract data
 const fetchContractData = async (contractAddress) => {
  setLoading(true);
  setError('');

  console.log('🔍 Fetching contract:', contractAddress);

  try {
    // Validate address format before making requests
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
      throw new Error('Invalid Ethereum address format. Please enter a valid 0x... address.');
    }

    // Fetch contract info
    console.log('📞 Calling /api/contract/' + contractAddress);
    const contractResponse = await fetch(`/api/contract/${contractAddress}`);
    console.log('📦 Response status:', contractResponse.status);

    if (!contractResponse.ok) {
      const errorData = await contractResponse.json();
      console.error('❌ API Error:', errorData);
      throw new Error(errorData.error || 'Contract not found');
    }

    const contract = await contractResponse.json();
    console.log('✅ Contract data received:', contract);

    // Fetch transactions with error handling
    console.log('📞 Calling /api/transactions/' + contractAddress);
    const txResponse = await fetch(`/api/transactions/${contractAddress}?page=1&offset=20`);
    let txData = { transactions: [] };

    if (txResponse.ok) {
      txData = await txResponse.json();
      console.log('✅ Transactions received:', txData.transactions?.length || 0);
    } else {
      console.log('⚠️ Transactions API failed, continuing without transaction data');
    }

    // Fetch token transfers with error handling
    console.log('📞 Calling /api/transfers/' + contractAddress);
    const transferResponse = await fetch(`/api/transfers/${contractAddress}?page=1&offset=20`);
    let transferData = { transfers: [] };

    if (transferResponse.ok) {
      transferData = await transferResponse.json();
      console.log('✅ Transfers received:', transferData.transfers?.length || 0);
    } else {
      console.log('⚠️ Transfers API failed, continuing without transfer data');
    }

    // Calculate analytics
    const analyticsData = calculateAnalytics(txData.transactions, transferData.transfers);

    setContractData(contract);
    setTransactions(txData.transactions || []);
    setTokenTransfers(transferData.transfers || []);
    setAnalytics(analyticsData);
    setTxPage(1);
    setTransferPage(1);

    // Fetch price data if it's a token (ERC20/ERC721)
    if (contract.tokenType === 'ERC20' || contract.tokenType === 'ERC721') {
      fetchPriceData(contractAddress);
    }

    // Setup WebSocket for real-time updates (optional)
    setupWebSocket(contractAddress);

  } catch (err) {
    setError(err.message || 'Failed to fetch contract data. Please check the address and try again.');
    console.error('❌ Error fetching contract data:', err);
  } finally {
    setLoading(false);
  }
};
  // Load more transactions
  const loadMoreTransactions = async () => {
    if (!address || loadingMore) return;
    
    setLoadingMore(true);
    try {
      const nextPage = txPage + 1;
      const response = await fetch(`/api/transactions/${address}?page=${nextPage}&offset=20`);
      const data = await response.json();
      
      if (data.transactions && data.transactions.length > 0) {
        setTransactions(prev => [...prev, ...data.transactions]);
        setTxPage(nextPage);
      }
    } catch (err) {
      console.error('Error loading more transactions:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Load more transfers
  const loadMoreTransfers = async () => {
    if (!address || loadingMore) return;
    
    setLoadingMore(true);
    try {
      const nextPage = transferPage + 1;
      const response = await fetch(`/api/transfers/${address}?page=${nextPage}&offset=20`);
      const data = await response.json();
      
      if (data.transfers && data.transfers.length > 0) {
        setTokenTransfers(prev => [...prev, ...data.transfers]);
        setTransferPage(nextPage);
      }
    } catch (err) {
      console.error('Error loading more transfers:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Calculate analytics
 const calculateAnalytics = (txs, transfers) => {
  // Calculate gas from transactions if available
  let avgGasUsed = 0;
  if (txs && txs.length > 0) {
    const totalGas = txs.reduce((sum, tx) => sum + (tx.gasUsed || 0), 0);
    avgGasUsed = Math.round(totalGas / txs.length);
  }

  // Check if we have token transfers (for ERC20 contracts)
  if (transfers && transfers.length > 0) {
    const totalTransfers = transfers.length;
    const totalTokenVolume = transfers.reduce((sum, t) => sum + parseFloat(t.value || 0), 0);

    // Group by day for charts
    const last7Days = {};
    const now = Date.now();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      last7Days[day] = { day, transactions: 0, volume: 0, transfers: 0 };
    }

    transfers.forEach(transfer => {
      const date = new Date(transfer.timestamp);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      if (last7Days[day]) {
        last7Days[day].transfers++;
        last7Days[day].volume += parseFloat(transfer.value || 0);
      }
    });

    return {
      totalTransactions: totalTransfers,
      totalVolume: totalTokenVolume.toFixed(2),
      avgGasUsed,
      chartData: Object.values(last7Days),
      isTokenVolume: true
    };
  }

  // Fallback to regular transactions if no token transfers
  if (!txs || txs.length === 0) {
    return null;
  }

  const totalTxs = txs.length;
  const totalValue = txs.reduce((sum, tx) => sum + parseFloat(tx.value || 0), 0);

  // Group by day for charts
  const last7Days = {};
  const now = Date.now();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    last7Days[day] = { day, transactions: 0, volume: 0, transfers: 0 };
  }

  txs.forEach(tx => {
    const date = new Date(tx.timestamp);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    if (last7Days[day]) {
      last7Days[day].transactions++;
      last7Days[day].volume += parseFloat(tx.value || 0);
    }
  });

  return {
    totalTransactions: totalTxs,
    totalVolume: totalValue.toFixed(6),
    avgGasUsed,
    chartData: Object.values(last7Days),
    isTokenVolume: false
  };
};

  // Fetch price data from CoinGecko
  const fetchPriceData = async (contractAddress) => {
    try {
      const response = await fetch(`/api/price/${contractAddress}`);
      if (response.ok) {
        const data = await response.json();
        setPriceData(data);
      }
    } catch (err) {
      console.log('Price data not available');
    }
  };

  // Setup WebSocket for real-time updates
  const setupWebSocket = (contractAddress) => {
    // Close existing connection
    if (wsRef.current) {
      wsRef.current.close();
    }

    // Note: WebSocket URL should be configured in environment
    const wsUrl = process.env.NEXT_PUBLIC_ALCHEMY_WS_URL;
    if (!wsUrl) {
      console.log('WebSocket URL not configured, using polling instead');
      return;
    }

    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        // Subscribe to contract events
        ws.send(JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_subscribe',
          params: ['logs', { address: contractAddress }]
        }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('New event:', data);
        // Refresh data when new event is received
        if (data.method === 'eth_subscription') {
          fetchContractData(contractAddress);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
      };

      wsRef.current = ws;
    } catch (err) {
      console.error('Failed to setup WebSocket:', err);
    }
  };

  const handleSearch = () => {
    if (address.trim()) {
      fetchContractData(address.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = Date.now();
    const diff = now - timestamp;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min${mins !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hr${hours !== 1 ? 's' : ''} ago`;
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Auto-refresh every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (contractData && address) {
        fetchContractData(address);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [contractData, address]);

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-400" />
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Smart Contract Monitor
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter contract address (0x...)"
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 pr-9 sm:pr-10 md:pr-12 text-sm sm:text-base text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white p-1.5 sm:p-2 rounded-lg transition-colors"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 animate-spin" /> : <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
            </button>
          </div>

          {error && (
            <div className="mt-2 sm:mt-3 md:mt-4 bg-red-500/10 border border-red-500 rounded-lg p-2 sm:p-3 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-400 text-xs sm:text-sm md:text-base">{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        {loading && !contractData ? (
          <div className="flex items-center justify-center h-48 sm:h-64">
            <div className="text-center">
              <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 animate-spin mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-400 text-sm sm:text-base">Loading contract data...</p>
            </div>
          </div>
        ) : contractData ? (
          <>
            {/* Contract Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-2 sm:p-3 md:p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" />
                  <span className="text-xs sm:text-sm text-gray-400">Token Info</span>
                </div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-100">
                  {contractData.name || 'Unknown'}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {contractData.verified ? 'Verified Contract' : 'Unverified'}
                </div>
                {priceData && (
                  <div className="mt-1.5 sm:mt-2 flex items-center gap-1">
                    <DollarSign className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-green-400" />
                    <span className="text-green-400 font-medium text-xs sm:text-sm md:text-base">${priceData.price}</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-2 sm:p-3 md:p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400" />
                  <span className="text-xs sm:text-sm text-gray-400">Transactions</span>
                </div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-100">
                  {analytics ? formatNumber(analytics.totalTransactions) : '0'}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Total count</div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-2 sm:p-3 md:p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400" />
                  <span className="text-xs sm:text-sm text-gray-400">Volume</span>
                </div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-100">
                  {analytics ? analytics.totalVolume : '0'}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {analytics?.isTokenVolume ? 'Tokens transferred' : 'ETH transferred'}
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-2 sm:p-3 md:p-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  {contractData.verified ? (
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-400" />
                  )}
                  <span className="text-xs sm:text-sm text-gray-400">Status</span>
                </div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-100">
                  {contractData.verified ? 'Verified' : 'Not Verified'}
                </div>
                <a
                  href={`https://etherscan.io/address/${address}#code`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1"
                >
                  View on Etherscan <ExternalLink className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3" />
                </a>
              </div>
            </div>

            {/* Analytics Charts */}
            {analytics && analytics.chartData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-100">Transaction Activity (7 Days)</h3>
                  <div className="h-48 sm:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analytics.chartData}>
                        <defs>
                          <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                        <YAxis stroke="#9CA3AF" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            wordBreak: 'break-word',
                            maxWidth: '200px',
                            fontSize: '12px'
                          }}
                          labelStyle={{ color: '#F3F4F6' }}
                        />
                        <Area
                          type="monotone"
                          dataKey={analytics.isTokenVolume ? "transfers" : "transactions"}
                          stroke="#3B82F6"
                          fillOpacity={1}
                          fill="url(#colorTx)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-100">Volume Transferred (7 Days)</h3>
                  <div className="h-48 sm:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                        <YAxis stroke="#9CA3AF" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            wordBreak: 'break-word',
                            maxWidth: '200px',
                            fontSize: '12px'
                          }}
                          labelStyle={{ color: '#F3F4F6' }}
                        />
                        <Bar dataKey="volume" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Gas Statistics */}
            {analytics && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-100">Gas Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <span className="text-gray-400 text-xs sm:text-sm">Average Gas Used</span>
                    <p className="text-lg sm:text-xl font-bold text-gray-100">{formatNumber(analytics.avgGasUsed)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs sm:text-sm">Total Volume</span>
                    <p className="text-lg sm:text-xl font-bold text-gray-100">{analytics.totalVolume} ETH</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs sm:text-sm">Total Transactions</span>
                    <p className="text-lg sm:text-xl font-bold text-gray-100">{formatNumber(analytics.totalTransactions)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
              <div className="flex flex-col sm:flex-row border-b border-gray-700">
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`flex-1 px-4 py-3 font-medium transition-colors text-center sm:text-left ${
                    activeTab === 'transactions'
                      ? 'bg-blue-500/10 text-blue-400 border-b-2 sm:border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Transactions ({transactions.length})
                </button>
                <button
                  onClick={() => setActiveTab('transfers')}
                  className={`flex-1 px-4 py-3 font-medium transition-colors text-center sm:text-left ${
                    activeTab === 'transfers'
                      ? 'bg-blue-500/10 text-blue-400 border-b-2 sm:border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Token Transfers ({tokenTransfers.length})
                </button>
              </div>

              <div className="p-4">
                {activeTab === 'transactions' ? (
                  <div className="space-y-3">
                    {transactions.length > 0 ? (
                      <>
                        {transactions.map((tx, idx) => (
                          <div key={idx} className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-400">{formatTime(tx.timestamp)}</span>
                              </div>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  tx.status === 'success'
                                    ? 'bg-green-500/10 text-green-400'
                                    : 'bg-red-500/10 text-red-400'
                                }`}
                              >
                                {tx.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="text-gray-400">Hash: </span>
                                <a
                                  href={`https://etherscan.io/tx/${tx.hash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 font-mono hover:text-blue-300"
                                >
                                  {formatAddress(tx.hash)}
                                </a>
                              </div>
                              <div>
                                <span className="text-gray-400">From: </span>
                                <span className="text-gray-100 font-mono">{formatAddress(tx.from)}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">To: </span>
                                <span className="text-gray-100 font-mono">{formatAddress(tx.to)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="text-gray-400">
                                Value: <span className="text-gray-100 font-medium">{tx.value} ETH</span>
                              </span>
                              <span className="text-gray-400">
                                Gas: <span className="text-gray-100 font-medium">{formatNumber(tx.gasUsed)}</span>
                              </span>
                              {tx.functionName && (
                                <span className="text-gray-400">
                                  Method: <span className="text-purple-400 font-medium">{tx.functionName}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={loadMoreTransactions}
                          disabled={loadingMore}
                          className="w-full py-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-gray-300 font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {loadingMore ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            'Load More Transactions'
                          )}
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        No transactions found for this contract
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tokenTransfers.length > 0 ? (
                      <>
                        {tokenTransfers.map((transfer, idx) => (
                          <div key={idx} className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-400">{formatTime(transfer.timestamp)}</span>
                              </div>
                              <span className="text-green-400 font-medium">
                                {transfer.value} {transfer.tokenSymbol || contractData.name}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="text-gray-400">Hash: </span>
                                <a
                                  href={`https://etherscan.io/tx/${transfer.hash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 font-mono hover:text-blue-300"
                                >
                                  {formatAddress(transfer.hash)}
                                </a>
                              </div>
                              <div>
                                <span className="text-gray-400">From: </span>
                                <span className="text-gray-100 font-mono">{formatAddress(transfer.from)}</span>
                              </div>
                              <div>
                                <span className="text-gray-400">To: </span>
                                <span className="text-gray-100 font-mono">{formatAddress(transfer.to)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={loadMoreTransfers}
                          disabled={loadingMore}
                          className="w-full py-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-gray-300 font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {loadingMore ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            'Load More Transfers'
                          )}
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        No token transfers found for this contract
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <Activity className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-2">Welcome to Smart Contract Monitor</h2>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Enter a contract address above to start monitoring blockchain activity</p>
            <button
              onClick={() => {
                setAddress(demoAddress);
                fetchContractData(demoAddress);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Try Demo (USDT Contract)
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Live monitoring • Updates every 1 minute
          </p>
          <p className="mt-2">Powered by Etherscan & Alchemy APIs • No wallet connection required</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;