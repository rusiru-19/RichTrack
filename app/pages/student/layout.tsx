"use client"
import React from 'react'
import { motion } from "framer-motion";
import Navbar from "./navbar";


export default function Studentlayout( {

    children,
}: {
  children: React.ReactNode;
}) {

  return (
    <> 
    <html>
      <body>
      <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Navbar />
              <main className="flex-grow p-6 bg-gray-100 h-screen">
            {children}
              </main>


              </motion.div>
      </body>
    </html>
    </>
       
  );
}
