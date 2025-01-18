"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface DashboardData {
  count: string; // Adjusted type to string to match the response
}

interface CardProps {
  title: string;
  value: number;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData[][] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/admin/dashboard");
      console.log("API Response:", response.data); // Debugging
      const counts = response.data.count;

      if (Array.isArray(counts)) {
        setData(counts);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!data) {
    return <div className="text-center">No data available</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="Total Students"
          value={parseInt(data[0]?.[0]?.count || "0")}
        />
        <Card title="Total Clubs" value={parseInt(data[1]?.[0]?.count || "0")} />
        <Card title="Total Users" value={parseInt(data[2]?.[0]?.count || "0")} />
      </div>
    </div>
  );
}

function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
