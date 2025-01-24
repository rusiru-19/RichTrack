"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface MostMembers {
  club_id: number;
  count: string;
  name: string;
}

interface MostAchievements {
  club_id: number;
  count: string;
  name: string;
}

interface UpcomingEvent {
  name: string;
  time: string;
  date: string;
}

interface ApiResponse {
  "most-members": MostMembers[];
  "most-achievements": MostAchievements[];
  "upcoming-event": UpcomingEvent[];
}

export default function Dashboard() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.post("/api/teacher/dashboard"); 
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center text-xl text-red-500">Failed to load data.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Most Members</h2>
          {data["most-members"].map((club) => (
            <div
              key={club.club_id}
              className="border-b border-gray-200 pb-4 mb-4"
            >
              <p className="text-lg font-bold">{club.name}</p>
              <p className="text-gray-600">Members: {club.count}</p>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Most Achievements</h2>
          {data["most-achievements"].map((club) => (
            <div
              key={club.club_id}
              className="border-b border-gray-200 pb-4 mb-4"
            >
              <p className="text-lg font-bold">{club.name}</p>
              <p className="text-gray-600">Achievements: {club.count}</p>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Event</h2>
          {data["upcoming-event"].length > 0 ? (
            data["upcoming-event"].map((event, index) => (
              <div key={index}>
                <p className="text-lg font-bold">{event.name}</p>
                <p className="text-gray-600">
                  Date:{" "}
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-600">Time: {event.time}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming events.</p>
          )}
        </div>
      </div>
    </div>
  );
}
