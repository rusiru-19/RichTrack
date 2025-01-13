"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen } from "react-icons/fa";

const EditableField = ({ label, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    onChange(inputValue); // Call the parent onChange function with the updated value
  };

  const handleCancel = () => {
    setInputValue(value); // Reset input value to original
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ flex: 1, marginRight: "10px" }}
          />
          <button
            onClick={handleSave}
            style={{
              padding: "5px 10px",
              marginRight: "5px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            style={{
              padding: "5px 10px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <label style={{ flex: 1 }}>
            {label}: {value}
          </label>
          <FaPen
            style={{ cursor: "pointer", marginLeft: "10px" }}
            onClick={() => setIsEditing(true)}
          />
        </>
      )}
    </div>
  );
};


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/student/profile");
        if (response.status !== 200) {
          throw new Error("Failed to fetch data");
        }
        const data = response.data;
        setUsers(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFieldChange = (userId, field, newValue) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, [field]: newValue } : user
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Your Profile</h1>
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.id}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >

            <EditableField
              label="Name"
              value={`${user.first_name} ${user.last_name}`}
              onChange={(newValue) =>
                handleFieldChange(user.id, "first_name", newValue.split(" ")[0])
              }
            />
            <EditableField
              label="Admission Number"
              value={user.admission_no}
              onChange={(newValue) =>
                handleFieldChange(user.id, "admission_no", newValue)
              }
            />
            <EditableField
              label="Email"
              value={user.email}
              onChange={(newValue) =>
                handleFieldChange(user.id, "email", newValue)
              }
            />
            <EditableField
              label="Phone"
              value={user.phone_number}
              onChange={(newValue) =>
                handleFieldChange(user.id, "phone_number", newValue)
              }
            />
            <EditableField
              label="Address"
              value={user.address}
              onChange={(newValue) =>
                handleFieldChange(user.id, "address", newValue)
              }
            />
            <EditableField
              label="Date of Birth"
              value={user.dob}
              onChange={(newValue) =>
                handleFieldChange(user.id, "dob", newValue)
              }
            />
          </div>
        ))
      ) : (
        <div>No records found.</div>
      )}
    </div>
  );
};

export default UserList;
