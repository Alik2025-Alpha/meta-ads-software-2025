
// This is a mock implementation for the Meta API authentication
// In a real application, you would use the actual Meta JavaScript SDK

const MOCK_USER = {
  id: "10158562709123456",
  name: "John Doe",
  email: "john.doe@example.com",
  picture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
};

export const initializeMeta = () => {
  return new Promise((resolve) => {
    // Simulate SDK initialization
    console.log("Meta SDK initialized");
    resolve();
  });
};

export const metaLogin = () => {
  return new Promise((resolve, reject) => {
    // Simulate Meta login process
    setTimeout(() => {
      // Store user in localStorage to persist session
      localStorage.setItem('meta_user', JSON.stringify(MOCK_USER));
      resolve(MOCK_USER);
    }, 1000);
  });
};

export const metaLogout = () => {
  return new Promise((resolve) => {
    // Clear user from localStorage
    localStorage.removeItem('meta_user');
    resolve();
  });
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    // Get user from localStorage
    const user = localStorage.getItem('meta_user');
    resolve(user ? JSON.parse(user) : null);
  });
};

export const getMetaAccessToken = () => {
  return new Promise((resolve) => {
    // In a real app, this would get the actual access token
    resolve("EAABZAWz6ZCZCZBoBAMZAZBZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZCZC