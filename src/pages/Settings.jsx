import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../contexts/AuthContext'
import { FiUser, FiLock, FiCreditCard, FiBell, FiGlobe, FiSave } from 'react-icons/fi'
import { toast } from 'react-toastify'

const profileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  company: Yup.string()
})

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required')
})

export default function Settings() {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  const handleProfileSubmit = async (values, { setSubmitting }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Password updated successfully')
      resetForm()
    } catch (error) {
      toast.error('Failed to update password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-700">
            <nav className="p-4 md:p-6">
              <ul className="space-y-1">
                <li>
                  <button
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'profile'
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <FiUser className={`mr-3 h-5 w-5 ${
                      activeTab === 'profile'
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`} />
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'password'
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setActiveTab('password')}
                  >
                    <FiLock className={`mr-3 h-5 w-5 ${
                      activeTab === 'password'
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`} />
                    Password
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'billing'
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setActiveTab('billing')}
                  >
                    <FiCreditCard className={`mr-3 h-5 w-5 ${
                      activeTab === 'billing'
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`} />
                    Billing
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'notifications'
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <FiBell className={`mr-3 h-5 w-5 ${
                      activeTab === 'notifications'
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`} />
                    Notifications
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === 'preferences'
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setActiveTab('preferences')}
                  >
                    <FiGlobe className={`mr-3 h-5 w-5 ${
                      activeTab === 'preferences'
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`} />
                    Preferences
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Profile Settings</h2>
                
                <Formik
                  initialValues={{
                    name: 'John Doe',
                    email: currentUser?.email || '',
                    company: 'Acme Inc.',
                    jobTitle: 'Marketing Manager',
                    bio: ''
                  }}
                  validationSchema={profileSchema}
                  onSubmit={handleProfileSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6">
                      <div className="flex items-center mb-6">
                        <div className="h-20 w-20 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xl font-medium uppercase">
                          JD
                        </div>
                        <div className="ml-5">
                          <button
                            type="button"
                            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            className="ml-2 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name
                          </label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className="input-field"
                          />
                          <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                          </label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="input-field"
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Company
                          </label>
                          <Field
                            type="text"
                            id="company"
                            name="company"
                            className="input-field"
                          />
                          <ErrorMessage name="company" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div>
                          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Job Title
                          </label>
                          <Field
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            className="input-field"
                          />
                          <ErrorMessage name="jobTitle" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Bio
                        </label>
                        <Field
                          as="textarea"
                          id="bio"
                          name="bio"
                          rows="4"
                          placeholder="Tell us about yourself"
                          className="input-field"
                        />
                        <ErrorMessage name="bio" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary flex items-center"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                              Saving...
                            </>
                          ) : (
                            <>
                              <FiSave className="mr-2" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
            
            {/* Password Tab */}
            {activeTab === 'password' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Change Password</h2>
                
                <Formik
                  initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  }}
                  validationSchema={passwordSchema}
                  onSubmit={handlePasswordSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Current Password
                        </label>
                        <Field
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          className="input-field"
                        />
                        <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          New Password
                        </label>
                        <Field
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          className="input-field"
                        />
                        <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Confirm New Password
                        </label>
                        <Field
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="input-field"
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary flex items-center"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                              Updating...
                            </>
                          ) : (
                            <>
                              <FiSave className="mr-2" />
                              Update Password
                            </>
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
            
            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Billing Settings</h2>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Current Plan</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">Pro Plan</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">$49/month, billed monthly</p>
                    </div>
                    <button className="btn-secondary text-sm">
                      Upgrade Plan
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Method</h3>
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                          <FiCreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Visa ending in 4242</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/2024</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                          Edit
                        </button>
                        <button className="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                    <FiPlus className="mr-1 h-4 w-4" />
                    Add Payment Method
                  </button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Billing History</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Description
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Receipt
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            May 1, 2023
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            Pro Plan - Monthly
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            $49.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                              Download
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            Apr 1, 2023
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            Pro Plan - Monthly
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            $49.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                              Download
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            Mar 1, 2023
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            Pro Plan - Monthly
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            $49.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                              Download
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Campaign Updates</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates about your campaign performance</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="campaign-updates"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Account Activity</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications about account activity</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="account-activity"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Billing Updates</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications about billing and payments</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="billing-updates"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Product Updates</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates about new features and improvements</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="product-updates"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Campaign Alerts</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Receive alerts when campaigns need attention</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="campaign-alerts"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Performance Milestones</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications when campaigns reach milestones</p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="performance-milestones"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn-primary flex items-center"
                    >
                      <FiSave className="mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">App Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Appearance</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="theme-light"
                              name="theme"
                              value="light"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="theme-light" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Light
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="theme-dark"
                              name="theme"
                              value="dark"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              defaultChecked
                            />
                            <label htmlFor="theme-dark" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Dark
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="theme-system"
                              name="theme"
                              value="system"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="theme-system" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              System
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Language & Region</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="language" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                          Language
                        </label>
                        <select
                          id="language"
                          className="input-field"
                          defaultValue="en"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="it">Italian</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="timezone" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                          Timezone
                        </label>
                        <select
                          id="timezone"
                          className="input-field"
                          defaultValue="America/New_York"
                        >
                          <option value="America/New_York">Eastern Time (US & Canada)</option>
                          <option value="America/Chicago">Central Time (US & Canada)</option>
                          <option value="America/Denver">Mountain Time (US & Canada)</option>
                          <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                          <option value="Europe/London">London</option>
                          <option value="Europe/Paris">Paris</option>
                          <option value="Asia/Tokyo">Tokyo</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="dateFormat" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                          Date Format
                        </label>
                        <select
                          id="dateFormat"
                          className="input-field"
                          defaultValue="MM/DD/YYYY"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn-primary flex items-center"
                    >
                      <FiSave className="mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
