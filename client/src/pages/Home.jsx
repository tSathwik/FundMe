import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const { searchTerm } = useOutletContext(); 
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('http://localhost:3000/getAllCampaigns');
      if (!response.ok) {
        console.error('Error fetching campaigns');
        return;
      }
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-gray-100 rounded-xl w-full h-full p-6 overflow-auto scrollbar-hidden">
      <h1 className="text-3xl font-bold mb-8 text-center">All Campaigns</h1>
      {loading ? (
        <p className="text-center">Loading campaigns...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <div key={campaign.c_id} className="flex justify-center">
                <Card
                  c_id={campaign.c_id}
                  title={campaign.title}
                  description={campaign.description}
                  targetAmount={campaign.target_amount}
                  endDate={campaign.endDate}
                  creatorId={campaign.creator_id}
                  image_url={campaign.image_url}
                />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No campaigns found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
