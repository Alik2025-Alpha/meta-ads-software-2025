import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { useAdAccount } from '../contexts/AdAccountContext'
import { FiPlus, FiTrash2, FiImage, FiTarget, FiDollarSign, FiCalendar, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify'

const campaignSchema = Yup.object().shape({
  name: Yup.string().required('Campaign name is required'),
  objective: Yup.string().required('Objective is required'),
  budget: Yup.object().shape({
    amount: Yup.number().required('Budget amount is required').positive('Budget must be positive'),
    type: Yup.string().required('Budget type is required')
  }),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required').min(
    Yup.ref('startDate'),
    'End date must be after start date'
  ),
  targeting: Yup.object().shape({
    countries: Yup.array().of(Yup.string()).min(1, 'Select at least one country'),
    ageRange: Yup.object().shape({
      min: Yup.number().required('Minimum age is required'),
      max: Yup.number().required('Maximum age is required')
    }),
    genders: Yup.array().of(Yup.string()).min(1, 'Select at least one gender'),
    interests: Yup.array().of(Yup.string()).min(1, 'Add at least one interest')
  }),
  adCreatives: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Ad title is required'),
      description: Yup.string().required('Ad description is required'),
      imageUrl: Yup.string().required('Image URL is required')
    })
  ).min(1, 'Add at least one ad creative')
})

export default function CreateCampaign() {
  const { createCampaign } = useAdAccount()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(1)
  const [creating, setCreating] = useState(false)

  const initialValues = {
    name: '',
    objective: '',
    budget: {
      amount: '',
      type: 'DAILY'
    },
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    targeting: {
      countries: ['US'],
      ageRange: {
        min: 18,
        max: 65
      },
      genders: ['MALE', 'FEMALE'],
      interests: ['Technology']
    },
    adCreatives: [
      {
        title: '',
        description: '',
        imageUrl: ''
      }
    ]
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setCreating(true)
      const campaign = await createCampaign(values)
      toast.success('Campaign created successfully')
      navigate(`/campaign/${campaign.id}`)
    } catch (error) {
      console.error('Error creating campaign:', error)
      toast.error('Failed to create campaign')
    } finally {
      setCreating(false)
      setSubmitting(false)
    }
  }

  const nextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1))
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Campaign</h1>
        <p className="text-gray-600 dark:text-gray-400">Set up a new advertising campaign</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                activeStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {activeStep > 1 ? <FiCheck className="h-5 w-5" /> : 1}
              </div>
              <div className={`ml-2 text-sm font-medium ${
                activeStep >= 1 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}>
                Campaign Details
              </div>
            </div>
            <div className={`flex-grow border-t mx-4 ${
              activeStep >= 2 ? 'border-blue-600 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'
            }`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {activeStep > 2 ? <FiCheck className="h-5 w-5" /> : 2}
              </div>
              <div className={`ml-2 text-sm font-medium ${
                activeStep >= 2 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}>
                Targeting
              </div>
            </div>
            <div className={`flex-grow border-t mx-4 ${
              activeStep >= 3 ? 'border-blue-600 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'
            }`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                activeStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {activeStep > 3 ? <FiCheck className="h-5 w-5" /> : 3}
              </div>
              <div className={`ml-2 text-sm font-medium ${
                activeStep >= 3 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}>
                Ad Creatives
              </div>
            </div>
            <div className={`flex-grow border-t mx-4 ${
              activeStep >= 4 ? 'border-blue-600 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'
            }`}></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                activeStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {activeStep > 4 ? <FiCheck className="h-5 w-5" /> : 4}
              </div>
              <div className={`ml-2 text-sm font-medium ${
                activeStep >= 4 ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}>
                Review
              </div>
            </div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={campaignSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form>
              {/* Step 1: Campaign Details */}
              {activeStep === 1 && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center">
                    <FiDollarSign className="mr-2 h-5 w-5 text-blue-500" />
                    Campaign Details
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Campaign Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter campaign name"
                        className="input-field"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    
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
                        <option value="AWARENESS">Brand Awareness</option>
                        <option value="TRAFFIC">Traffic</option>
                        <option value="ENGAGEMENT">Engagement</option>
                        <option value="CONVERSIONS">Conversions</option>
                        <option value="APP_INSTALLS">App Installs</option>
                        <option value="LEAD_GENERATION">Lead Generation</option>
                      </Field>
                      <ErrorMessage name="objective" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="budget.type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Budget Type
                        </label>
                        <Field
                          as="select"
                          id="budget.type"
                          name="budget.type"
                          className="input-field"
                        >
                          <option value="DAILY">Daily Budget</option>
                          <option value="LIFETIME">Lifetime Budget</option>
                        </Field>
                        <ErrorMessage name="budget.type" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label htmlFor="budget.amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Budget Amount
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400">$</span>
                          </div>
                          <Field
                            type="number"
                            id="budget.amount"
                            name="budget.amount"
                            placeholder="0.00"
                            className="input-field pl-8"
                          />
                        </div>
                        <ErrorMessage name="budget.amount" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Start Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiCalendar className="h-5 w-5 text-gray-400" />
                          </div>
                          <Field
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="input-field pl-10"
                          />
                        </div>
                        <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      
                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          End Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiCalendar className="h-5 w-5 text-gray-400" />
                          </div>
                          <Field
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="input-field pl-10"
                          />
                        </div>
                        <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Targeting */}
              {activeStep === 2 && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center">
                    <FiTarget className="mr-2 h-5 w-5 text-blue-500" />
                    Audience Targeting
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Countries
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'IT', 'ES'].map((country) => (
                          <div key={country} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`country-${country}`}
                              checked={values.targeting.countries.includes(country)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue('targeting.countries', [...values.targeting.countries, country])
                                } else {
                                  setFieldValue(
                                    'targeting.countries',
                                    values.targeting.countries.filter(c => c !== country)
                                  )
                                }
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`country-${country}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              {country}
                            </label>
                          </div>
                        ))}
                      </div>
                      {errors.targeting?.countries && touched.targeting?.countries && (
                        <div className="text-red-500 text-sm mt-1">{errors.targeting.countries}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Age Range
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="targeting.ageRange.min" className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Minimum Age
                          </label>
                          <Field
                            type="number"
                            id="targeting.ageRange.min"
                            name="targeting.ageRange.min"
                            min="13"
                            max="65"
                            className="input-field"
                          />
                          <ErrorMessage name="targeting.ageRange.min" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                          <label htmlFor="targeting.ageRange.max" className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Maximum Age
                          </label>
                          <Field
                            type="number"
                            id="targeting.ageRange.max"
                            name="targeting.ageRange.max"
                            min="13"
                            max="65"
                            className="input-field"
                          />
                          <ErrorMessage name="targeting.ageRange.max" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Gender
                      </label>
                      <div className="flex space-x-4">
                        {[
                          { id: 'MALE', label: 'Male' },
                          { id: 'FEMALE', label: 'Female' }
                        ].map((gender) => (
                          <div key={gender.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`gender-${gender.id}`}
                              checked={values.targeting.genders.includes(gender.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue('targeting.genders', [...values.targeting.genders, gender.id])
                                } else {
                                  setFieldValue(
                                    'targeting.genders',
                                    values.targeting.genders.filter(g => g !== gender.id)
                                  )
                                }
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`gender-${gender.id}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              {gender.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      {errors.targeting?.genders && touched.targeting?.genders && (
                        <div className="text-red-500 text-sm mt-1">{errors.targeting.genders}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Interests
                      </label>
                      <FieldArray name="targeting.interests">
                        {({ push, remove }) => (
                          <div>
                            {values.targeting.interests.map((interest, index) => (
                              <div key={index} className="flex items-center mb-2">
                                <Field
                                  type="text"
                                  name={`targeting.interests.${index}`}
                                  placeholder="Enter an interest"
                                  className="input-field"
                                />
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  <FiTrash2 className="h-5 w-5" />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push('')}
                              className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                            >
                              <FiPlus className="mr-1 h-4 w-4" />
                              Add Interest
                            </button>
                            {errors.targeting?.interests && touched.targeting?.interests && (
                              <div className="text-red-500 text-sm mt-1">{errors.targeting.interests}</div>
                            )}
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Ad Creatives */}
              {activeStep === 3 && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center">
                    <FiImage className="mr-2 h-5 w-5 text-blue-500" />
                    Ad Creatives
                  </h2>
                  
                  <FieldArray name="adCreatives">
                    {({ push, remove }) => (
                      <div className="space-y-8">
                        {values.adCreatives.map((creative, index) => (
                          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Ad Creative #{index + 1}</h3>
                              {values.adCreatives.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  <FiTrash2 className="h-5 w-5" />
                                </button>
                              )}
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <label htmlFor={`adCreatives.${index}.title`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Ad Title
                                </label>
                                <Field
                                  type="text"
                                  id={`adCreatives.${index}.title`}
                                  name={`adCreatives.${index}.title`}
                                  placeholder="Enter ad title"
                                  className="input-field"
                                />
                                <ErrorMessage name={`adCreatives.${index}.title`} component="div" className="text-red-500 text-sm mt-1" />
                              </div>
                              
                              <div>
                                <label htmlFor={`adCreatives.${index}.description`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Ad Description
                                </label>
                                <Field
                                  as="textarea"
                                  id={`adCreatives.${index}.description`}
                                  name={`adCreatives.${index}.description`}
                                  rows="3"
                                  placeholder="Enter ad description"
                                  className="input-field"
                                />
                                <ErrorMessage name={`adCreatives.${index}.description`} component="div" className="text-red-500 text-sm mt-1" />
                              </div>
                              
                              <div>
                                <label htmlFor={`adCreatives.${index}.imageUrl`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Image URL
                                </label>
                                <Field
                                  type="text"
                                  id={`adCreatives.${index}.imageUrl`}
                                  name={`adCreatives.${index}.imageUrl`}
                                  placeholder="Enter image URL"
                                  className="input-field"
                                />
                                <ErrorMessage name={`adCreatives.${index}.imageUrl`} component="div" className="text-red-500 text-sm mt-1" />
                              </div>
                              
                              {values.adCreatives[index].imageUrl && (
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Image Preview:</p>
                                  <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                    <img 
                                      src={values.adCreatives[index].imageUrl} 
                                      alt="Ad preview" 
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found'
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        <button
                          type="button"
                          onClick={() => push({ title: '', description: '', imageUrl: '' })}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                        >
                          <FiPlus className="mr-2 h-5 w-5" />
                          Add Another Ad Creative
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              )}

              {/* Step 4: Review */}
              {activeStep === 4 && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center">
                    <FiCheck className="mr-2 h-5 w-5 text-blue-500" />
                    Review Campaign
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Campaign Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                          <p className="text-sm text-gray-900 dark:text-white">{values.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Objective</p>
                          <p className="text-sm text-gray-900 dark:text-white">{values.objective}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
                          <p className="text-sm text-gray-900 dark:text-white">
                            ${values.budget.amount} ({values.budget.type === 'DAILY' ? 'Daily' : 'Lifetime'})
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {values.startDate} to {values.endDate}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Targeting</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Countries</p>
                          <p className="text-sm text-gray-900 dark:text-white">{values.targeting.countries.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Age Range</p>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {values.targeting.ageRange.min} - {values.targeting.ageRange.max}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Gender</p>
                          <p className="text-sm text-gray-900 dark:text-white">{values.targeting.genders.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Interests</p>
                          <p className="text-sm text-gray-900 dark:text-white">{values.targeting.interests.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Ad Creatives</h3>
                      <div className="space-y-4">
                        {values.adCreatives.map((creative, index) => (
                          <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                            <div className="flex">
                              {creative.imageUrl && (
                                <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden mr-3">
                                  <img 
                                    src={creative.imageUrl} 
                                    alt="Ad preview" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null
                                      e.target.src = 'https://via.placeholder.com/100?text=Error'
                                    }}
                                  />
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{creative.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{creative.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-900 rounded-md p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <FiCheck className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                            Ready to Launch
                          </h3>
                          <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                            <p>
                              Your campaign is ready to be created. Once submitted, it will be reviewed by our team before going live.
                              Review typically takes 24 hours.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="mt-8 flex justify-between">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-secondary"
                  >
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}
                
                {activeStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || creating}
                    className="btn-primary flex items-center"
                  >
                    {creating ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                        Creating...
                      </>
                    ) : (
                      'Create Campaign'
                    )}
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
