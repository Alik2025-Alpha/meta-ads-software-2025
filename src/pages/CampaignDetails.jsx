import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAdAccount } from '../contexts/AdAccountContext'
import { FiArrowLeft, FiEdit, FiPause, FiPlay, FiTrash2, FiBarChart2, FiUsers, FiTarget, FiDollarSign, FiImage } from 'react-icons/fi'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function CampaignDetails() {
  const { id } = useParams()
  const { getCampaignDetails } = useAdAccount()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        setLoading(true)
        const data = await getCampaignDetails(id)
        setCampaign(data)
      } catch (error) {
        console.error('Error fetching campaign details:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCampaignDetails()
  }, [id, getCampaignDetails])

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'PENDING_REVIEW':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'REJECTED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  // Generate chart data
  const generateChartData = () => {
    const labels = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    })
    
    // Generate random data with an upward trend
    const impressionsData = Array.from({ length: 30 }, (_, i) => {
      return Math.floor(3000 + (i * 200) + (Math.random() * 1000))
    })
    
    const clicksData = Array.from({ length: 30 }, (_, i) => {
      return Math.floor(150 + (i * 10) + (Math.random() * 50))
    })
    
    const conversionsData = Array.from({ length: 30 }, (_, i) => {
      return Math.floor(5 + (i * 0.5) + (Math.random() * 5))
    })
    
    return {
      impressions: {
        labels,
        datasets: [
          {
            label: 'Impressions',
            data: impressionsData,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.3
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
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            tension: 0.3
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
            backgroundColor: 'rgba(139, 92, 246, 0.5)',
            tension: 0.3
          }
        ]
      }
    }
  }

  const chartData = generateChartData()
  
  const chartOptions = {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <FiBarChart2 className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Campaign not found</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          The campaign you're looking for doesn't exist or has been deleted.
        </p>
        <div className="mt-6">
          <Link
            to="/campaigns"
            className="btn-primary inline-flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to Campaigns
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Link to="/campaigns" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mr-2">
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{campaign.name}</h1>
          <span className={`ml-3 px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusBadgeClass(campaign.status)}`}>
            {campaign.status}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Campaign ID: {campaign.id}</p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link to={`/campaign/${campaign.id}/edit`} className="btn-secondary flex items-center">
          <FiEdit className="mr-2" />
          Edit
        </Link>
        {campaign.status === 'ACTIVE' ? (
          <button className="btn-secondary flex items-center">
            <FiPause className="mr-2" />
            Pause
          </button>
        ) : (
          <button className="btn-secondary flex items-center">
            <FiPlay className="mr-2" />
            Activate
          </button>
        )}
        <button className="btn-secondary flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
          <FiTrash2 className="mr-2" />
          Delete
        </button>
      </div>

      {/* Campaign overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
              <FiBarChart2 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Impressions</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {(campaign.performance.impressions / 1000).toFixed(1)}K
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
              <FiUsers className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Clicks</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {(campaign.performance.clicks / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                CTR: {campaign.performance.ctr.toFixed(2)}%
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
                {campaign.performance.conversions}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                CPA: ${campaign.performance.cpa.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400">
              <FiDollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Spend</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ${campaign.budget.spent.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                of ${campaign.budget.amount.toFixed(2)} {campaign.budget.type === 'DAILY' ? 'daily' : 'lifetime'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'adsets'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('adsets')}
            >
              Ad Sets ({campaign.adSets?.length || 0})
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'ads'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('ads')}
            >
              Ads ({campaign.ads?.length || 0})
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'targeting'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('targeting')}
            >
              Targeting
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Campaign Details</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Objective</p>
                        <p className="text-sm text-gray-900 dark:text-white">{campaign.objective}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                        <p className="text-sm text-gray-900 dark:text-white">{campaign.status}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</p>
                        <p className="text-sm text-gray-900 dark:text-white">{new Date(campaign.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</p>
                        <p className="text-sm text-gray-900 dark:text-white">{new Date(campaign.endDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget Type</p>
                        <p className="text-sm text-gray-900 dark:text-white">{campaign.budget.type === 'DAILY' ? 'Daily' : 'Lifetime'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Budget Amount</p>
                        <p className="text-sm text-gray-900 dark:text-white">${campaign.budget.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Budget Usage</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Spent: ${campaign.budget.spent.toFixed(2)}</p>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {((campaign.budget.spent / campaign.budget.amount) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(campaign.budget.spent / campaign.budget.amount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cost per Click</p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          ${(campaign.budget.spent / campaign.performance.clicks).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cost per Conversion</p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          ${campaign.performance.cpa.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Remaining Budget</p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          ${(campaign.budget.amount - campaign.budget.spent).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Daily Average</p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          ${(campaign.budget.spent / 30).toFixed(2)}/day
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Trends</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Impressions</h4>
                  <div className="h-64">
                    <Line data={chartData.impressions} options={chartOptions} />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Clicks</h4>
                  <div className="h-64">
                    <Line data={chartData.clicks} options={chartOptions} />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Conversions</h4>
                  <div className="h-64">
                    <Line data={chartData.conversions} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ad Sets Tab */}
          {activeTab === 'adsets' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ad Sets</h3>
                <button className="btn-secondary text-sm">
                  Create Ad Set
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Ad Set
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
                    {campaign.adSets.map((adSet) => (
                      <tr key={adSet.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{adSet.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(adSet.status)}`}>
                            {adSet.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            ${adSet.budget.spent.toFixed(2)} / ${adSet.budget.amount.toFixed(2)}
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-blue-500 h-1.5 rounded-full" 
                              style={{ width: `${(adSet.budget.spent / adSet.budget.amount) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {adSet.performance.conversions} conversions
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ${adSet.performance.cpa.toFixed(2)} CPA
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                              <FiEye className="h-5 w-5" />
                            </button>
                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                              <FiEdit className="h-5 w-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Ads Tab */}
          {activeTab === 'ads' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ads</h3>
                <button className="btn-secondary text-sm">
                  Create Ad
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaign.ads.map((ad) => (
                  <div key={ad.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={ad.creative.imageUrl} 
                        alt={ad.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{ad.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(ad.status)}`}>
                          {ad.status}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{ad.creative.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{ad.creative.description}</p>
                      
                      <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                          <p className="text-gray-500 dark:text-gray-400">Impressions</p>
                          <p className="font-medium text-gray-900 dark:text-white">{(ad.performance.impressions / 1000).toFixed(1)}K</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                          <p className="text-gray-500 dark:text-gray-400">Clicks</p>
                          <p className="font-medium text-gray-900 dark:text-white">{(ad.performance.clicks / 1000).toFixed(1)}K</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                          <p className="text-gray-500 dark:text-gray-400">CTR</p>
                          <p className="font-medium text-gray-900 dark:text-white">{ad.performance.ctr.toFixed(1)}%</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                          <FiEye className="mr-1 h-4 w-4" />
                          Preview
                        </button>
                        <button className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 flex items-center">
                          <FiEdit className="mr-1 h-4 w-4" />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Targeting Tab */}
          {activeTab === 'targeting' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Audience Targeting</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                    <FiTarget className="mr-2 h-4 w-4 text-blue-500" />
                    Demographics
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Age Range</p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {campaign.targeting.ageRange.min} - {campaign.targeting.ageRange.max}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Gender</p>
                      <div className="flex flex-wrap gap-2">
                        {campaign.targeting.genders.map((gender, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            {gender}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Locations</p>
                      <div className="flex flex-wrap gap-2">
                        {campaign.targeting.countries.map((country, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                    <FiUsers className="mr-2 h-4 w-4 text-purple-500" />
                    Interests & Behaviors
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Interests</p>
                      <div className="flex flex-wrap gap-2">
                        {campaign.targeting.interests.map((interest, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="btn-secondary text-sm">
                  Edit Targeting
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
