import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FiImage, FiVideo, FiCopy, FiDownload, FiRefreshCw, FiCheck } from 'react-icons/fi'

const adGeneratorSchema = Yup.object().shape({
  objective: Yup.string().required('Objective is required'),
  product: Yup.string().required('Product/Service is required'),
  audience: Yup.string().required('Target audience is required'),
  tone: Yup.string().required('Tone is required'),
  keyPoints: Yup.string().required('Key points are required')
})

export default function AdGenerator() {
  const [generating, setGenerating] = useState(false)
  const [generatedAds, setGeneratedAds] = useState(null)
  const [selectedAdIndex, setSelectedAdIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async (values, { setSubmitting }) => {
    try {
      setGenerating(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      // Mock generated ads
      const mockAds = {
        headline: [
          "Transform Your Business with Our Revolutionary Solution",
          "Unlock New Possibilities: The Smart Choice for Growth",
          "Elevate Your Performance: See Results in Days, Not Months"
        ],
        description: [
          "Our cutting-edge platform helps businesses streamline operations and boost productivity. Perfect for teams looking to scale efficiently while maintaining quality. Try it risk-free today!",
          "Designed for forward-thinking businesses, our solution integrates seamlessly with your workflow. Reduce costs, increase output, and watch your business thrive. Limited-time offer available now.",
          "Join thousands of satisfied customers who've transformed their approach. Our data-driven solution delivers measurable results from day one. Schedule your demo and see the difference!"
        ],
        callToAction: [
          "Get Started Today",
          "Book Your Free Demo",
          "Claim Special Offer"
        ],
        imagePrompts: [
          "Professional team collaborating in modern office with digital displays showing growth charts",
          "Close-up of person using sleek digital interface with glowing elements representing data flow",
          "Aerial view of business district with connected network lines overlaid, representing digital transformation"
        ]
      }
      
      setGeneratedAds(mockAds)
      setSelectedAdIndex(0)
    } catch (error) {
      console.error('Error generating ads:', error)
    } finally {
      setGenerating(false)
      setSubmitting(false)
    }
  }

  const handleCopyAd = () => {
    if (!generatedAds) return
    
    const adText = `Headline: ${generatedAds.headline[selectedAdIndex]}\n\nDescription: ${generatedAds.description[selectedAdIndex]}\n\nCTA: ${generatedAds.callToAction[selectedAdIndex]}\n\nImage Prompt: ${generatedAds.imagePrompts[selectedAdIndex]}`
    
    navigator.clipboard.writeText(adText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ad Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">Create compelling ad copy and visuals with AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ad Details</h2>
          
          <Formik
            initialValues={{
              objective: '',
              product: '',
              audience: '',
              tone: 'professional',
              keyPoints: ''
            }}
            validationSchema={adGeneratorSchema}
            onSubmit={handleGenerate}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="objective" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Campaign Objective
                  </label>
                  <Field
                    as="select"
                    id="objective"
                    name="objective"
                    className="input-field"
                  >
                    <option value="">Select an objective</option>
                    <option value="awareness">Brand Awareness</option>
                    <option value="consideration">Consideration</option>
                    <option value="conversion">Conversion</option>
                    <option value="lead_generation">Lead Generation</option>
                    <option value="traffic">Website Traffic</option>
                  </Field>
                  <ErrorMessage name="objective" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Product/Service Description
                  </label>
                  <Field
                    as="textarea"
                    id="product"
                    name="product"
                    rows="3"
                    placeholder="Describe your product or service"
                    className="input-field"
                  />
                  <ErrorMessage name="product" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <div>
                  <label htmlFor="audience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Audience
                  </label>
                  <Field
                    type="text"
                    id="audience"
                    name="audience"
                    placeholder="Who is your ideal customer?"
                    className="input-field"
                  />
                  <ErrorMessage name="audience" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <div>
                  <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tone of Voice
                  </label>
                  <Field
                    as="select"
                    id="tone"
                    name="tone"
                    className="input-field"
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="casual">Casual</option>
                    <option value="humorous">Humorous</option>
                    <option value="authoritative">Authoritative</option>
                    <option value="inspirational">Inspirational</option>
                  </Field>
                  <ErrorMessage name="tone" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <div>
                  <label htmlFor="keyPoints" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Key Points to Include
                  </label>
                  <Field
                    as="textarea"
                    id="keyPoints"
                    name="keyPoints"
                    rows="3"
                    placeholder="List the main benefits or features to highlight"
                    className="input-field"
                  />
                  <ErrorMessage name="keyPoints" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || generating}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {generating ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FiRefreshCw className="mr-2" />
                        Generate Ad Content
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        
        {/* Generated content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Generated Ad</h2>
          
          {!generatedAds ? (
            <div className="flex flex-col items-center justify-center h-80 text-center">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4">
                <FiImage className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Fill out the form and click "Generate" to create ad content
              </p>
            </div>
          ) : (
            <div>
              {/* Ad preview */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Ad Preview</h3>
                  <div className="flex space-x-2">
                    {generatedAds.headline.map((_, index) => (
                      <button
                        key={index}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          selectedAdIndex === index
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                        onClick={() => setSelectedAdIndex(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Headline</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      {generatedAds.headline[selectedAdIndex]}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Description</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {generatedAds.description[selectedAdIndex]}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Call to Action</p>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {generatedAds.callToAction[selectedAdIndex]}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Image Prompt</p>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md text-sm text-gray-700 dark:text-gray-300">
                      {generatedAds.imagePrompts[selectedAdIndex]}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="btn-primary flex-1 flex items-center justify-center"
                  onClick={() => window.location.href = '/create-campaign'}
                >
                  <FiVideo className="mr-2" />
                  Create Campaign
                </button>
                
                <button
                  type="button"
                  className="btn-secondary flex-1 flex items-center justify-center"
                  onClick={handleCopyAd}
                >
                  {copied ? (
                    <>
                      <FiCheck className="mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy className="mr-2" />
                      Copy Ad
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  className="btn-secondary flex-1 flex items-center justify-center"
                >
                  <FiDownload className="mr-2" />
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
