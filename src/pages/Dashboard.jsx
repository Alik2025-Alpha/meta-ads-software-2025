import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMetaAccounts } from '../contexts/MetaAccountsContext'
import { useAdAccount } from '../contexts/AdAccountContext'
import { FiBarChart2, FiTrendingUp, FiTrendingDown, FiDollarSign, FiUsers, FiTarget, FiPlusCircle, FiExternalLink } from 'react-icons/fi'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function Dashboard() {
  const { selectedAccount, connectedAccounts } = useMetaAccounts()
  const { selectedAdAccount, getCampaigns } = useAdAccount()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30')
  const [dashboardStats, setDashboardStats] = useState({
    impressions: 0,
    clicks: 0,
    conversions: 0,
    spend: 0,
    ctr: 0,
    cpc: 0,
    cpa: 0
  })

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        if (selectedAdAccount) {
          setLoading(true)
          const data = await getCampaigns()
          setCampaigns(data)
          
          // Calculate dashboard stats
          const totalImpressions = data.reduce((sum, campaign) => sum + campaign.performance.impressions, 0)
          const totalClicks = data.reduce((sum, campaign) => sum + campaign.performance.clicks, 0)
          const totalConversions = data.reduce((sum, campaign) => sum + campaign.performance.conversions, 0)
          const totalSpend = data.reduce((sum, campaign) => sum + campaign.budget.spent, 0)
          
          setDashboardStats({
            impressions: totalImpressions,
            clicks: totalClicks,
            conversions: totalConversions,
            spend: totalSpend,
            ctr: totalClicks > 0 ? (totalClicks / totalImpressions) * 100 : 0,
            cpc: totalClicks > 0 ? totalSpend / totalClicks : 0,
            cpa: totalConversions > 0 ? totalSpend / totalConversions : 0
          })
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCampaigns()
  }, [selectedAdAccount, getCampaigns])

  // Generate chart data
  const generateChartData = () => {
    const days = parseInt(timeRange)
    const labels = Array.from({ length: days }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - i))
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    })
    
    // Generate random data with an upward trend for performance metrics
    const impressionsData = Array.from({ length: days }, (_, i) => {
      return Math.floor(5000 + (i * 300) + (Math.random() * 2000))
    })
    
    const clicksData = Array.from({ length: days }, (_, i) => {
      return Math.floor(200 + (i * 15) + (Math.random() * 100))
    })
    
    const conversionsData = Array.from({ length: days }, (_, i) => {
      return Math.floor(10 + (i * 0.7) + (Math.random() * 8))
    })
    
    const spendData = Array.from({ length: days }, (_, i) => {
      return Math.floor(50 + (i * 5) + (Math.random() * 30))
    })

    return {
      performance: {
        labels,
        datasets: [
          {
            label: 'Impressions',
            data: impressionsData,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      clicks: {
        labels,
        datasets: [
          {
            label: 'Clicks',
            data: clicksData,
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      conversions: {
        labels,
        datasets: [
          {
            label: 'Conversions',
            data: conversionsData,
            borderColor: 'rgb(139, 92, 246)',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      spend: {
        labels,
        datasets: [
          {
            label: 'Spend ($)',
            data: spendData,
            borderColor: 'rgb(244, 63, 94)',
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      campaignPerformance: {
        labels: campaigns.slice(0, 5).map(campaign => campaign.name),
        datasets: [
          {
            label: 'Impressions',
            data: campaigns.slice(0, 5).map(campaign => campaign.performance.impressions),
            backgroundColor: 'rgba(59, 130, 246, 0.7)'
          }
        ]
      },
      conversionsByObjective: {
        labels: ['Awareness', 'Consideration', 'Conversion'],
        datasets: [
          {
            data: [25, 45, 30],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)',
              'rgba(16, 185, 129, 0.7)',
              'rgba(139, 92, 246, 0.7)'
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(139, 92, 246)'
            ],
            borderWidth: 1
          }
        ]
      }
    }
  }

  const chartData = generateChartData()
  
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  }
  
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  }
  
  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    cutout: '70%'
  }

  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    } else {
      return num.toFixed(0)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Overview of your advertising performance</p>
      </div>

      {!selectedAccount ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600">
            <FiExternalLink className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No Meta account connected</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Connect your Meta Business Manager account to get started.
          </p>
          <div className="mt-6">
            <Link
              to="/connect-account"
              className="btn-primary inline-flex items-center"
            >
              <FiPlusCircle className="mr-2" />
              Connect Account
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Time range selector */}
          <div className="flex justify-end mb-6">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-field py-1 text-sm"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  <FiBarChart2 className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Impressions</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatNumber(dashboardStats.impressions)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                  <FiTrendingUp className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Clicks</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatNumber(dashboardStats.clicks)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    CTR: {dashboardStats.ctr.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                  <FiTarget className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversions</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatNumber(dashboardStats.conversions)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    CPA: ${dashboardStats.cpa.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400">
                  <FiDollarSign className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spend</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    ${dashboardStats.spend.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    CPC: ${dashboardStats.cpc.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Impressions</h2>
              <div className="h-64">
                <Line data={chartData.performance} options={lineChartOptions} />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Clicks</h2>
              <div className="h-64">
                <Line data={chartData.clicks} options={lineChartOptions} />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Conversions</h2>
              <div className="h-64">
                <Line data={chartData.conversions} options={lineChartOptions} />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Spend</h2>
              <div className="h-64">
                <Line data={chartData.spend} options={lineChartOptions} />
              </div>
            </div>
          </div>

          {/* Additional insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 lg:col-span-2">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Campaign Performance</h2>
              <div className="h-64">
                <Bar data={chartData.campaignPerformance} options={barChartOptions} />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Conversions by Objective</h2>
              <div className="h-64 flex items-center justify-center">
                <Doughnut data={chartData.conversionsByObjective} options={doughnutChartOptions} />
              </div>
            </div>
          </div>

          {/* Recent campaigns */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Campaigns</h2>
              <Link
                to="/campaigns"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View All
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Budget
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Results
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        Loading campaigns...
                      </td>
                    </tr>
                  ) : campaigns.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No campaigns found. <Link to="/create-campaign" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Create your first campaign</Link>.
                      </td>
                    </tr>
                  ) : (
                    campaigns.slice(0, 5).map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{campaign.objective}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            campaign.status === 'ACTIVE' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                              : campaign.status === 'PAUSED'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            ${campaign.budget.spent.toFixed(2)} / ${campaign.budget.amount.toFixed(2)}
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-blue-500 h-1.5 rounded-full" 
                              style={{ width: `${(campaign.budget.spent / campaign.budget.amount) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {formatNumber(campaign.performance.impressions)} impressions
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {campaign.performance.clicks} clicks ({campaign.performance.ctr.toFixed(2)}% CTR)
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/campaign/${campaign.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/create-campaign"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  <FiPlusCircle className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Create Campaign</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Launch a new advertising campaign</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/website-analysis"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                  <FiBarChart2 className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Analyze Website</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Get insights and recommendations</p>
                </div>
              </div>
            </Link>
            
            <Link
              to="/ad-generator"
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                  <FiTarget className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Generate Ads</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Create compelling ad content</p>
                </div>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
