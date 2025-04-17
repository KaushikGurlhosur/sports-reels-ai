"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-sm shadow-sm py-3"
            : "bg-black py-5"
        }`}>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              className="flex items-center space-x-2 cursor-pointer">
              <Video
                className={`h-6 w-6 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              />
              <motion.span
                className={`font-bold text-xl ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}>
                <Link href="/">SportReels</Link>
              </motion.span>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/admin">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "tween",
                    duration: 0.2,
                    ease: "easeOut",
                  }}>
                  <Button
                    variant="outline"
                    className={`hidden md:flex h-10 px-6 rounded-lg transition-all duration-300 ${
                      scrolled
                        ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                        : "border-white text-white hover:bg-white hover:text-black"
                    }`}>
                    <span className="font-semibold text-gray-500">
                      Admin Dashboard
                    </span>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/reels">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "tween",
                    duration: 0.2,
                    ease: "easeOut",
                  }}>
                  <Button
                    className={`h-10 px-6 rounded-lg transition-all duration-300 ${
                      scrolled
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                    }`}>
                    <span className="font-semibold">Watch Reels</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                      className="ml-2">
                      <Video className="h-4 w-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
