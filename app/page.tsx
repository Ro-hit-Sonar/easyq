"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to control animations
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EasyQ
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div ref={containerRef} className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Digital Queue
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Management
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Transform your business with smart queue management. No more
                waiting, no more chaos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Scroll-based Animation Sections */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ opacity: opacity1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Long queues
              <br />
              <span className="text-red-500">kill time.</span>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-8 max-w-md"
            />
          </motion.div>
        </section>

        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ opacity: opacity2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              We fixed that
              <br />
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                with one scan.
              </span>
            </h2>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 mx-auto w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center"
            >
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-900 rounded-lg grid grid-cols-3 gap-1 p-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-white rounded-sm" />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ opacity: opacity3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create.
              </span>{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Share QR.
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                Manage Queue.
              </span>
            </h2>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Create</h3>
                <p className="text-gray-600 text-sm">
                  Set up your digital queue in seconds
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Share QR</h3>
                <p className="text-gray-600 text-sm">
                  Customers scan to join instantly
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Manage</h3>
                <p className="text-gray-600 text-sm">
                  Real-time queue management dashboard
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Start for free.
              <br />
              <span className="text-gray-600">No sign-up needed.</span>
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-16 px-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform shadow-2xl hover:shadow-3xl"
                >
                  Get Started
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            </motion.div>
            <p className="text-gray-500 mt-6 text-lg">click here to join </p>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EasyQ
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Developed by{" "}
              <span className="text-white font-semibold">Rohit Kumar</span>
            </p>
            <a
              href="https://www.linkedin.com/in/rohittkumardev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              LinkedIn Profile
              <ArrowRight className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
