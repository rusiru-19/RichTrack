"use client"
import React, { useState } from "react";
import axios from "axios";

const ClubsAndAchievementsForm = ({ onDataUpdated }) => {
  // State for adding clubs
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');

  // State for adding achievements
  const [achievementTitle, setAchievementTitle] = useState('');
  const [achievementDescription, setAchievementDescription] = useState('');
  const [achievementClubName, setAchievementClubName] = useState('');
  const [achievementDate, setAchievementDate] = useState('');

  const handleAddClub = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/clubs/add", {
        name: clubName,
        description: clubDescription,
      });
      console.log("Club added:", response.data);
      onDataUpdated(); // Callback to refresh data
      // Reset fields
      setClubName('');
      setClubDescription('');
    } catch (error) {
      console.error("Error adding club:", error);
    }
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/achievements/add", {
        title: achievementTitle,
        description: achievementDescription,
        clubName: achievementClubName,
        date: achievementDate,
      });
      console.log("Achievement added:", response.data);
      onDataUpdated(); // Callback to refresh data
      // Reset fields
      setAchievementTitle('');
      setAchievementDescription('');
      setAchievementClubName('');
      setAchievementDate('');
    } catch (error) {
      console.error("Error adding achievement:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Clubs and Achievements</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add Club</h2>
        <form onSubmit={handleAddClub}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Club Name</label>
            <input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={clubDescription}
              onChange={(e) => setClubDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Club
          </button>
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add Achievement</h2>
        <form onSubmit={handleAddAchievement}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Club Name</label>
            <input
              type="text"
              value={achievementClubName}
              onChange={(e) => setAchievementClubName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={achievementTitle}
              onChange={(e) => setAchievementTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus .ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={achievementDescription}
              onChange={(e) => setAchievementDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={achievementDate}
              onChange={(e) => setAchievementDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Achievement
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClubsAndAchievementsForm;