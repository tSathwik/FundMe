import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ c_id, title, description, targetAmount, endDate, creatorId, image_url }) => {
  const dummyImage = 'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  const navigate = useNavigate();
  console.log(c_id);
  const handleClick = () => {
    navigate(`/getCampaign/${c_id}`);
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col w-full max-w-sm">
      <img
        src={image_url || dummyImage}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1DC071] mb-2">{title}</h2>
          <p className="text-gray-400 mb-3 line-clamp-3">{description}</p>
        </div>
        <div>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">Goal:</span> ${targetAmount}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-bold">End Date:</span> {new Date(endDate).toLocaleDateString()}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Created By:</span> User {creatorId}
          </p>
          <button
            onClick={handleClick}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Know More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
