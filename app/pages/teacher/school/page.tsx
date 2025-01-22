"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Achievement {
  first_name: string;
  name: string;
  title: string;
  description: string;
  date: string;
}

const Timeline: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const id = localStorage.getItem("username");
        if (!id) {
          throw new Error("User ID is not available in local storage.");
        }

        const response = await axios.post("/api/student/school", { id });
        if (response.data?.data) {
          setAchievements(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (achievements.length === 0) {
    return <div>No achievements found</div>;
  }

  return (
    <div className="timeline-container p-4">
      <h2 className="text-2xl text-black font-semibold mb-4">School Achievements Timeline</h2>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>
        
        {achievements.map((achievement, index) => {
          const eventDate = new Date(achievement.date);
          return (
            <div key={index} className="timeline-item mb-6  relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="timeline-content ml-12 pl-4 pt-2">
                <h3 className="text-xl text-black ">{achievement.name} - {achievement.title}</h3>
                <p className="text-gray-600">By: {achievement.first_name}</p>
                <p className="text-gray-600">{achievement.description}</p>

                <p className="text-gray-500 text-sm">{eventDate.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
