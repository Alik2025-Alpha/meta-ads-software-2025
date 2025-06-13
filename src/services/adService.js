import { toast } from 'react-toastify';

// Mock data for development
const MOCK_ADS = [
  {
    id: 'ad_123456789',
    name: 'Summer Sale - Main Image Ad',
    status: 'ACTIVE',
    adSetId: 'adset_123456789',
    creativeId: 'creative_123456789',
    creative: {
      id: 'creative_123456789',
      name: 'Summer Sale Creative',
      objectStorySpec: {
        pageId: '123456789',
        linkData: {
          imageHash: 'abc123def456',
          link: 'https://example.com/summer-sale',
          message: 'Summer Sale! Up to 50% off on all products. Limited time only.',
          name: 'Summer Sale - Up to 50% Off',
          description: 'Shop now and save big on our summer collection.',
          callToAction: {
            type: 'SHOP_NOW'
          }
        }
      },
      imageUrl: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    insights: {
      impressions: 15000,
      clicks: 650,
      ctr: 4.33,
      spend: 325.75,
      cpc: 0.50,
      conversions: 35,
      cpa: 9.31,
      roas: 5.2
    }
  },
  {
    id: 'ad_234567890',
    name: 'Summer Sale - Carousel Ad',
    status: 'ACTIVE',
    adSetId: 'adset_123456789',
    creativeId: 'creative_234567890',
    creative: {
      id: 'creative_234567890',
      name: 'Summer Sale Carousel',
      objectStorySpec: {
        pageId: '123456789',
        linkData: {
          childAttachments: [
            {
              link: 'https://example.com/product1',
              name: 'Summer Dresses',
              description: 'Perfect for hot days',
              imageHash: 'abc123def456',
              callToAction: {
                type: 'SHOP_NOW'
              }
            },
            {
              link: 'https://example.com/product2',
              name: 'Beach Accessories',
              description: 'Complete your summer look',
              imageHash: 'ghi789jkl012',
              callToAction: {
                type: 'SHOP_NOW'
              }
            },
            {
              link: 'https://example.com/product3',
              name: 'Swimwear Collection',
              description: 'New styles available',
              imageHash: 'mno345pqr678',
              callToAction: {
                type: 'SHOP_NOW'
              }
            }
          ],
          link: 'https://example.com/summer-sale',
          message: 'Check out our summer collection with up to 50% off!',
          callToAction: {
            type: 'SHOP_NOW'
          }
        }
      },
      imageUrl: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    insights: {
      impressions: 18000,
      clicks: 820,
      ctr: 4.56,
      spend: 410.50,
      cpc: 0.50,
      conversions: 42,
      cpa: 9.77,
      roas: 4.8
    }
  },
  {
    id: 'ad_345678901',
    name: 'Summer Sale - Video Ad',
    status: 'ACTIVE',
    adSetId: 'adset_123456789',
    creativeId: 'creative_345678901',
    creative: {
      id: 'creative_345678901',
      name: 'Summer Sale Video',
      objectStorySpec: {
        pageId: '123456789',
        videoData: {
          videoId: 'video_123456789',
          imageUrl: 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          link: 'https://example.com/summer-sale',
          message: 'Watch our summer collection in action! Up to 50% off on all products.',
          name: 'Summer Collection Showcase',
          description: 'See how our products look in real life.',
          callToAction: {
            type: 'SHOP_NOW'
          }
        }
      },
      imageUrl: 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    insights: {
      impressions: 22000,
      clicks: 950,
      ctr: 4.32,
      spend: 475.25,
      cpc: 0.50,
      conversions: 48,
      cpa: 9.90,
      roas: 4.5
    }
  },
  {
    id: 'ad_456789012',
    name: 'Retargeting - Cart Abandoners',
    status: 'ACTIVE',
    adSetId: 'adset_234567890',
    creativeId: 'creative_456789012',
    creative: {
      id: 'creative_456789012',
      name: 'Cart Abandonment Creative',
      objectStorySpec: {
        pageId: '123456789',
        linkData: {
          imageHash: 'abc123def456',
          link: 'https://example.com/cart',
          message: 'Did you forget something? Complete your purchase now and get an extra 10% off!',
          name: 'Complete Your Purchase',
          description: 'Your cart is waiting for you. Limited time offer!',
          callToAction: {
            type: 'SHOP_NOW'
          }
        }
      },
      imageUrl: 'https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    insights: {
      impressions: 8000,
      clicks: 520,
      ctr: 6.50,
      spend: 260.00,
      cpc: 0.50,
      conversions: 65,
      cpa: 4.00,
      roas: 12.5
    }
  },
  {
    id: 'ad_567890123',
    name: 'New Product - Main Ad',
    status: 'ACTIVE',
    adSetId: 'adset_345678901',
    creativeId: 'creative_567890123',
    creative: {
      id: 'creative_567890123',
      name: 'New Product Launch Creative',
      objectStorySpec: {
        pageId: '123456789',
        linkData: {
          imageHash: 'abc123def456',
          link: 'https://example.com/new-product',
          message: 'Introducing our newest innovation! Be the first to experience it.',
          name: 'New Product Launch',
          description: 'Cutting-edge technology meets elegant design.',
          callToAction: {
            type: 'LEARN_MORE'
          }
        }
      },
      imageUrl: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
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
  }
];

// Get all ads for an ad set
export const getAds = async (adSetId) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get(`https://graph.facebook.com/v16.0/${adSetId}/ads`, {
    //   params: {
    //     fields: 'id,name,status,creative{id,name,object_story_spec}',
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data filtered by ad set
    return MOCK_ADS.filter(ad => ad.adSetId === adSetId);
  } catch (error) {
    console.error(`Error fetching ads for ad set ${adSetId}:`, error);
    toast.error('Failed to fetch ads');
    throw error;
  }
};

// Get a specific ad by ID
export const getAd = async (adId) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get(`https://graph.facebook.com/v16.0/${adId}`, {
    //   params: {
    //     fields: 'id,name,status,creative{id,name,object_story_spec}',
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    const ad = MOCK_ADS.find(a => a.id === adId);
    if (!ad) {
      throw new Error('Ad not found');
    }
    return ad;
  } catch (error) {
    console.error(`Error fetching ad ${adId}:`, error);
    toast.error('Failed to fetch ad details');
    throw error;
  }
};

// Get insights for an ad
export const getAdInsights = async (adId, dateRange = '30d') => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.get(`https://graph.facebook.com/v16.0/${adId}/insights`, {
    //   params: {
    //     fields: 'impressions,clicks,ctr,spend,cpc,actions',
    //     time_range: JSON.stringify({ since: '2023-05-01', until: '2023-05-31' }),
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    const ad = MOCK_ADS.find(a => a.id === adId);
    if (!ad) {
      throw new Error('Ad not found');
    }
    
    // Generate daily data for the chart
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
    const dailyData = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      
      return {
        date: date.toISOString().split('T')[0],
        impressions: Math.floor(Math.random() * (ad.insights.impressions / days * 1.5) + (ad.insights.impressions / days * 0.5)),
        clicks: Math.floor(Math.random() * (ad.insights.clicks / days * 1.5) + (ad.insights.clicks / days * 0.5)),
        spend: (Math.random() * (ad.insights.spend / days * 1.5) + (ad.insights.spend / days * 0.5)).toFixed(2),
        conversions: Math.floor(Math.random() * (ad.insights.conversions / days * 1.5) + (ad.insights.conversions / days * 0.5))
      };
    });
    
    return {
      ...ad.insights,
      dailyData
    };
  } catch (error) {
    console.error(`Error fetching insights for ad ${adId}:`, error);
    toast.error('Failed to fetch ad insights');
    throw error;
  }
};

// Create a new ad
export const createAd = async (adSetId, adData) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.post(`https://graph.facebook.com/v16.0/${adSetId}/ads`, {
    //   name: adData.name,
    //   status: adData.status,
    //   creative: adData.creativeId,
    //   access_token: accessToken
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a mock ad
    const newAd = {
      id: `ad_${Date.now()}`,
      name: adData.name,
      status: adData.status || 'PAUSED',
      adSetId,
      creativeId: adData.creativeId,
      creative: {
        id: adData.creativeId,
        name: adData.creativeName || `Creative for ${adData.name}`,
        objectStorySpec: adData.objectStorySpec || {
          pageId: '123456789',
          linkData: {
            imageHash: 'abc123def456',
            link: 'https://example.com',
            message: 'Check out our products!',
            name: 'Product Promotion',
            description: 'Great deals available now.',
            callToAction: {
              type: 'SHOP_NOW'
            }
          }
        },
        imageUrl: adData.imageUrl || 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      insights: null // New ad has no insights yet
    };
    
    // In a real app, we would add this to the database
    // For this mock, we'll just return the new ad
    toast.success('Ad created successfully');
    return newAd;
  } catch (error) {
    console.error('Error creating ad:', error);
    toast.error('Failed to create ad');
    throw error;
  }
};

// Update an ad
export const updateAd = async (adId, adData) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.post(`https://graph.facebook.com/v16.0/${adId}`, {
    //   name: adData.name,
    //   status: adData.status,
    //   access_token: accessToken
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find the ad to update
    const adIndex = MOCK_ADS.findIndex(a => a.id === adId);
    if (adIndex === -1) {
      throw new Error('Ad not found');
    }
    
    // Update the ad
    const updatedAd = {
      ...MOCK_ADS[adIndex],
      ...adData
    };
    
    // In a real app, we would update this in the database
    // For this mock, we'll just return the updated ad
    toast.success('Ad updated successfully');
    return updatedAd;
  } catch (error) {
    console.error(`Error updating ad ${adId}:`, error);
    toast.error('Failed to update ad');
    throw error;
  }
};

// Delete an ad
export const deleteAd = async (adId) => {
  try {
    // In a real app, this would call the Meta Marketing API
    // const response = await axios.delete(`https://graph.facebook.com/v16.0/${adId}`, {
    //   params: {
    //     access_token: accessToken
    //   }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, we would delete this from the database
    // For this mock, we'll just return success
    toast.success('Ad deleted successfully');
    return true;
  } catch (error) {
    console.error(`Error deleting ad ${adId}:`, error);
    toast.error('Failed to delete ad');
    throw error;
  }
};
