"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Club {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

interface ResponseData {
  clubs: Club[];
}

const ClubsAndAchievements = () => {
  const [data, setData] = useState<ResponseData>({
    clubs: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clubs, setClubs] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post<ResponseData>("/api/admin/clubs");
        setData(response.data);
      } catch {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function join(id: number) {
    try {
      const user = localStorage.getItem("username");
      if (!user) {
        setError("User is not logged in");
        return;
      }

      const response = await axios.post("/api/student/join", {
        club_id: id,
        username: user,
      });

      setClubs(response.data.message);
      setNotification(`You have successfully joined the ${response.data.message}`); 

    } catch (err) {
      setError("Failed to join club");
      console.error(err);
    }
  }

  if (clubs) {
    return <div className="text-green-500">{clubs}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="text-black p-5">
      <h1 className="text-3xl font-bold mb-6">Clubs</h1>

      {notification && (
        <div className="bg-green-500 text-white p-3 mb-4 rounded-md">
          {notification}
        </div>
      )}

      <br />
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-300">Club ID</th>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Description</th>
            <th className="px-4 py-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.clubs.length > 0 ? (
            data.clubs.map((club) => (
              <tr key={club.id} className="text-center">
                <td className="px-4 py-2 border border-gray-300">{club.id}</td>
                <td className="px-4 py-2 border border-gray-300">{club.name}</td>
                <td className="px-4 py-2 border border-gray-300">{club.description}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    onClick={() => join(club.id)}
                    className="bg-yellow-700 text-white py-1 px-3 hover:bg-yellow-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
                  >
                    Join
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-2 border border-gray-300 text-center"
              >
                No clubs available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClubsAndAchievements;
