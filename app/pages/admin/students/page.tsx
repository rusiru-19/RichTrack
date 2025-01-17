"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  class: string;
  admission_no: string;
}

const columns = [
  { Header: "ID", accessor: "id" },
  { Header: "First Name", accessor: "first_name" },
  { Header: "Last Name", accessor: "last_name" },
  { Header: "Class", accessor: "class" },
  { Header: "Admission Number", accessor: "admission_no" },
  { Header: "Detail View", accessor: "detail" },
];

function Students() {
  const [data, setData] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/admin/viewstudent");
        setData(response.data.msg);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error: Data is not available.</div>;
  }

  return (
    <div>
      <h1 className="text-left text-5xl">Students</h1>
      <br />
      <table className="min-w-full border-collapse border border-gray-200 table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} className="px-4 py-2 text-left">
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => {
                if (column.accessor === "detail") {
                  return (
                    <td key={column.accessor} className="px-4 py-2 text-left border border-gray-300">
                      <Link href={`./students/${row.id}`}>
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                          View Details
                        </button>
                      </Link>
                    </td>
                  );
                }
                return (
                  <td key={column.accessor} className="px-4 py-2 text-left border border-gray-300">
                  {row[column.accessor as keyof Student]}
                </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;