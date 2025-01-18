"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Ach from "./sub/sub"; // Assuming it's in the 'sub' folder

interface StudentProfile {
  first_name: string;
  last_name: string;
  class: string;
  admission_no: string;
}

interface Achievement {
  name: string;
  title: string;
  description: string;
}

const StudentDashboard: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("username");
        if (!id) {
          throw new Error("User ID is not available in local storage.");
        }

        // Fetch profile data
        const profileResponse = await axios.post("/api/student/profile", { id });
        if (profileResponse.data?.data && Array.isArray(profileResponse.data.data) && profileResponse.data.data.length > 0) {
          setProfile(profileResponse.data.data[0]);
        }

        // Fetch achievements data
        const achievementsResponse = await axios.post("/api/student/ach", { id });
        if (achievementsResponse.data?.data) {
          setAchievements(achievementsResponse.data.data); // Set achievements data
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl text-black font-bold mb-4">Welcome</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
        <div className="mb-4">
          <strong>First Name:</strong> {profile.first_name}
        </div>
        <div className="mb-4">
          <strong>Last Name:</strong> {profile.last_name}
        </div>
        <div className="mb-4">
          <strong>Class:</strong> {profile.class}
        </div>
        <div className="mb-4">
          <strong>Admission Number:</strong> {profile.admission_no}
        </div>
      </div>

      <Ach achievements={achievements} /> {/* Pass achievements data to the Ach component */}
    </div>
  );
};

export default StudentDashboard;
