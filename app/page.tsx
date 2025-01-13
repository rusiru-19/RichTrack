'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GraduationCap, BarChart, Users, Calendar, ChevronRight } from 'lucide-react';
import { Footer } from "../components/footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";



export default function LandingPage() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true); 
  }, []);


  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
        const response = await axios.post("/api/login", { email, password });

        const token = response.data.data.token;
        const role = response.data.data.role;
        console.log("Token:", token);

        console.log("Response data:", response.data);

        if (token) {
            localStorage.setItem("token", token);
            router.push(`/pages/${role}/dashboard`);
          }
    } catch (err: any) {
        console.error("Error:", err);
        setError(err.response?.data?.message || "Login failed. Please try again.");
    }
};

  
  if (!isMounted) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="h-10 w-10 text-blue-400" />
              <span className="text-3xl font-bold text-blue-400">EduTrack</span>
            </motion.div>
            <nav>
              <ul className="flex space-x-6">
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">Features</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</Link>
                </motion.li>
              </ul>
            </nav>
          </header>

          <main className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-5xl font-bold text-blue-400 mb-6">Elevate Your Learning Journey</h1>
              <p className="text-xl text-gray-300 mb-8">
                Experience the future of education with EduTrack's comprehensive student tracking system. 
                Empower your academic journey with cutting-edge tools and insights.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-12">
                <FeatureCard icon={<BarChart className="h-8 w-8 text-blue-400" />} title="Performance Analytics" />
                <FeatureCard icon={<Users className="h-8 w-8 text-green-400" />} title="Collaborative Learning" />
                <FeatureCard icon={<Calendar className="h-8 w-8 text-purple-400" />} title="Smart Scheduling" />
                <FeatureCard icon={<GraduationCap className="h-8 w-8 text-red-400" />} title="Academic Milestones" />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="text-lg px-8 py-6 bg-blue-500 hover:bg-blue-600 text-white">
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-400">Log in to Your Account</CardTitle>
                  <CardDescription className="text-gray-400">Access your personalized dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={login}>
                    <div className="grid w-full items-center gap-6">
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input id="email" 
                        placeholder="your@email.com" 
                        className="bg-gray-700 text-gray-100 border-gray-600" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                        <Input id="password"
                         type="password" 
                         className="bg-gray-700 text-gray-100 border-gray-600"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         required
                          />
                      </div>
                    </div>
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}<br></br>
                    <Button type="submit" className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white">Log In</Button>

                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                </CardFooter>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <motion.div 
      className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700"
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(66, 153, 225, 0.5)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {icon}
      <span className="font-semibold text-gray-200">{title}</span>
    </motion.div>
  );
}
