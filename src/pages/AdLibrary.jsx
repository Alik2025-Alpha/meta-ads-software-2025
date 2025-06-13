import React, { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiDownload, FiExternalLink } from 'react-icons/fi'

export default function AdLibrary() {
  const [loading, setLoading] = useState(true)
  const [ads, setAds] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    platform: 'all',
    adType: 'all',
    dateRange: '30'
  })

  useEffect(() => {
    // Simulate API call to fetch ads
    const fetchAds = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock ad data
        const mockAds = [
          {
            id: 'ad_1',
            advertiser: 'Nike',
            headline: 'Just Do It. New Collection Available Now',
            description: 'Discover the latest Nike collection. Designed for performance and style. Shop now and get free shipping on orders over $100.',
            imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            platform: 'facebook',
            adType: 'image',
            startDate: '2023-05-15',
            endDate: '2023-06-15',
            impressions: 1250000,
            engagement: 32500,
            ctr: 2.6
          },
          {
            id: 'ad_2',
            advertiser: 'Apple',
            headline: 'Introducing the new iPhone. Think Different.',
            description: 'The most powerful iPhone ever. With the fastest chip, best camera, and longest battery life. Available now at Apple Store.',
            imageUrl: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            platform: 'instagram',
            adType: 'image',
            startDate: '2023-05-20',
            endDate: '2023-06-20',
            impressions: 2100000,
            engagement: 78500,
            ctr: 3.7
          },
          {
            id: 'ad_3',
            advertiser: 'Amazon',
            headline: 'Prime Day is coming. Save the date.',
            description: 'Get ready for Amazon\'s biggest sale event. Exclusive deals for Prime members. Sign up now to get access to thousands of deals.',
            imageUrl: 'https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            platform: 'facebook',
            adType: 'carousel',
            startDate: '2023-05-25',
            endDate: '2023-06-25',
            impressions: 1850000,
            engagement: 42300,
            ctr: 2.3
          },
          {
            id: 'ad_4',
            advertiser: 'Spotify',
            headline: 'Music for everyone. Premium for 3 months free.',
            description: 'Try Spotify Premium free for 3 months. No ads, offline listening, and unlimited skips. Cancel anytime.',
            imageUrl: 'https://images.pexels.com/photos/9069214/pexels-photo-9069214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            platform: 'instagram',
            adType: 'video',
            startDate: '2023-05-10',
            endDate: '2023-06-10',
            impressions: 980000,
            engagement: 35600,
            ctr: 3.6
          },
          {
            id: 'ad_5',
            advertiser: 'Airbnb',
            headline: 'Live anywhere. Book unique homes and experiences.',
            description: 'Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb.',
            imageUrl: 'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            platform: 'facebook',
            adType: 'image',
            startDate: '2023-05-05',
            endDate: '2023-06-05',
            impressions: 1120000,
            engagement: 28900,
            ctr: 2.6
          },
          {
            id: 'ad_6',
            advertiser: 'Netflix',
            headline: 'See what\'s next. Cancel anytime.',
            description: 'Watch anywhere. Cancel anytime. Unlimited movies, TV shows, and more. Watch on any device. Plans from $9.99/month.',
            imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            platform: 'instagram',
            adType: 'video',
            startDate: '2023-05-12',
            endDate: '2023-06-12',
            impressions: 1650000,
            engagement: 58200,
            ctr: 3.5
          }
        ]
        
        setAds(mockAds)
      } catch (error) {
        console.error('Error fetching ads:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchAds()
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const filteredAds = ads.filter(ad => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      ad.advertiser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Platform filter
    const matchesPlatform = filters.platform === 'all' || ad.platform === filters.platform
    
    // Ad type filter
    const matchesAdType = filters.adType === 'all' || ad.adType === filters.adType
    
    // Date range filter (simplified for demo)
    const adDate = new Date(ad.startDate)
    const now = new Date()
    const daysAgo = Math.floor((now - adDate) / (1000 * 60 * 60 * 24))
    const matchesDateRange = filters.dateRange === 'all' || daysAgo <= parseInt(filters.dateRange)
    
    return matchesSearch && matchesPlatform && matchesAdType && matchesDateRange
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ad Library</h1>
        <p className="text-gray-600 dark:text-gray-400">Explore ads from competitors and get inspiration</p>
      </div>

      {/* Search and filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by advertiser, headline, or description"
                className="input-field pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              name="platform"
              value={filters.platform}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="all">All Platforms</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
            
            <select
              name="adType"
              value={filters.adType}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="all">All Ad Types</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="carousel">Carousel</option>
            </select>
            
            <select
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="30">Last 30 days</option>
              <option value="60">Last 60 days</option>
              <option value="90">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ad results */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredAds.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <FiFilter className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No ads found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.map((ad) => (
            <div key={ad.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={ad.imageUrl} 
                  alt={ad.headline}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{ad.advertiser}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    ad.platform === 'facebook' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                      : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300'
                  }`}>
                    {ad.platform.charAt(0).toUpperCase() + ad.platform.slice(1)}
                  </span>
                </div>
                
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{ad.headline}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">{ad.description}</p>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-gray-500 dark:text-gray-400">Impressions</p>
                    <p className="font-medium text-gray-900 dark:text-white">{(ad.impressions / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-gray-500 dark:text-gray-400">Engagement</p>
                    <p className="font-medium text-gray-900 dark:text-white">{(ad.engagement / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-gray-500 dark:text-gray-400">CTR</p>
                    <p className="font-medium text-gray-900 dark:text-white">{ad.ctr.toFixed(1)}%</p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                    <FiExternalLink className="mr-1 h-4 w-4" />
                    View Details
                  </button>
                  <button className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 flex items-center">
                    <FiDownload className="mr-1 h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
