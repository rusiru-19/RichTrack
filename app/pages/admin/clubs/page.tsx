"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ClubsAndAchievements = () => {
  const [data, setData] = useState({ clubs: [], achievements: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/admin/clubs");
        console.log("Response:", response.data);
        setData(response.data); 
        setLoading(false); // Ensure loading state is set to false once data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading state is set to false on error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Clubs and Achievements</h1>
<Link href="./clubs/form">
  <button    
    className="bg-green-700 text-white py-1 px-3 hover:bg-green-800 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
    Add clubs
    </button>
    </Link>
    <br></br>
      <h2 className="text-2xl font-semibold mb-4">Clubs</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-300">Club ID</th>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Description</th>
            <th className="px-4 py-2 border border-gray-300">Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.clubs && data.clubs.length > 0 ? (
            data.clubs.map((club) => (
              <tr key={club.id} className="text-center">
                <td className="px-4 py-2 border border-gray-300">{club.id}</td>
                <td className="px-4 py-2 border border-gray-300">{club.name}</td>
                <td className="px-4 py-2 border border-gray-300">{club.description}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(club.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 border border-gray-300 text-center">
                No clubs available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-300">Club Name</th>
            <th className="px-4 py-2 border border-gray-300">Title</th>
            <th className="px-4 py-2 border border-gray-300">Description</th>
            <th className="px-4 py-2 border border-gray-300">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.achievements && data.achievements.length > 0 ? (
            data.achievements.map((achievement, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border border-gray-300">{achievement.name}</td>
                <td className="px-4 py-2 border border-gray-300">{achievement.title}</td>
                <td className="px-4 py-2 border border-gray-300">{achievement.description}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(achievement.date).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 border border-gray-300 text-center">
                No achievements available
              </td>
            </tr>
          )}
        </tbody>
      </table>
<br></br>
    </div>
    
  );
};

export default ClubsAndAchievements;
