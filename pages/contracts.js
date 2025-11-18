import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';
import { Shield, Zap, Users, Copy, Key, RefreshCw, Trash2 } from 'lucide-react';

export default function Contracts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contracts, setContracts] = useState([
    {
      id: 1,
      name: 'USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      type: 'ERC20',
      verified: true,
      transactions: 1250000,
      holders: 4200000,
      alerts: 2
    },
    {
      id: 2,
      name: 'DAI',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      type: 'ERC20',
      verified: true,
      transactions: 850000,
      holders: 680000,
      alerts: 1
    },
    {
      id: 3,
      name: 'USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      type: 'ERC20',
      verified: true,
      transactions: 3200000,
      holders: 5100000,
      alerts: 0
    }
  ]);

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
  };

  return (
    <>
      <Head>
        <title>Contracts - SmartMonitor</title>
      </Head>
      <div className="flex flex-col lg:flex-row h-screen bg-gray-900">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header isLoggedIn={true} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto">
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white">Monitored Contracts</h1>
                  <p className="text-gray-400 mt-2">View and manage all your monitored smart contracts</p>
                </div>
                <Button variant="primary">Add Contract</Button>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-400">Total Contracts</p>
                        <p className="text-2xl font-bold text-white">{contracts.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-400">Active Alerts</p>
                        <p className="text-2xl font-bold text-white">3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-400">Total Holders</p>
                        <p className="text-2xl font-bold text-white">9.98M</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contracts List */}
              <Card>
                <CardHeader>
                  <CardTitle>Contracts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-white">Type</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-white">Transactions</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-white">Holders</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-white">Alerts</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {contracts.map((contract) => (
                          <tr key={contract.id} className="hover:bg-gray-800 transition-colors">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-600" />
                                <div>
                                  <p className="font-medium text-white">{contract.name}</p>
                                  <p className="text-xs text-gray-400 font-mono">{contract.address.slice(0, 12)}...{contract.address.slice(-10)}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                {contract.type}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300">
                              {(contract.transactions / 1000000).toFixed(2)}M
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300">
                              {(contract.holders / 1000000).toFixed(2)}M
                            </td>
                            <td className="px-4 py-4">
                              {contract.alerts > 0 ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                  <Zap className="w-3 h-3" />
                                  {contract.alerts}
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400">None</span>
                              )}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleCopyAddress(contract.address)}
                                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                  title="Copy address"
                                >
                                  <Copy className="w-4 h-4 text-gray-400" />
                                </button>
                                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                                  <RefreshCw className="w-4 h-4 text-gray-400" />
                                </button>
                                <button className="p-2 hover:bg-red-900/30 rounded-lg transition-colors">
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
