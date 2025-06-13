import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function PerformanceChart({ data, metric = 'impressions', title = 'Performance Over Time' }) {
  if (!data || !data.length) {
    return <div className="p-4 text-center text-gray-500">No data available</div>
  }

  const labels = data.map(item => item.date)
  const values = data.map(item => item[metric])
  
  const chartData = {
    labels,
    datasets: [
      {
        label: metric.charAt(0).toUpperCase() + metric.slice(1),
        data: values,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="h-80">
      <Line options={options} data={chartData} />
    </div>
  )
}
