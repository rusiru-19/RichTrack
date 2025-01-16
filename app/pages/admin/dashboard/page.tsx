"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

function Dashboard() {
  const user = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/admin/dashboard');
        setData(response.data.count); 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(data)) {
    return <div>Error: Data is not an array.</div>;
  }

  return (
    <div className="p-6">
    <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="card-header h-5 ">

          <h1 className="text-4xl font-bold  ">Welcome {user}, You have logged in as {role}</h1>
        </div>
        <div className="card-body mt-4"></div>
        </div>
      <br></br>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Students Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold">Students</h3>
            <p className="text-4xl font-bold">{data[0][0]?.count}</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-full">
            <i className="fas fa-users fa-2x"></i>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold">Users</h3>
            <p className="text-4xl font-bold">{data[1][0]?.count}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-full">
            <i className="fas fa-user fa-2x"></i>
          </div>
        </div>

        {/* Clubs Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold">Clubs</h3>
            <p className="text-4xl font-bold">{data[2][0]?.count}</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-full">
            <i className="fas fa-cogs fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
