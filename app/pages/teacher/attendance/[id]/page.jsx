"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const More = () => {
  const params = useParams();
  const { id } = params; 

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/teacher/attendance/view', { id });
        console.log('API Response:', response.data); 
        setData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="p-5">
ccaacacgdgdg
    </div>
    
    
  );
  
};

export default More;
