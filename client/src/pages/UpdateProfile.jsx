import React, { useState } from 'react';

const UpdateProfile = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    paymentOption: '',
  });
  const stats = {
    campaignsLaunched: 5,
    amountReceived: '$12,500',
    contributors: 120,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile Details:', userDetails);
    alert('Profile Updated Successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-sm text-gray-400">Campaigns Launched</h3>
            <p className="text-2xl font-bold text-[#1DC071] mt-2">
              {stats.campaignsLaunched}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-sm text-gray-400">Amount Received</h3>
            <p className="text-2xl font-bold text-[#1DC071] mt-2">
              {stats.amountReceived}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-sm text-gray-400">Contributors</h3>
            <p className="text-2xl font-bold text-[#1DC071] mt-2">
              {stats.contributors}
            </p>
          </div>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-[#1DC071] mb-6">
            Update Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-700 text-gray-200 outline-none focus:ring-2 focus:ring-[#1DC071] transition"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-700 text-gray-200 outline-none focus:ring-2 focus:ring-[#1DC071] transition"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-700 text-gray-200 outline-none focus:ring-2 focus:ring-[#1DC071] transition"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-700 text-gray-200 outline-none focus:ring-2 focus:ring-[#1DC071] transition"
                placeholder="Enter your address"
                rows="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Payment Option
              </label>
              <select
                name="paymentOption"
                value={userDetails.paymentOption}
                onChange={handleInputChange}
                className="w-full p-3 rounded-md bg-gray-700 text-gray-200 outline-none focus:ring-2 focus:ring-[#1DC071] transition"
              >
                <option value="">Select a payment option</option>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-[#1DC071] text-black font-semibold hover:bg-[#16a462] transition duration-200 ease-in-out"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
