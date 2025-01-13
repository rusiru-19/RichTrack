"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
function Dashboard() {
  const router = useRouter();

  const auth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found. Redirecting to login.");
      router.push("/");
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth",{},{
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log("Auth response:", response);

      if (response.status !== 200) {
        console.log("Authentication failed. Redirecting to login.");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Authentication error:", error.response || error.message);
      router.push("/"); 
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return <div>fsf</div>;
}

export default Dashboard;
