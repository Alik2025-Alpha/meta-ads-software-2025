import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FiSearch, FiTarget, FiUsers, FiDollarSign, FiBarChart2, FiCheckCircle } from 'react-icons/fi'

const websiteSchema = Yup.object().shape({
  url: Yup.string().url('Invalid URL').required('Website URL is required')
})

export default function WebsiteAnalysis() {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleAnalyze = async (values, { setSubmitting }) => {
    try {
      setAnalyzing(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock analysis result
      const result = {
        url: values.url,
        timestamp: new Date().toISOString(),
        metrics: {
          performance: 85,
          seo: 78,
          accessibility: 92,
          bestPractices: 88
        },
        audience: {
          demographics: [
            { age: '18-24', percentage: 15 },
            { age: '25-34', percentage: 32 },
            { age: '35-44', percentage: 28 },
            { age: '45-54', percentage: 18 },
            { age: '55+', percentage: 7 }
          ],
          interests: [
            { name: 'Technology', score: 0.85 },
            { name: 'Shopping', score: 0.72 },
            { name: 'Travel', score: 0.64 },
            { name: 'Fitness', score: 0.58 },
            { name: 'Food & Drink', score: 0.51 }
          ],
          locations: [
            { country: 'United States', percentage: 65 },
            { country: 'United Kingdom', percentage: 12 },
            { country: 'Canada', percentage: 8 },
            { country: 'Australia', percentage: 6 },
            { country: 'Germany', percentage: 4 }
          ]
        },
        recommendations: {
          objectives: [
            { name: 'Conversions', score: 0.92, description: 'Your website has strong conversion elements and clear calls-to-action.' },
            { name: 'Traffic', score: 0.85, description: 'Your content is engaging and likely to drive meaningful site visits.' },
            { name: 'Brand Awareness', score: 0.78, description: 'Your brand elements are consistent and memorable.' }
          ],
          adFormats: [
            { name: 'Single Image', score: 0.88, description: 'Clean layout works well with single image ads.' },
            { name: 'Carousel', score: 0.82, description: 'Multiple products/services could be showcased effectively.' },
            { name: 'Video', score: 0.75, description: 'Dynamic content would complement your offering.' }
          ],
          targeting: [
            { name: 'Interest-based', description: 'Target users interested in Technology and Shopping.' },
            { name: 'Lookalike Audiences', description: 'Create lookalike audiences based on your current customers.' },
            { name: 'Geographic', description: 'Focus on US, UK, and Canada for best results.' }
          ]
        }
      }
      
      setAnalysisResult(result)
    } catch (error) {
      console.error('Error analyzing website:', error)
    } finally {
      setAnalyzing(false)
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Website Analysis</h1>
        <p className="text-gray-600 dark:text-gray-400">Analyze your website to get ad recommendations</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Enter Website URL</h2>
        
        <Formik
          initialValues={{ url: '' }}
          validationSchema={websiteSchema}
          onSubmit={handleAnalyze}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <Field
                    id="url"
                    name="url"
                    type="text"
                    placeholder="https://example.com"
                    className="input-field"
                  />
                  <ErrorMessage name="url" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || analyzing}
                  className="btn-primary flex items-center justify-center whitespace-nowrap"
                >
                  {analyzing ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FiSearch className="mr-2" />
                      Analyze Website
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {analysisResult && (
        <div className="space-y-6">
          {/* Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Analysis Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-800 rounded-md p-2">
                    <FiBarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Performance</p>
                    <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">{analysisResult.metrics.performance}/100</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 dark:bg-green-800 rounded-md p-2">
                    <FiTarget className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">SEO</p>
                    <p className="text-xl font-semibold text-green-600 dark:text-green-400">{analysisResult.metrics.seo}/100</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-800 rounded-md p-2">
                    <FiUsers className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Accessibility</p>
                    <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">{analysisResult.metrics.accessibility}/100</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-800 rounded-md p-2">
                    <FiCheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Best Practices</p>
                    <p className="text-xl font-semibold text-orange-600 dark:text-orange-400">{analysisResult.metrics.bestPractices}/100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Audience Insights */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Audience Insights</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Demographics */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Age Demographics</h3>
                <div className="space-y-2">
                  {analysisResult.audience.demographics.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-12">{item.age}</span>
                      <div className="flex-grow mx-2">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Interests */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Interests</h3>
                <div className="space-y-2">
                  {analysisResult.audience.interests.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-24 truncate">{item.name}</span>
                      <div className="flex-grow mx-2">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${item.score * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{(item.score * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Locations */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Top Locations</h3>
                <div className="space-y-2">
                  {analysisResult.audience.locations.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-24 truncate">{item.country}</span>
                      <div className="flex-grow mx-2">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ad Recommendations</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Campaign Objectives */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <div className="flex items-center">
                    <FiTarget className="mr-1 h-4 w-4 text-blue-500" />
                    Recommended Objectives
                  </div>
                </h3>
                <div className="space-y-3">
                  {analysisResult.recommendations.objectives.map((item, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full">
                          {(item.score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Ad Formats */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <div className="flex items-center">
                    <FiBarChart2 className="mr-1 h-4 w-4 text-green-500" />
                    Recommended Ad Formats
                  </div>
                </h3>
                <div className="space-y-3">
                  {analysisResult.recommendations.adFormats.map((item, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">
                          {(item.score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Targeting */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <div className="flex items-center">
                    <FiUsers className="mr-1 h-4 w-4 text-purple-500" />
                    Targeting Recommendations
                  </div>
                </h3>
                <div className="space-y-3">
                  {analysisResult.recommendations.targeting.map((item, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                className="btn-primary flex items-center"
                onClick={() => window.location.href = '/create-campaign'}
              >
                <FiDollarSign className="mr-2" />
                Create Campaign with These Recommendations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
