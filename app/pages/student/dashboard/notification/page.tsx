"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Notification {
    title: string;
    message: string;
}

export default function Notification() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showNotifications, setShowNotifications] = useState<boolean>(false);

    useEffect(() => {
        const id = typeof window !== "undefined" ? localStorage.getItem("username") : null;

        async function fetchNotifications(id: string | null) {
            if (id) {
                try {
                    const response = await axios.post('/api/notification', { id });
                    setNotifications(response.data.msg); // Adjusted to match your response structure
                } catch (err) {
                    console.log(err);
                    setError("Failed to fetch notifications");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // No username found, stop loading
            }
        }

        fetchNotifications(id);

        // Set up polling every 20 seconds
        const intervalId = setInterval(() => {
            fetchNotifications(id);
        }, 20000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run only once on mount

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
            <div onClick={toggleNotifications} style={{ cursor: 'pointer' }}>
                    <img 
                        src="/img/bell.png" 
                        alt="Notifications" 
                        width={40} 
                        height={40} 
                        style={{ cursor: 'pointer' }} 
                    />           
                    {notifications.length > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '2px 5px',
                        fontSize: '12px'
                    }}>
                        {notifications.length}
                    </span>
                )}
            </div>
            {showNotifications && (
                <div style={{
                    border: '1px solid #ccc',
                    margin: '2rem',
                    borderRadius: '5px',
                    padding: '10px',
                    marginTop: '5px',
                    background: '#fff',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    position: 'absolute',
                    zIndex: 1000,
                    width: '300px'
                }}>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <li key={index} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                                    <strong>{notification.title}</strong>: {notification.message}
                                </li>
                            ))
                        ) : (
                            <li style={{ padding: '5px 0' }}>No notifications</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}