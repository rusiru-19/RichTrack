"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const More = () => {
  const params = useParams();
  const { id } = params; 

  const [data, setData] = useState({ msg: [], clubs: [] }); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/admin/viewstudent', { id });
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
      <h1 className="text-3xl font-bold mb-4">Student Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.msg.length > 0 ? (
          data.msg.map((student) => (
            <div key={student.user_id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{student.first_name} {student.last_name}</h2>
              <p className="text-gray-700"><strong>User ID:</strong> {student.user_id}</p>
              <p className="text-gray-700"><strong>Class:</strong> {student.class}</p>
              <p className="text-gray-700"><strong>Admission No:</strong> {student.admission_no}</p>
              <p className="text-gray-700"><strong>Created At:</strong> {new Date(student.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No data available</div>
        )}
      </div>

      <h2 className="text-1xl font-bold mt-6">Clubs</h2>
      {data.clubs.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Club Name</th>
              <th className="px-4 py-2 border border-gray-300">Joined At</th>
            </tr>
          </thead>
          <tbody>
            {data.clubs.map((club, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border border-gray-300">{club.name}</td>
                <td className="px-4 py-2 border border-gray-300">{new Date(club.joined_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 mt-4">No club memberships available</div>
      )}
            <h2 className="text-1xl font-bold mt-6">Achievments</h2>
      {data.ach.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">Club Name</th>
              <th className="px-4 py-2 border border-gray-300">Title</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Recieved At</th>
            </tr>
          </thead>
          <tbody>
            {data.ach.map((ach, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border border-gray-300">{ach.name}</td>
                <td className="px-4 py-2 border border-gray-300">{ach.title}</td>
                <td className="px-4 py-2 border border-gray-300">{ach.description}</td>
                <td className="px-4 py-2 border border-gray-300">{new Date(ach.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 mt-4">No Achievments Recieved </div>
      )}
    </div>
    
    
  );
  
};

export default More;
