import React from 'react'

export default function DashboardCard({ title, value, icon, change, changeType = 'positive', footer }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="mt-4">
          <span className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {changeType === 'positive' ? '↑' : '↓'} {change}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
        </div>
      )}
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  )
}
