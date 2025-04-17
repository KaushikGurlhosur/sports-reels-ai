"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Video,
  Wand2,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Header from "@/components/header";

const springConfig = { stiffness: 300, damping: 30 };
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 400], [0, -100]), springConfig);

  return (
    <div className="flex flex-col min-h-screen antialiased bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-44 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
          <motion.div
            style={{ y }}
            className="absolute inset-0 opacity-20 bg-[url('/reel.png')] bg-repeat"
          />

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.2 }}
              className="grid gap-6 lg:grid-cols-2 items-center max-w-6xl mx-auto">
              <div className="flex flex-col space-y-6">
                <motion.div variants={fadeInVariants}>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", ...springConfig }}
                    className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium"
                    whileHover={{ scale: 1.05 }}>
                    🚀 AI-Powered Sports Content
                  </motion.div>
                </motion.div>

                <motion.h1
                  variants={fadeInVariants}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                  Relive Legendary Careers Through
                  <br />
                  <motion.span
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                    transition={{ repeat: Infinity, duration: 8 }}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-[length:200%_auto]">
                    AI-Powered Reels
                  </motion.span>
                </motion.h1>

                <motion.p
                  variants={fadeInVariants}
                  className="max-w-[600px] text-gray-300 md:text-xl">
                  "Step into the heart of sports history like never before. Our
                  cutting-edge AI transforms iconic moments, career-defining
                  stats, and untold stories into immersive video biographies
                  that celebrate the legends of the game. Relive the triumphs,
                  the heartbreaks, and the unforgettable journeys of your
                  favorite athletes—crafted with precision, passion, and a touch
                  of cinematic magic. Whether it’s the roar of the crowd, the
                  clutch plays, or the behind-the-scenes struggles, we bring the
                  stories that shaped sports history to life in a way that’s as
                  dynamic as the athletes themselves.
                </motion.p>

                <motion.div
                  variants={fadeInVariants}
                  className="flex flex-col sm:flex-row gap-3">
                  <Link href="/reels" passHref>
                    <Button
                      size="lg"
                      className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-12 px-6 text-white shadow-lg hover:shadow-xl transition-all"
                      aria-label="Watch Reels">
                      <span className="relative z-10 flex items-center">
                        Watch Reels
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="ml-2">
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      </span>
                    </Button>
                  </Link>

                  <Link href="/admin" passHref>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 h-12 px-6 shadow-lg hover:shadow-xl transition-all"
                      aria-label="Create Your Own">
                      Create Your Own
                      <Wand2 className="ml-2 h-4 w-4 text-purple-300" />
                    </Button>
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ scale: 0.9, rotate: 3 }}
                animate={{ scale: 1, rotate: 2 }}
                transition={{
                  scale: { type: "spring", ...springConfig },
                  rotate: { type: "spring", damping: 20 },
                }}
                className="hidden lg:block relative rounded-lg overflow-hidden shadow-2xl aspect-[9/16] bg-gray-800"
                whileHover={{ scale: 1.02 }}>
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <iframe
                    src="https://www.youtube.com/embed/neTnuSvzszE?autoplay=1&mute=1&loop=1&playlist=neTnuSvzszE&controls=0&modestbranding=1&rel=0"
                    className="w-full h-full object-cover opacity-70"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Cristiano Ronaldo Highlights"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30" />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <motion.p
                    animate={{ y: [-5, 5] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="text-white font-medium text-center">
                    "Cristiano Ronaldo: The Legend Reimagined"
                  </motion.p>
                </div>

                {/* Play Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                  <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                </motion.div>

                {/* Stats Overlay */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm text-white font-medium">
                    ⚽️ 800+ Goals
                  </p>
                  <p className="text-sm text-white font-medium">
                    🏆 5x Ballon d'Or
                  </p>
                  <p className="text-sm text-white font-medium">
                    🔥 200+ Assists
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 bg-black">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12">
              <motion.h2
                variants={fadeInVariants}
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Next-Gen Sports Storytelling
              </motion.h2>
              <motion.p
                variants={fadeInVariants}
                className="mt-4 text-gray-500 max-w-2xl mx-auto md:text-lg">
                Combining machine learning with cinematic techniques to
                revolutionize how we experience sports history.
              </motion.p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3 items-center max-w-5xl mx-auto">
              {[
                {
                  icon: Wand2,
                  title: "AI Narrative Engine",
                  content:
                    "Harness the power of GPT-4 to create captivating narratives that bring sports history to life. Our AI analyzes decades of sports data, player statistics, and historical context to craft compelling story arcs that resonate with fans. Experience storytelling that not only informs but also engages, making every reel a journey through the triumphs and challenges of legendary athletes.",
                  gradient: "from-blue-400 to-indigo-500",
                },
                {
                  icon: Video,
                  title: "Dynamic Editing",
                  content:
                    "Revolutionize the way you consume sports content with our automated video editing system. Utilizing advanced algorithms, our platform intelligently selects the most impactful clips and seamlessly transitions between them, ensuring a smooth and engaging viewing experience. Say goodbye to tedious editing and hello to dynamic storytelling that captures the essence of every moment.",
                  gradient: "from-indigo-500 to-purple-500",
                },
                {
                  icon: Smartphone,
                  title: "Immersive Experience",
                  content:
                    "Dive into a new era of sports viewing with our immersive, mobile-optimized format. Designed for the modern viewer, our interactive elements and real-time stats overlay enhance your engagement, allowing you to explore player performances and game statistics as you watch. Whether you're on the go or at home, our platform transforms every viewing into an interactive experience that keeps you connected to the action.",
                  gradient: "from-purple-500 to-pink-500",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    type: "spring",
                    delay: i * 0.2,
                    ...springConfig,
                  }}
                  className="rounded-xl bg-gray-900 border border-gray-800 shadow-2xl p-8 relative overflow-hidden group hover:shadow-xl transition-shadow"
                  whileHover={{ y: -10 }}>
                  <div
                    className={`absolute top-0 left-0 h-2 w-full bg-gradient-to-r ${feature.gradient}`}
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center h-14 w-14 rounded-full bg-white/5 mb-6">
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.content}</p>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 bg-gradient-to-br from-purple-900 to-blue-900">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", ...springConfig }}
              className="max-w-3xl mx-auto text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}>
                Ready to Experience Sports History 2.0?
              </motion.h2>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}>
                <Link href="/reels" passHref>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 h-14 text-lg shadow-lg hover:shadow-xl transition-all"
                    aria-label="Explore Legendary Reels">
                    Explore Legendary Reels
                    <motion.span
                      animate={{ rotate: [0, 15, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="ml-2">
                      🏆
                    </motion.span>
                  </Button>
                </Link>

                <Link href="/admin" passHref>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 h-14 text-lg shadow-lg hover:shadow-xl transition-all"
                    aria-label="Create Custom Reel">
                    Create Custom Reel
                    <Wand2 className="ml-2 h-4 w-4 text-purple-300" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-gray-900 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.1 }}
          className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeInVariants} className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Video className="h-5 w-5" />
                <span className="font-bold">SportReels</span>
              </div>
              <p className="text-sm text-gray-400">
                Discover the fascinating histories of your favorite sports
                celebrities through AI-generated video reels.
              </p>
            </motion.div>

            <motion.div variants={fadeInVariants} className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/reels"
                    className="hover:text-white transition-colors">
                    Watch Reels
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="hover:text-white transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInVariants} className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInVariants}
            className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2025 Sports Celebrity Reels. All rights reserved.</p>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}
