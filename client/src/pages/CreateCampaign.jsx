import React, { useState } from "react";

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target_amount: "",
    endDate: "",
    imageUrl: "",
  });

  const creator_id = 1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/createCampaign/${creator_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Campaign created successfully!");
        setFormData({
          title: "",
          description: "",
          target_amount: "",
          endDate: "",
          imageUrl: "",
        });
      } else {
        alert("Failed to create campaign.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the campaign.");
    }
  };

  return (
    <div className="bg-gray-900 text-[#1DC071] rounded-xl w-full h-full min-h-screen p-6 md:p-8 lg:p-10 overflow-y-auto scrollbar-hidden">
      <h1 className="text-center text-3xl font-semibold mb-8">Create a Campaign</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-6">
          <label className="flex-1">
            <span className="block mb-2 text-sm font-medium text-gray-300">Campaign Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter campaign title"
              className="w-full p-4 bg-transparent border-2 border-[#1DC071] text-gray-300 outline-none rounded-md focus:border-[#16a55b] transition-all"
            />
          </label>
          <label className="flex-1">
            <span className="block mb-2 text-sm font-medium text-gray-300">Target Amount</span>
            <input
              type="number"
              name="target_amount"
              value={formData.target_amount}
              onChange={handleChange}
              placeholder="Enter target amount"
              className="w-full p-4 bg-transparent border-2 border-[#1DC071] text-gray-300 outline-none rounded-md focus:border-[#16a55b] transition-all"
            />
          </label>
        </div>

        <label>
          <span className="block mb-2 text-sm font-medium text-gray-300">Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter campaign description"
            className="w-full p-4 bg-transparent border-2 border-[#1DC071] text-gray-300 outline-none rounded-md focus:border-[#16a55b] transition-all"
            rows="6"
          ></textarea>
        </label>
        <label className="flex-1">
            <span className="block mb-2 text-sm font-medium text-gray-300">Image URL</span>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-1/2 p-4 bg-transparent border-2 border-[#1DC071] text-gray-300 outline-none rounded-md focus:border-[#16a55b] transition-all"
            />
          </label>
          <label className="flex-1">
            <span className="block mb-2 text-sm font-medium text-gray-300">End Date</span>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-1/4 p-4 bg-transparent border-2 border-[#1DC071] text-gray-300 outline-none rounded-md focus:border-[#16a55b] transition-all"
            />
          </label>

        <button
          type="submit"
          className="bg-[#1DC071] text-gray-900 font-bold py-3 px-6 rounded-md mt-6 hover:bg-[#16a55b] transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
