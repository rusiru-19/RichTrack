"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found. Redirecting to login.");
        router.push("/");
        return;
      }

      try {
        const response = await axios.post(
          "/api/auth",
          {},
          {
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
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || error.message;
          console.error("Authentication error:", errorMessage);
        } else {
          console.error("Unexpected error:", error);
        }
        router.push("/");
      }
    };

    auth();
  }, [router]);

  return <div>Dashboard Content</div>;
}

export default Dashboard;