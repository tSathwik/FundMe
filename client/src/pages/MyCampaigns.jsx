import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';

const MyCampaigns = () => {
  const user_id = localStorage.getItem('user_id');
  console.log(user_id);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch(`http://localhost:3000/getCampaignByUserId/${user_id}`);
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

  return (
    <div className="bg-gray-900 text-gray-100 rounded-xl w-full h-auto min-h-screen p-6 scrollbar-hidden">
      <h1 className="text-3xl font-bold mb-8 text-center">My Campaigns</h1>
      {loading ? (
        <p className="text-center">Loading campaigns...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
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

export default MyCampaigns;
