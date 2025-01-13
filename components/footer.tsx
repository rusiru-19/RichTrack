import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="py-8 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400">&copy; 2025 EduTrack. All rights reserved.</p>
          </motion.div>
          <nav>
            <ul className="flex space-x-6">
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</Link>
              </motion.li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

