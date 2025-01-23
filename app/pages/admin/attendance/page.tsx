"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Link from "next/link";

interface Schedule {
  id: string;
  date: string;
  time: string;
  name: string;
}

interface Modalinfo {
  id: string;
  name: string;
}

export default function ScheduleViewer() {
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState<Modalinfo[]>([]);

  const [selectedClub, setSelectedClub] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const fetchSchedule = async () => {
    try {
      const response = await axios.post("/api/teacher/attendance/view");
      setScheduleData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchSchedule();
  }, []);

  const modalData = async () => {
    try {
      const response = await axios.post("/api/teacher/attendance/modal");
      setData(response.data.data); 
    } catch (error) {
      console.error("Failed to fetch modal data:", error);
    }
  };

  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/teacher/schedule", {
        club_id: selectedClub,
        date,
        time,
      });
      console.log("Schedule added successfully:", response.data);
      setModalIsOpen(false); 
    } catch (error) {
      console.error("Failed to add schedule:", error);
    }
    fetchSchedule();
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Schedule</h1>
      <button
        onClick={() => {
          modalData();
          setModalIsOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Schedule
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Event adder"
        className="bg-white text-black p-6 rounded shadow-lg w-1/3 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl mb-4">Add Schedule</h2>
        <form onSubmit={handleAddSchedule}>
          <label className="block mb-2">
            Select Club:
            <select
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="w-full border border-gray-300 px-2 py-1 rounded mt-1"
              required
            >
              <option value="">Select a club</option>
              {data.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-2">
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 px-2 py-1 rounded mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 px-2 py-1 rounded mt-1"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Schedule
          </button>
        </form>
        <button
          onClick={() => setModalIsOpen(false)}
          className="bg-red-500 text-white px-2 py-2 rounded mt-4"
        >
          Close
        </button>
      </Modal>

      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Club</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((schedule) => (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{schedule.date}</td>
                <td className="border border-gray-300 px-4 py-2">{schedule.time}</td>
                <td className="border border-gray-300 px-4 py-2">{schedule.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Link href={`./attendance/${schedule.id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Present/Absent
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
