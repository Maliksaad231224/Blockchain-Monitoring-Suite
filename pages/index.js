import Head from 'next/head'
import { useState } from 'react'
import LandingPage from '../components/LandingPage'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import DashboardContent from '../components/DashboardContent'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleGetStarted = () => {
    setIsLoggedIn(true)
  }

  return (
    <>
      <Head>
        <title>SmartMonitor | Real-time Smart Contract Monitoring</title>
        <meta name="description" content="Monitor smart contracts in real-time. Track transactions, analyze token flows, and detect suspicious activity across Ethereum and other blockchains." />
        <meta property="og:title" content="SmartMonitor - Smart Contract Monitoring Platform" />
        <meta property="og:description" content="Professional blockchain monitoring platform for traders and developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {!isLoggedIn ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-900">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header isLoggedIn={true} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-auto">
              <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <DashboardContent />
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}