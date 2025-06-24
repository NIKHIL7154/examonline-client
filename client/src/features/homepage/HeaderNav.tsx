
import { motion} from "framer-motion"

import {
  FaGlobe,
  
  FaSignInAlt,

} from "react-icons/fa"


import Logo from '../../assets/Logo.png';


export default function Header() {
    return (
      <header className=" bg-white">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between py-5 px-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-green-500 font-bold text-xl">
                <img className="inline w-7 mb-2" src={Logo} alt="Brand Logo" />
                xamfusion
              </span>
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-sm font-medium">
              Home
            </a>
            <a href="/about" className="text-sm font-medium">
              About
            </a>
            <a href="/pricing" className="text-sm font-medium">
              Pricing
            </a>
            <a href="/features" className="text-sm font-medium">
              Features
            </a>
          </nav>
          <div className="flex items-center space-x-8">
            <motion.button
              whileHover={{ scale: 1.05 ,color: "#4ade80",cursor: "pointer"}}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-sm font-medium"
            >
              <FaGlobe className="h-4 w-4 mr-1" />
              <span>English</span>
            </motion.button>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-sm font-medium"
            >
              <FaCommentAlt className="h-4 w-4 mr-1" />
              <span>Contact Us</span>
            </motion.button> */}
            <motion.button
              whileHover={{ scale: 1.05 ,color: "#4ade80",cursor: "pointer"}}
              whileTap={{ scale: 0.7 }}
              className="flex items-center text-sm font-medium"
            >
              <FaSignInAlt className="h-4 w-4 mr-1" />
              <span>Login</span>
            </motion.button>
          </div>
        </div>
      </header>
    )
  }