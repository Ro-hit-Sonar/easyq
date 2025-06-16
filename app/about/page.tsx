"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  ArrowLeft,
  QrCode,
  Users,
  Clock,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      icon: QrCode,
      title: "QR Code Integration",
      description:
        "Customers join queues instantly by scanning QR codes. No app downloads required.",
    },
    {
      icon: Users,
      title: "Real-time Management",
      description:
        "Monitor and manage your queues in real-time with live updates and notifications.",
    },
    {
      icon: Clock,
      title: "Reduce Wait Times",
      description:
        "Eliminate physical queues and reduce customer wait times by up to 70%.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Track queue performance, customer flow, and optimize your service delivery.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with 99.9% uptime guarantee for your business.",
    },
    {
      icon: Zap,
      title: "Instant Setup",
      description:
        "Get started in minutes. No complex setup or technical knowledge required.",
    },
  ];

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
                href="/"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
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
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            👋 About This{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Project
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hi, I'm Rohit Kumar, a software developer passionate about solving
            real-world problems with code.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        >
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 sm:p-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
                  The Story Behind EasyQ
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <p className="text-lg leading-relaxed">
                    I built Digital Queue as part of my{" "}
                    <strong>"7 Days, 7 Projects"</strong> series on LinkedIn —
                    an initiative where I challenged myself to build a new
                    project every day using modern tools like Next.js and
                    Vercel's v0.
                  </p>
                  <p className="text-lg leading-relaxed">
                    This project wasn't just about shipping fast — it was about
                    rethinking a small, everyday frustration that many of us
                    face.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Problem Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              💥 The Problem
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've all been there — standing in long queues at a café, clinic,
              or salon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-red-50 border-red-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">⏳</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Long Wait Times
                </h3>
                <p className="text-gray-600 text-sm">
                  No clear idea of how long you'll be waiting
                </p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">😖</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  No Visibility
                </h3>
                <p className="text-gray-600 text-sm">
                  Unclear position in line creates anxiety
                </p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📣</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Chaotic System
                </h3>
                <p className="text-gray-600 text-sm">
                  Names shouted, numbers skipped, confusion
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ✅ The Solution
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A lightweight, no-download-needed tool for smooth queue
              management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Business creates queue & gets QR code
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Simple setup in seconds
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Users scan QR & join digitally
                  </h3>
                  <p className="text-gray-600 text-sm">
                    No app downloads required
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Real-time position tracking
                  </h3>
                  <p className="text-gray-600 text-sm">
                    No need to ask or guess
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Clean dashboard management
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Mark served or remove customers easily
                  </p>
                </div>
              </div>
            </div>
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Fast, Simple, Effective
                </h3>
                <p className="text-gray-600">
                  No pen-paper mess. No clunky apps. Just scan, join, and get
                  notified when it's your turn.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-2xl">
            <CardContent className="p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                🚀 What's Next
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                The plan is to evolve Digital Queue into a{" "}
                <strong>Progressive Web App (PWA)</strong> — accessible from any
                device instantly, even offline.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="font-semibold mb-3">For Customers</h3>
                  <p className="text-blue-100 text-sm">
                    No app installs needed. Just scan any QR code and you're in
                    the system instantly.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="font-semibold mb-3">For Businesses</h3>
                  <p className="text-blue-100 text-sm">
                    Minimal setup with no hardware or software bloat. Works on
                    any device.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Ready to Try It?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Experience the future of queue management. No sign-up required.
              </p>
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Try EasyQ Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
