import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAdAccount } from '../contexts/AdAccountContext'
import { FiPlusCircle, FiBarChart2, FiEye, FiEdit, FiTrash2, FiAlertCircle } from 'react-icons/fi'

export default function Campaigns() {
  const { getCampaigns } = useAdAccount()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true)
        const data = await getCampaigns()
        setCampaigns(data)
      } catch (error) {
        console.error('Error fetching campaigns:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCampaigns()
  }, [getCampaigns])

  const filteredCampaigns = filter === 'all' 
    ? campaigns 
    : campaigns.filter(campaign => campaign.status.toLowerCase() === filter.toLowerCase())

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

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your ad campaigns</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/create-campaign"
            className="btn-primary flex items-center"
          >
            <FiPlusCircle className="mr-2" />
            Create Campaign
          </Link>
        </div>
      </div>

      {/* Filters and stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'paused'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilter('paused')}
            >
              Paused
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'pending_review'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilter('pending_review')}
            >
              Pending Review
            </button>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Date Range:</span>
            <select className="input-field py-1 text-sm">
              <option value="7">Last 7 days</option>
              <option value="30" selected>Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Campaigns</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{campaigns.length}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Spend</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${campaigns.reduce((sum, campaign) => sum + campaign.budget.spent, 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Impressions</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {(campaigns.reduce((sum, campaign) => sum + campaign.performance.impressions, 0) / 1000).toFixed(1)}K
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Average CTR</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {campaigns.length > 0
                ? (campaigns.reduce((sum, campaign) => sum + campaign.performance.ctr, 0) / campaigns.length).toFixed(2)
                : '0.00'}%
            </p>
          </div>
        </div>
      </div>

      {/* Campaigns list */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <FiAlertCircle className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No campaigns found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {filter === 'all'
              ? "You don't have any campaigns yet. Create your first campaign to get started."
              : `You don't have any ${filter} campaigns. Try changing the filter or create a new campaign.`}
          </p>
          <div className="mt-6">
            <Link
              to="/create-campaign"
              className="btn-primary inline-flex items-center"
            >
              <FiPlusCircle className="mr-2" />
              Create Campaign
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
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
                    Performance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Dates
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {campaign.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {campaign.objective}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        ${campaign.budget.spent.toFixed(2)} / ${campaign.budget.amount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {campaign.budget.type === 'DAILY' ? 'Daily' : 'Lifetime'}
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
                        {(campaign.performance.impressions / 1000).toFixed(1)}K impressions
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {campaign.performance.clicks} clicks ({campaign.performance.ctr.toFixed(2)}% CTR)
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {campaign.performance.conversions} conversions (${campaign.performance.cpa.toFixed(2)} CPA)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div>{new Date(campaign.startDate).toLocaleDateString()}</div>
                      <div>to</div>
                      <div>{new Date(campaign.endDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link to={`/campaign/${campaign.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <FiEye className="h-5 w-5" />
                        </Link>
                        <Link to={`/campaign/${campaign.id}/edit`} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                          <FiEdit className="h-5 w-5" />
                        </Link>
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
    </div>
  )
}
