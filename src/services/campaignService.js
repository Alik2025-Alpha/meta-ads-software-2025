import { toast } from 'react-toastify';

// Mock data for development
const MOCK_CAMPAIGNS = [
  {
    id: 'camp_123456789',
    name: 'Summer Sale 2023',
    status: 'ACTIVE',
    objective: 'CONVERSIONS',
    adAccountId: 'act_123456789',
    dailyBudget: 100.00,
    lifetimeBudget: 3000.00,
    startTime: '2023-06-01T00:00:00Z',
    endTime: '2023-06-30T23:59:59Z',
    createdTime: '2023-05-25T14:30:00Z',
    insights: {
      impressions: 75000,
      clicks: 2100,
      ctr: 2.8,
      spend: 1450.75,
      cpc: 0.69,
      conversions: 120,
      cpa: 12.09,
      roas: 3.5
    }
  },
  {
    id: 'camp_234567890',
    name: 'New Product Launch',
    status: 'ACTIVE',
    objective: 'TRAFFIC',
    adAccountId: 'act_123456789',
    dailyBudget: 75.00,
    lifetimeBudget: 2250.00,
    startTime: '2023-06-15T00:00:00Z',
    endTime: '2023-07-15T23:59:59Z',
    createdTime: '2023-06-10T09:15:00Z',
    insights: {
      impressions: 45000,
      clicks: 1800,
      ctr: 4.0,
      spend: 950.25,
      cpc: 0.53,
      conversions: 85,
      cpa: 11.18,
      roas: 4.2
    }
  },
  {
    id: 'camp_345678901',
    name: 'Brand Awareness Q2',
    status: 'ACTIVE',
    objective: 'BRAND_AWARENESS',
    adAccountId: 'act_123456789',
    dailyBudget: 50.00,
    lifetimeBudget: 1500.00,
    startTime: '2023-04-01T00:00:00Z',
    endTime: '2023-06-30T23:59:59Z',
    createdTime: '2023-03-25T11:45:00Z',
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
  },
  {
    id: 'camp_456789012',
    name: 'Retargeting Campaign',
    status: 'PAUSED',
    objective: 'CONVERSIONS',
    adAccountId: 'act_123456789',
    dailyBudget: 35.00,
    lifetimeBudget: 1050.00,
    startTime: '2023-05-15T00:00:00Z',
    endTime: '2023-06-15T23:59:59Z',
    createdTime: '2023-05-10T16:20:00Z',
    insights: {
      impressions: 28000,
      clicks: 1400,
      ctr: 5.0,
      spend: 750.25,
      cpc: 0.54,
      conversions: 95,
      cpa: 7.90,
      roas: 6.2
    }
  },
  {
    id: 'camp_567890123',
    name: 'Holiday Special',
    status: 'SCHEDULED',
    objective: 'CONVERSIONS',
    adAccountId: 'act_987654321',
    dailyBudget: 120.00,
    lifetimeBudget: 3600.00,
    startTime: '2023-11-15T00:00:00Z',
    endTime: '2023-12-31T23:59:59Z',
    createdTime: '2023-06-01T10:00:00Z',
    insights: null
  }
];

// Get all campaigns for an ad account
export const getCampaigns = async (adAccountId) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get(`https://graph.facebook.com/v16.0/${adAccountId}/campaigns`, {
    //   params: {
    //     fields: 'id,name,status,objective,daily_budget,lifetime_budget,start_time,end_time,created_time',
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data filtered by ad account
    return MOCK_CAMPAIGNS.filter(campaign => campaign.adAccountId === adAccountId);
  } catch (error) {
    console.error(`Error fetching campaigns for ad account ${adAccountId}:`, error);
    toast.error('Failed to fetch campaigns');
    throw error;
  }
};

// Get a specific campaign by ID
export const getCampaign = async (campaignId) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get(`https://graph.facebook.com/v16.0/${campaignId}`, {
    //   params: {
    //     fields: 'id,name,status,objective,daily_budget,lifetime_budget,start_time,end_time,created_time',
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    const campaign = MOCK_CAMPAIGNS.find(camp => camp.id === campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    return campaign;
  } catch (error) {
    console.error(`Error fetching campaign ${campaignId}:`, error);
    toast.error('Failed to fetch campaign details');
    throw error;
  }
};

// Get insights for a campaign
export const getCampaignInsights = async (campaignId, dateRange = '30d') => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get(`https://graph.facebook.com/v16.0/${campaignId}/insights`, {
    //   params: {
    //     fields: 'impressions,clicks,ctr,spend,cpc,actions',
    //     time_range: JSON.stringify({ since: '2023-05-01', until: '2023-05-31' }),
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    const campaign = MOCK_CAMPAIGNS.find(camp => camp.id === campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    
    if (!campaign.insights) {
      return null; // Campaign hasn't started yet
    }
    
    // Generate daily data for the chart
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
    const dailyData = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      
      return {
        date: date.toISOString().split('T')[0],
        impressions: Math.floor(Math.random() * (campaign.insights.impressions / days * 1.5) + (campaign.insights.impressions / days * 0.5)),
        clicks: Math.floor(Math.random() * (campaign.insights.clicks / days * 1.5) + (campaign.insights.clicks / days * 0.5)),
        spend: (Math.random() * (campaign.insights.spend / days * 1.5) + (campaign.insights.spend / days * 0.5)).toFixed(2),
        conversions: Math.floor(Math.random() * (campaign.insights.conversions / days * 1.5) + (campaign.insights.conversions / days * 0.5))
      };
    });
    
    return {
      ...campaign.insights,
      dailyData
    };
  } catch (error) {
    console.error(`Error fetching insights for campaign ${campaignId}:`, error);
    toast.error('Failed to fetch campaign insights');
    throw error;
  }
};

// Create a new campaign
export const createCampaign = async (adAccountId, campaignData) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.post(`https://graph.facebook.com/v16.0/${adAccountId}/campaigns`, {
    //   name: campaignData.name,
    //   objective: campaignData.objective,
    //   status: campaignData.status,
    //   special_ad_categories: [],
    //   daily_budget: campaignData.dailyBudget * 100, // Convert to cents
    //   access_token: accessToken
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a mock campaign
    const newCampaign = {
      id: `camp_${Date.now()}`,
      name: campaignData.name,
      status: campaignData.status || 'PAUSED',
      objective: campaignData.objective,
      adAccountId,
      dailyBudget: parseFloat(campaignData.dailyBudget),
      lifetimeBudget: parseFloat(campaignData.lifetimeBudget) || null,
      startTime: campaignData.startTime || new Date().toISOString(),
      endTime: campaignData.endTime || null,
      createdTime: new Date().toISOString(),
      insights: null // New campaign has no insights yet
    };
    
    // In a real app, we would add this to the database
    // For this mock, we'll just return the new campaign
    toast.success('Campaign created successfully');
    return newCampaign;
  } catch (error) {
    console.error('Error creating campaign:', error);
    toast.error('Failed to create campaign');
    throw error;
  }
};

// Update a campaign
export const updateCampaign = async (campaignId, campaignData) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.post(`https://graph.facebook.com/v16.0/${campaignId}`, {
    //   name: campaignData.name,
    //   status: campaignData.status,
    //   daily_budget: campaignData.dailyBudget * 100, // Convert to cents
    //   access_token: accessToken
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find the campaign to update
    const campaignIndex = MOCK_CAMPAIGNS.findIndex(camp => camp.id === campaignId);
    if (campaignIndex === -1) {
      throw new Error('Campaign not found');
    }
    
    // Update the campaign
    const updatedCampaign = {
      ...MOCK_CAMPAIGNS[campaignIndex],
      ...campaignData
    };
    
    // In a real app, we would update this in the database
    // For this mock, we'll just return the updated campaign
    toast.success('Campaign updated successfully');
    return updatedCampaign;
  } catch (error) {
    console.error(`Error updating campaign ${campaignId}:`, error);
    toast.error('Failed to update campaign');
    throw error;
  }
};

// Delete a campaign
export const deleteCampaign = async (campaignId) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.delete(`https://graph.facebook.com/v16.0/${campaignId}`, {
    //   params: {
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, we would delete this from the database
    // For this mock, we'll just return success
    toast.success('Campaign deleted successfully');
    return true;
  } catch (error) {
    console.error(`Error deleting campaign ${campaignId}:`, error);
    toast.error('Failed to delete campaign');
    throw error;
  }
};
