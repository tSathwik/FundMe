import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../Components/Comments';

const DetailedCard = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaignDetails();
  }, []);

  const fetchCampaignDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/campaigns/${id}`);
      if (!response.ok) {
        console.error('Error fetching campaign details');
        return;
      }
      const data = await response.json();
      setCampaign(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-100">Loading campaign details...</p>;
  }

  if (!campaign) {
    return <p className="text-center text-gray-100">Campaign not found.</p>;
  }

  return (
    <div className="bg-gray-900 text-gray-100 rounded-xl w-full h-auto min-h-screen p-6 overflow-hidden">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-[#1DC071]">{campaign.title}</h1>

      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-8 max-w-6xl mx-auto">
        <div className="w-full lg:w-2/3">
          <img
            src={
              campaign.image_url ||
              'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            }
            alt={campaign.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-lg text-gray-400 mb-6">{campaign.description}</p>
          <div className="mb-6">
            <p className="text-gray-300 mb-2">
              <strong>Goal:</strong> ${campaign.target_amount}
            </p>
            <p className="text-gray-300 mb-2">
              <strong>Amount Raised:</strong> ${campaign.amount_raised || 0}
            </p>
            <p className="text-gray-300 mb-2">
              <strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}
            </p>
            <p className="text-gray-300">
              <strong>Created By:</strong> User {campaign.creator_id}
            </p>
          </div>
          <button
            className="w-full px-6 py-3 bg-[#1DC071] text-white rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            Fund Here
          </button>
        </div>
      </div>
      <div className="mt-12 max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-extrabold text-[#1DC071] mb-6">Campaign Details</h2>
        <p className="text-gray-400 mb-4">
          <strong>Beneficiary:</strong> {campaign.beneficiary || 'Not specified'}
        </p>
        <p className="text-gray-400 mb-4">
          <strong>Category:</strong> {campaign.category || 'General'}
        </p>
        <p className="text-gray-400 mb-4">
          <strong>Impact:</strong> {campaign.impact || 'No specific impact mentioned'}
        </p>
        <button className="text-[#1DC071] underline">Update details</button>
      </div>
      <div className="mt-12 max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-extrabold text-[#1DC071] mb-6">Comments</h2>
        <Comments campaignId={id} />
      </div>
    </div>
  );
};

export default DetailedCard;
