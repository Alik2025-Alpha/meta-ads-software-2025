import React, { createContext, useContext, useState, useEffect } from 'react'
import { useMetaAccounts } from './MetaAccountsContext'

const AdAccountContext = createContext()

export function useAdAccount() {
  return useContext(AdAccountContext)
}

export function AdAccountProvider({ children }) {
  const { selectedAccount } = useMetaAccounts()
  const [selectedAdAccount, setSelectedAdAccount] = useState(null)
  const [loading, setLoading] = useState(true)

  // Update selected ad account when selected account changes
  useEffect(() => {
    if (selectedAccount && selectedAccount.adAccounts && selectedAccount.adAccounts.length > 0) {
      setSelectedAdAccount(selectedAccount.adAccounts[0])
    } else {
      setSelectedAdAccount(null)
    }
    setLoading(false)
  }, [selectedAccount])

  // Select an ad account
  const selectAdAccount = (adAccountId) => {
    if (selectedAccount && selectedAccount.adAccounts) {
      const adAccount = selectedAccount.adAccounts.find(acc => acc.id === adAccountId)
      if (adAccount) {
        setSelectedAdAccount(adAccount)
        return true
      }
    }
    return false
  }

  // Mock function to get campaigns
  const getCampaigns = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate random campaign data
        const campaigns = Array.from({ length: 10 }, (_, i) => {
          const impressions = Math.floor(Math.random() * 100000) + 10000
          const clicks = Math.floor(impressions * (Math.random() * 0.1))
          const conversions = Math.floor(clicks * (Math.random() * 0.2))
          const spent = Math.floor(clicks * (Math.random() * 2) + 0.5)
          const budget = Math.floor(spent * (Math.random() + 1.2))
          
          return {
            id: `campaign-${i + 1}`,
            name: `Campaign ${i + 1}`,
            status: ['ACTIVE', 'PAUSED', 'COMPLETED'][Math.floor(Math.random() * 3)],
            objective: ['AWARENESS', 'CONSIDERATION', 'CONVERSION'][Math.floor(Math.random() * 3)],
            budget: {
              amount: budget,
              spent: spent,
              remaining: budget - spent
            },
            performance: {
              impressions,
              clicks,
              conversions,
              ctr: (clicks / impressions) * 100,
              cpc: spent / clicks,
              cpa: conversions > 0 ? spent / conversions : 0
            },
            startDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString()
          }
        })
        
        resolve(campaigns)
      }, 1000)
    })
  }

  // Mock function to get ad sets
  const getAdSets = (campaignId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate random ad set data
        const adSets = Array.from({ length: 5 }, (_, i) => {
          const impressions = Math.floor(Math.random() * 20000) + 5000
          const clicks = Math.floor(impressions * (Math.random() * 0.1))
          const conversions = Math.floor(clicks * (Math.random() * 0.2))
          const spent = Math.floor(clicks * (Math.random() * 2) + 0.5)
          const budget = Math.floor(spent * (Math.random() + 1.2))
          
          return {
            id: `adset-${campaignId}-${i + 1}`,
            campaignId,
            name: `Ad Set ${i + 1}`,
            status: ['ACTIVE', 'PAUSED', 'COMPLETED'][Math.floor(Math.random() * 3)],
            targeting: {
              age_min: 18 + Math.floor(Math.random() * 10),
              age_max: 45 + Math.floor(Math.random() * 20),
              genders: [Math.floor(Math.random() * 2) + 1],
              geo_locations: {
                countries: ['US', 'CA', 'UK'][Math.floor(Math.random() * 3)]
              },
              interests: ['Technology', 'Fashion', 'Sports', 'Food'][Math.floor(Math.random() * 4)]
            },
            budget: {
              amount: budget,
              spent: spent,
              remaining: budget - spent
            },
            performance: {
              impressions,
              clicks,
              conversions,
              ctr: (clicks / impressions) * 100,
              cpc: spent / clicks,
              cpa: conversions > 0 ? spent / conversions : 0
            }
          }
        })
        
        resolve(adSets)
      }, 800)
    })
  }

  // Mock function to get ads
  const getAds = (adSetId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate random ad data
        const ads = Array.from({ length: 3 }, (_, i) => {
          const impressions = Math.floor(Math.random() * 10000) + 1000
          const clicks = Math.floor(impressions * (Math.random() * 0.1))
          const conversions = Math.floor(clicks * (Math.random() * 0.2))
          const spent = Math.floor(clicks * (Math.random() * 2) + 0.5)
          
          return {
            id: `ad-${adSetId}-${i + 1}`,
            adSetId,
            name: `Ad ${i + 1}`,
            status: ['ACTIVE', 'PAUSED', 'COMPLETED'][Math.floor(Math.random() * 3)],
            creative: {
              title: `Ad Title ${i + 1}`,
              body: `This is the ad copy for ad ${i + 1}. It showcases our product or service.`,
              imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/600/400`,
              callToAction: ['LEARN_MORE', 'SHOP_NOW', 'SIGN_UP'][Math.floor(Math.random() * 3)]
            },
            performance: {
              impressions,
              clicks,
              conversions,
              ctr: (clicks / impressions) * 100,
              cpc: spent / clicks,
              cpa: conversions > 0 ? spent / conversions : 0
            }
          }
        })
        
        resolve(ads)
      }, 600)
    })
  }

  const value = {
    selectedAdAccount,
    loading,
    selectAdAccount,
    getCampaigns,
    getAdSets,
    getAds
  }

  return (
    <AdAccountContext.Provider value={value}>
      {children}
    </AdAccountContext.Provider>
  )
}
