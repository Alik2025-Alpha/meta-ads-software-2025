import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMetaAccounts } from '../contexts/MetaAccountsContext'
import { FiLink, FiX, FiCheck, FiAlertTriangle } from 'react-icons/fi'

const connectionSchema = Yup.object().shape({
  accessToken: Yup.string().required('Access token is required')
})

export default function AccountConnection() {
  const { connectedAccounts, connectAccount, disconnectAccount, loading } = useMetaAccounts()
  const [connecting, setConnecting] = useState(false)

  const handleConnect = async (values, { setSubmitting, resetForm }) => {
    try {
      setConnecting(true)
      await connectAccount(values.accessToken)
      resetForm()
    } catch (error) {
      console.error('Error connecting account:', error)
    } finally {
      setConnecting(false)
      setSubmitting(false)
    }
  }

  const handleDisconnect = async (accountId) => {
    try {
      await disconnectAccount(accountId)
    } catch (error) {
      console.error('Error disconnecting account:', error)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Connect Meta Account</h1>
        <p className="text-gray-600 dark:text-gray-400">Link your Meta Business Manager account to access your ad accounts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connection form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Connection</h2>
          
          <div className="mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-900 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertTriangle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    How to get your access token
                  </h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Go to <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="underline">Meta for Developers</a></li>
                      <li>Create a new app or use an existing one</li>
                      <li>Navigate to Tools > Graph API Explorer</li>
                      <li>Select your app and request the necessary permissions</li>
                      <li>Click "Generate Access Token"</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Formik
            initialValues={{ accessToken: '' }}
            validationSchema={connectionSchema}
            onSubmit={handleConnect}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="accessToken" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Access Token
                  </label>
                  <Field
                    id="accessToken"
                    name="accessToken"
                    type="text"
                    placeholder="Enter your Meta access token"
                    className="input-field"
                  />
                  <ErrorMessage name="accessToken" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting || connecting}
                    className="btn-primary flex items-center"
                  >
                    {connecting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <FiLink className="mr-2" />
                        Connect Account
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    onClick={() => window.open('https://developers.facebook.com/docs/marketing-api/access', '_blank')}
                  >
                    Learn more about access tokens
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        
        {/* Connected accounts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Connected Accounts</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : connectedAccounts.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600">
                <FiLink className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No accounts connected</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Connect your Meta Business Manager account to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {connectedAccounts.map((account) => (
                <div key={account.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{account.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ID: {account.id}</p>
                      <div className="flex items-center mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          account.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {account.status === 'ACTIVE' ? (
                            <FiCheck className="mr-1 h-3 w-3" />
                          ) : (
                            <FiAlertTriangle className="mr-1 h-3 w-3" />
                          )}
                          {account.status}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDisconnect(account.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Ad Accounts ({account.adAccounts?.length || 0})</h4>
                    {account.adAccounts && account.adAccounts.length > 0 ? (
                      <div className="space-y-2">
                        {account.adAccounts.map((adAccount) => (
                          <div key={adAccount.id} className="bg-gray-50 dark:bg-gray-700 rounded p-2 text-xs">
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-900 dark:text-white">{adAccount.name}</span>
                              <span className={`${
                                adAccount.status === 'ACTIVE' 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : 'text-yellow-600 dark:text-yellow-400'
                              }`}>
                                {adAccount.status}
                              </span>
                            </div>
                            <div className="mt-1 text-gray-500 dark:text-gray-400">
                              Balance: ${adAccount.balance.toFixed(2)} {adAccount.currency}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400">No ad accounts available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
