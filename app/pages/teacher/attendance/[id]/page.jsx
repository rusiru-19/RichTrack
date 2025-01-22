"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const More = () => {
  const params = useParams();
  const { id } = params;

  const [data, setData] = useState([]); // State for storing fetched data
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/teacher/attendance/names", { id });
      console.log("API Response:", response.data);
      setData(response.data.result); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const marking = async (Sid, studentId) => {
    try {
      await axios.post("/api/teacher/attendance/mark", {
        id: Sid,
        student: studentId,
      });
      fetchData();
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Mark Attendance</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Club Members</th>
              <th className="border border-gray-300 px-4 py-2">Present/Absence</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student.student_id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{student.first_name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {student.is_present === "yes" ? (
                    <span className="text-green-600 font-bold">Present</span>
                  ) : (
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => marking(id, student.student_id)} // Mark the student as present
                    >
                      Mark as Present
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default More;
