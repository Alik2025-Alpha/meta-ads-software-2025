import { toast } from 'react-toastify';

// Mock data for development
const MOCK_AD_SETS = [
  {
    id: 'adset_123456789',
    name: 'Summer Sale - Main Audience',
    status: 'ACTIVE',
    campaignId: 'camp_123456789',
    dailyBudget: 50.00,
    bidStrategy: 'LOWEST_COST_WITHOUT_CAP',
    billingEvent: 'IMPRESSIONS',
    optimization: 'CONVERSIONS',
    targetingSpec: {
      age_min: 25,
      age_max: 45,
      genders: [1, 2], // 1 = male, 2 = female
      geo_locations: {
        countries: ['US'],
        regions: [{ key: '4081', name: 'California' }],
        cities: [{ key: '2418779', name: 'Los Angeles, CA' }]
      },
      interests: [
        { id: '6003139266461', name: 'Fashion' },
        { id: '6003139990583', name: 'Shopping' }
      ],
      behaviors: [
        { id: '6002714895372', name: 'Engaged Shoppers' }
      ],
      exclusions: {
        interests: [
          { id: '6003252353721', name: 'Luxury goods' }
        ]
      }
    },
    insights: {
      impressions: 35000,
      clicks: 1200,
      ctr: 3.43,
      spend: 750.25,
      cpc: 0.63,
      conversions: 65,
      cpa: 11.54,
      roas: 4.2
    }
  },
  {
    id: 'adset_234567890',
    name: 'Summer Sale - Retargeting',
    status: 'ACTIVE',
    campaignId: 'camp_123456789',
    dailyBudget: 30.00,
    bidStrategy: 'LOWEST_COST_WITHOUT_CAP',
    billingEvent: 'IMPRESSIONS',
    optimization: 'CONVERSIONS',
    targetingSpec: {
      age_min: 18,
      age_max: 65,
      genders: [1, 2],
      geo_locations: {
        countries: ['US']
      },
      custom_audiences: [
        { id: '6003139266461', name: 'Website Visitors - 30 Days' },
        { id: '6003139990583', name: 'Cart Abandoners - 7 Days' }
      ]
    },
    insights: {
      impressions: 18000,
      clicks: 950,
      ctr: 5.28,
      spend: 450.50,
      cpc: 0.47,
      conversions: 85,
      cpa: 5.30,
      roas: 8.5
    }
  },
  {
    id: 'adset_345678901',
    name: 'New Product - Main Audience',
    status: 'ACTIVE',
    campaignId: 'camp_234567890',
    dailyBudget: 40.00,
    bidStrategy: 'LOWEST_COST_WITHOUT_CAP',
    billingEvent: 'LINK_CLICKS',
    optimization: 'LINK_CLICKS',
    targetingSpec: {
      age_min: 25,
      age_max: 55,
      genders: [1, 2],
      geo_locations: {
        countries: ['US', 'CA']
      },
      interests: [
        { id: '6003139266461', name: 'Technology' },
        { id: '6003139990583', name: 'Innovation' }
      ]
    },
    insights: {
      impressions: 25000,
      clicks: 1100,
      ctr: 4.40,
      spend: 550.25,
      cpc: 0.50,
      conversions: 45,
      cpa: 12.23,
      roas: 3.8
    }
  },
  {
    id: 'adset_456789012',
    name: 'Brand Awareness - Broad Audience',
    status: 'ACTIVE',
    campaignId: 'camp_345678901',
    dailyBudget: 50.00,
    bidStrategy: 'LOWEST_COST_WITHOUT_CAP',
    billingEvent: 'IMPRESSIONS',
    optimization: 'REACH',
    targetingSpec: {
      age_min: 18,
      age_max: 65,
      genders: [1, 2],
      geo_locations: {
        countries: ['US', 'CA', 'UK', 'AU']
      }
    },
    insights: {
      impressions: 120000,
      clicks: 3200,
      ctr: 2.67,
      spend: 1050.50,
      cpc: 0.33,
      conversions: 65,
      cpa: 16.16,
      roas: 2.8
    }
  }
];

// Get all ad sets for a campaign
export const getAdSets = async (campaignId) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get(`https://graph.facebook.com/v16.0/${campaignId}/adsets`, {
    //   params: {
    //     fields: 'id,name,status,daily_budget,bid_strategy,billing_event,optimization_goal,targeting',
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data filtered by campaign
    return MOCK_AD_SETS.filter(adSet => adSet.campaignId === campaignId);
  } catch (error) {
    console.error(`Error fetching ad sets for campaign ${campaignId}:`, error);
    toast.error('Failed to fetch ad sets');
    throw error;
  }
};

// Get a specific ad set by ID
export const getAdSet = async (adSetId) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get(`https://graph.facebook.com/v16.0/${adSetId}`, {
    //   params: {
    //     fields: 'id,name,status,daily_budget,bid_strategy,billing_event,optimization_goal,targeting',
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    const adSet = MOCK_AD_SETS.find(set => set.id === adSetId);
    if (!adSet) {
      throw new Error('Ad set not found');
    }
    return adSet;
  } catch (error) {
    console.error(`Error fetching ad set ${adSetId}:`, error);
    toast.error('Failed to fetch ad set details');
    throw error;
  }
};

// Get insights for an ad set
export const getAdSetInsights = async (adSetId, dateRange = '30d') => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get(`https://graph.facebook.com/v16.0/${adSetId}/insights`, {
    //   params: {
    //     fields: 'impressions,clicks,ctr,spend,cpc,actions',
    //     time_range: JSON.stringify({ since: '2023-05-01', until: '2023-05-31' }),
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    const adSet = MOCK_AD_SETS.find(set => set.id === adSetId);
    if (!adSet) {
      throw new Error('Ad set not found');
    }
    
    // Generate daily data for the chart
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
    const dailyData = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      
      return {
        date: date.toISOString().split('T')[0],
        impressions: Math.floor(Math.random() * (adSet.insights.impressions / days * 1.5) + (adSet.insights.impressions / days * 0.5)),
        clicks: Math.floor(Math.random() * (adSet.insights.clicks / days * 1.5) + (adSet.insights.clicks / days * 0.5)),
        spend: (Math.random() * (adSet.insights.spend / days * 1.5) + (adSet.insights.spend / days * 0.5)).toFixed(2),
        conversions: Math.floor(Math.random() * (adSet.insights.conversions / days * 1.5) + (adSet.insights.conversions / days * 0.5))
      };
    });
    
    return {
      ...adSet.insights,
      dailyData
    };
  } catch (error) {
    console.error(`Error fetching insights for ad set ${adSetId}:`, error);
    toast.error('Failed to fetch ad set insights');
    throw error;
  }
};

// Create a new ad set
export const createAdSet = async (campaignId, adSetData) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.post(`https://graph.facebook.com/v16.0/${campaignId}/adsets`, {
    //   name: adSetData.name,
    //   status: adSetData.status,
    //   daily_budget: adSetData.dailyBudget * 100, // Convert to cents
    //   bid_strategy: adSetData.bidStrategy,
    //   billing_event: adSetData.billingEvent,
    //   optimization_goal: adSetData.optimization,
    //   targeting: JSON.stringify(adSetData.targetingSpec),
    //   access_token: accessToken
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a mock ad set
    const newAdSet = {
      id: `adset_${Date.now()}`,
      name: adSetData.name,
      status: adSetData.status || 'PAUSED',
      campaignId,
      dailyBudget: parseFloat(adSetData.dailyBudget),
      bidStrategy: adSetData.bidStrategy || 'LOWEST_COST_WITHOUT_CAP',
      billingEvent: adSetData.billingEvent || 'IMPRESSIONS',
      optimization: adSetData.optimization || 'CONVERSIONS',
      targetingSpec: adSetData.targetingSpec || {
        age_min: 18,
        age_max: 65,
        genders: [1, 2],
        geo_locations: {
          countries: ['US']
        }
      },
      insights: null // New ad set has no insights yet
    };
    
    // In a real app, we would add this to the database
    // For this mock, we'll just return the new ad set
    toast.success('Ad set created successfully');
    return newAdSet;
  } catch (error) {
    console.error('Error creating ad set:', error);
    toast.error('Failed to create ad set');
    throw error;
  }
};

// Update an ad set
export const updateAdSet = async (adSetId, adSetData) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.post(`https://graph.facebook.com/v16.0/${adSetId}`, {
    //   name: adSetData.name,
    //   status: adSetData.status,
    //   daily_budget: adSetData.dailyBudget * 100, // Convert to cents
    //   bid_strategy: adSetData.bidStrategy,
    //   targeting: JSON.stringify(adSetData.targetingSpec),
    //   access_token: accessToken
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find the ad set to update
    const adSetIndex = MOCK_AD_SETS.findIndex(set => set.id === adSetId);
    if (adSetIndex === -1) {
      throw new Error('Ad set not found');
    }
    
    // Update the ad set
    const updatedAdSet = {
      ...MOCK_AD_SETS[adSetIndex],
      ...adSetData
    };
    
    // In a real app, we would update this in the database
    // For this mock, we'll just return the updated ad set
    toast.success('Ad set updated successfully');
    return updatedAdSet;
  } catch (error) {
    console.error(`Error updating ad set ${adSetId}:`, error);
    toast.error('Failed to update ad set');
    throw error;
  }
};

// Delete an ad set
export const deleteAdSet = async (adSetId) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.delete(`https://graph.facebook.com/v16.0/${adSetId}`, {
    //   params: {
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, we would delete this from the database
    // For this mock, we'll just return success
    toast.success('Ad set deleted successfully');
    return true;
  } catch (error) {
    console.error(`Error deleting ad set ${adSetId}:`, error);
    toast.error('Failed to delete ad set');
    throw error;
  }
};
