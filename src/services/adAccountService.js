import axios from 'axios';
import { toast } from 'react-toastify';

// Mock data for development
const MOCK_AD_ACCOUNTS = [
  {
    id: 'act_123456789',
    name: 'Main Ad Account',
    status: 'ACTIVE',
    currency: 'USD',
    timezone: 'America/Los_Angeles',
    businessId: '987654321',
    businessName: 'My Business',
    spendCap: 10000,
    amountSpent: 3450.75,
    insights: {
      impressions: 125000,
      clicks: 3500,
      ctr: 2.8,
      spend: 3450.75,
      cpc: 0.99,
      conversions: 210,
      cpa: 16.43
    }
  },
  {
    id: 'act_987654321',
    name: 'Secondary Ad Account',
    status: 'ACTIVE',
    currency: 'USD',
    timezone: 'America/New_York',
    businessId: '987654321',
    businessName: 'My Business',
    spendCap: 5000,
    amountSpent: 1250.50,
    insights: {
      impressions: 75000,
      clicks: 1800,
      ctr: 2.4,
      spend: 1250.50,
      cpc: 0.69,
      conversions: 95,
      cpa: 13.16
    }
  }
];

// Get all ad accounts for the current user
export const getAdAccounts = async () => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get('https://graph.facebook.com/v16.0/me/adaccounts', {
    //   params: {
    //     fields: 'id,name,account_status,currency,timezone_name,business,spend_cap,amount_spent',
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    return MOCK_AD_ACCOUNTS;
  } catch (error) {
    console.error('Error fetching ad accounts:', error);
    toast.error('Failed to fetch ad accounts');
    throw error;
  }
};

// Get a specific ad account by ID
export const getAdAccount = async (accountId) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get(`https://graph.facebook.com/v16.0/${accountId}`, {
    //   params: {
    //     fields: 'id,name,account_status,currency,timezone_name,business,spend_cap,amount_spent',
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    const account = MOCK_AD_ACCOUNTS.find(acc => acc.id === accountId);
    if (!account) {
      throw new Error('Ad account not found');
    }
    return account;
  } catch (error) {
    console.error(`Error fetching ad account ${accountId}:`, error);
    toast.error('Failed to fetch ad account details');
    throw error;
  }
};

// Get insights for an ad account
export const getAdAccountInsights = async (accountId, dateRange = '30d') => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get(`https://graph.facebook.com/v16.0/${accountId}/insights`, {
    //   params: {
    //     fields: 'impressions,clicks,ctr,spend,cpc,actions',
    //     time_range: JSON.stringify({ since: '2023-05-01', until: '2023-05-31' }),
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Return mock data
    const account = MOCK_AD_ACCOUNTS.find(acc => acc.id === accountId);
    if (!account) {
      throw new Error('Ad account not found');
    }
    
    // Generate daily data for the chart
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
    const dailyData = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      
      return {
        date: date.toISOString().split('T')[0],
        impressions: Math.floor(Math.random() * (account.insights.impressions / days * 1.5) + (account.insights.impressions / days * 0.5)),
        clicks: Math.floor(Math.random() * (account.insights.clicks / days * 1.5) + (account.insights.clicks / days * 0.5)),
        spend: (Math.random() * (account.insights.spend / days * 1.5) + (account.insights.spend / days * 0.5)).toFixed(2),
        conversions: Math.floor(Math.random() * (account.insights.conversions / days * 1.5) + (account.insights.conversions / days * 0.5))
      };
    });
    
    return {
      ...account.insights,
      dailyData
    };
  } catch (error) {
    console.error(`Error fetching insights for ad account ${accountId}:`, error);
    toast.error('Failed to fetch ad account insights');
    throw error;
  }
};
