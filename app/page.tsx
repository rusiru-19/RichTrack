'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true); 
    try {
      const response = await axios.post('/api/login', { email, password });

      const token = response.data.data.token;
      const role = response.data.data.role;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('username', email);
        router.push(`/pages/${role}/dashboard`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error('Authentication error:', errorMessage);
        setError(errorMessage);
      } else {
        console.error('Unexpected error:', error);
      }
      router.push('/');
    } finally {
      setLoading(false);
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
              <h1 className="text-3xl font-bold text-blue-400">RichTracker</h1>
            </motion.div>
          </header>

          <main className="flex items-center justify-center">
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <br />
              <Card className="bg-gray-800 min-h-150 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-400">Log in to Your Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={login}>
                    <div className="grid w-full items-center gap-6">
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="email" className="text-gray-300">Username</Label>
                        <Input
                          id="email"
                          className="bg-gray-700 text-gray-100 border-gray-600"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          className="bg-gray-700 text-gray-100 border-gray-600"
 value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {error && <div className="text-red-500 text-sm mt-2">&apos;{error}&apos;</div>}
                    <br />
                    <Button type="submit" className={`w-full mb-4 ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`} disabled={loading}>
                      {loading ? 'Logging in...' : 'Log In'}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col"></CardFooter>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-400 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">© {new Date().getFullYear()} RichTracker. All rights reserved.</p>
          <p className="text-sm">Designed and developed by Rusiru Thamara</p>
        </div>
      </footer>
    </div>
  );
}