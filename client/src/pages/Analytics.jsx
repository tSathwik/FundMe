import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { ClipLoader } from 'react-spinners';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);
const Analytics = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:3000/getAllCampaigns');
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);
  const statusCounts = campaigns.reduce(
    (acc, campaign) => {
      acc[campaign.status] = (acc[campaign.status] || 0) + 1;
      return acc;
    },
    { Active: 0, Completed: 0, Cancelled: 0 }
  );

  const barChartData = {
    labels: campaigns.map((campaign) => campaign.title),
    datasets: [
      {
        label: 'Target Amount',
        data: campaigns.map((campaign) => campaign.target_amount),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Current Amount',
        data: campaigns.map((campaign) => campaign.current_amount),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Active', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: [statusCounts.Active, statusCounts.Completed, statusCounts.Cancelled],
        backgroundColor: ['#4BC0C0', '#FF9F40', '#FFCD56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const lineChartData = {
    labels: campaigns.map((campaign) => campaign.created_at),
    datasets: [
      {
        label: 'Campaign Growth Over Time',
        data: campaigns.map((campaign) => campaign.current_amount),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="bg-gray-900 text-gray-100 rounded-xl w-full h-auto min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Campaign Analytics</h1>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold mb-4 text-center">Target vs Current Amount</h2>
            <Bar data={barChartData} />
          </div>

          <div className="p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold mb-4 text-center">Campaign Status Distribution</h2>
            <div className="w-2/3 mx-auto">
              <Pie data={pieChartData} />
            </div>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold mb-4 text-center">Campaign Growth Over Time</h2>
            <Line data={lineChartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
