
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  FaGlobe,
  FaSignInAlt,
  FaChevronRight,
  FaShieldAlt,
  FaFileAlt,
  FaChartLine,
  FaGraduationCap,
  FaBuilding,
  FaBriefcase,
  FaBullseye,
  FaClock,
  FaSyncAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa"

import HeroImage from '../assets/hero-image.png';
import Logo from '../assets/Logo.png';
import TransformImage from '../assets/Transform-Image.png'
import NewsLetterImage from '../assets/newsletter.png'
import { useNavigate } from "react-router"


function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhyChooseSection />
        <TransformSection />
        <AdvantageSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}


// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.section ref={ref} initial="hidden" animate={controls} variants={fadeIn} className={className}>
      {children}
    </motion.section>
  )
}

function Header() {
    const navigate =useNavigate();
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
          <a href="" className="text-sm font-medium">
            Home
          </a>
          <a href="#about" className="text-sm font-medium">
            About
          </a>
          <a href="#pricing" className="text-sm font-medium">
            Pricing
          </a>
          <a href="#features" className="text-sm font-medium">
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
            onClick={()=>navigate("/auth")}
            whileHover={{ scale: 1.05 ,color: "#4ade80",cursor: "pointer"}}
            whileTap={{ scale: 0.7 }}
            className="flex items-center text-sm font-medium"
          >
            <FaSignInAlt className="h-4 w-4 mr-1" />
            <span>Dashboard</span>
          </motion.button>
        </div>
      </div>
    </header>
  )
}

function HeroSection() {
  const navigate=useNavigate();
  return (
    <AnimatedSection className="bg-gray-100 h-screen py-12 md:py-16 flex items-center justify-center">
      <div className="max-w-[1300px] w-full mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div className="md:w-1/2 mb-8 md:mb-0" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1 className="text-4xl md:text-7xl font-bold" variants={fadeIn}>
              <span className="text-green-500">Examfusion</span>
              <br />
              <span className="text-black">Exams, Anytime</span>
              <br />
              <span className="text-black">Anywhere</span>
            </motion.h1>
            <motion.p className="mt-4 text-gray-600" variants={fadeIn}>
              Proctoring Made Easy: Secure, Reliable, and Stress-Free!
            </motion.p>
            <motion.button
              className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>navigate("/auth")}
            >
              Get Started
            </motion.button>
          </motion.div>
          <motion.div
            className=""
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={HeroImage}
              alt="Students taking online exams"
              className="w-[500px]"
              
            />
            {/* <img
              src="https://v0.dev/placeholder.svg?height=300&width=500"
              alt="Students taking online exams"
              className="w-full"
            /> */}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function FeaturesSection() {
  return (
    <AnimatedSection className="py-16 bg-white">
      <div className="max-w-[1000px] mx-auto px-4 text-center">
        <motion.h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-2" variants={fadeIn}>
          Secure & Streamlined Exams
        </motion.h2>
        <motion.p className="text-gray-600 mb-12" variants={fadeIn}>
          Advanced Proctoring Solutions for Unmatched Exam Integrity
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Feature 1 */}
          <motion.div
            className="bg-gray-50 p-8 rounded-lg"
            variants={fadeIn}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <div className="bg-green-500 p-2 rounded-lg">
                <FaShieldAlt className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">Robust Anti-Cheat Mechanisms</h3>
            <p className="text-sm text-gray-600">Lockdown exams with advanced security measures to prevent cheating.</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-gray-50 p-8 rounded-lg"
            variants={fadeIn}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <div className="bg-green-500 p-2 rounded-lg">
                <FaFileAlt className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">AI Questions Generator</h3>
            <p className="text-sm text-gray-600">
              Our AI generates questions, freeing up human to focus where it matters.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-gray-50 p-8 rounded-lg"
            variants={fadeIn}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <div className="bg-green-500 p-2 rounded-lg">
                <FaChartLine className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">Real-Time Monitoring & Analytics</h3>
            <p className="text-sm text-gray-600">
              Go beyond the exam with real-time analysis to ensure academic integrity.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

function WhyChooseSection() {
  return (
    <AnimatedSection className="py-16 bg-white">
      <div id="features" className="max-w-[1200px] mx-auto px-4 text-center">
        <motion.h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-2" variants={fadeIn}>
          Why You Choose Examfusion ?
        </motion.h2>
        <motion.p className="text-gray-600 mb-12 max-w-[800px] mx-auto" variants={fadeIn}>
          Discover the unique advantages that make Examfusion the leading choice for secure and reliable online
          assessments.
        </motion.p>

        {/* User Type Tabs */}
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-[600px] mx-auto mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="bg-green-500 text-white p-6 rounded" variants={fadeIn} whileHover={{ scale: 1.03 }}>
            <FaGraduationCap className="h-6 w-6 mx-auto mb-2" />
            <h3 className="font-medium">Student</h3>
          </motion.div>
          <motion.div className="bg-gray-200 text-gray-700 p-6 rounded" variants={fadeIn} whileHover={{ scale: 1.03 }}>
            <FaBuilding className="h-6 w-6 mx-auto mb-2" />
            <h3 className="font-medium">Institution</h3>
          </motion.div>
          <motion.div className="bg-gray-200 text-gray-700 p-6 rounded" variants={fadeIn} whileHover={{ scale: 1.03 }}>
            <FaBriefcase className="h-6 w-6 mx-auto mb-2" />
            <h3 className="font-medium">Business</h3>
          </motion.div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="grid mt-32 grid-cols-1 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Benefit 1 */}
          <motion.div className="text-center" variants={fadeIn} whileHover={{ y: -5 }}>
            <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
              <FaBullseye className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Focus on What Matters</h3>
            <p className="text-sm text-gray-600">
              Take exams in a secure, distraction-free environment that fosters optimal performance.
            </p>
          </motion.div>

          {/* Benefit 2 */}
          <motion.div className="text-center" variants={fadeIn} whileHover={{ y: -5 }}>
            <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
              <FaClock className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Experience Peace Of Mind</h3>
            <p className="text-sm text-gray-600">
              Know your test bank is secure and your exam integrity is maintained.
            </p>
          </motion.div>

          {/* Benefit 3 */}
          <motion.div className="text-center" variants={fadeIn} whileHover={{ y: -5 }}>
            <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
              <FaSyncAlt className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Embrace Flexibility</h3>
            <p className="text-sm text-gray-600">
              Take exams at your convenience with Examfusion's flexible scheduling options.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

function TransformSection() {
  return (
    <AnimatedSection className="py-16  bg-gray-100">
      <div className="max-w-[1000px] mx-auto px-4 text-center">
        <motion.h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-2" variants={fadeIn}>
          Transform Your Exam Experience
          <br />
          with <span className="text-green-500">Examfusion</span>.
        </motion.h2>
        <motion.p className="text-gray-600 max-w-[800px] mx-auto my-6" variants={fadeIn}>
          Join countless institutions, businesses, and students who trust Examfusion for secure, reliable online
          assessments. Discover how our advanced proctoring solutions can elevate your exam integrity.
        </motion.p>

        <div className="relative max-w-[800px] mx-auto my-12">
          <div className="border-2 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2  px-4">
            <motion.button
              className="bg-green-500 hover:bg-green-600
              cursor-pointer
              text-white px-8 py-2 rounded flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start <FaChevronRight className="ml-1 h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function AdvantageSection() {
  return (
    <AnimatedSection className="py-16 bg-white ">
      <div className="max-w-[1200px] mx-auto px-4 max-h-[400px]">
        <motion.div
          className="bg-green-500 rounded-lg p-8 text-white flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:w-2/3 mb-8 md:mb-0 ">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Experience Examfusion's
              <br />
              Advantage Yourself !
            </h2>
            <p className="mb-4">
              Discover how Examfusion can revolutionize your exam processes and ensure secure assessments for your
              institution, business, or learning journey.
            </p>
          </div>
          <motion.div
            className="mr-[-100px]"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img
              src={TransformImage}
              alt="Examfusion advantage illustration"
              className="w-[350px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

function NewsletterSection() {
  return (
    <AnimatedSection className="py-16 bg-gray-100">
      <div className="max-w-[1000px] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/3 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={NewsLetterImage}
              alt="Newsletter illustration"
              className="w-full"
            />
          </motion.div>
          <div className="md:w-2/3 text-center md:text-center md:pl-8">
            <motion.h2 className="text-2xl md:text-3xl font-bold text-navy-800 mb-2" variants={fadeIn}>
              Stay Updated with
              <br />
              <span className="text-green-500">Examfusion</span>
            </motion.h2>
            <motion.p className="text-gray-600 mb-6" variants={fadeIn}>
              Sign up for Our Newsletter to Get the Latest Updates, Insights, and Offers!
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-2 justify-end" variants={fadeIn}>
              <input
                type="email"
                placeholder="Email address..."
                className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <motion.button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <a href="/" className="flex items-center mb-6">
              <span className="text-green-500 font-bold text-xl">
                <span className="text-green-500">E</span>xamfusion
              </span>
            </a>
            <p className="text-sm text-gray-400">Secure Exams Anywhere, Anytime</p>
            <p className="text-xs text-gray-500 mt-4">Made by Nikhil, Mriganka, Kriti</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 border-b border-gray-700 pb-2">Features</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  Proctoring
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  Exam Types
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  Question Bank
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  Exam Analysis
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  Content Protection
                </a>
              </motion.li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 border-b border-gray-700 pb-2">Legal</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  Support
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a href="#" className="text-sm text-gray-400 hover:text-white">
                  Help Centre
                </a>
              </motion.li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© 2025 Examfusion. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin className="h-5 w-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default HomePage
