"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ReelItem } from "./reel-item";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import type { Video } from "@/types/video";
import { motion, AnimatePresence } from "framer-motion";

export function ReelContainer() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setVideos(data.videos);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to load videos. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [toast]);

  // Smooth scroll for desktop only
  useEffect(() => {
    if (!isMobile && containerRef.current && videos.length > 0) {
      const container = containerRef.current;
      const videoHeight = container.clientHeight;
      container.scrollTo({
        top: currentIndex * videoHeight,
        behavior: "smooth",
      });
    }
  }, [currentIndex, videos.length, isMobile]);

  // Scroll handler
  useEffect(() => {
    const container = containerRef.current;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (container) {
            const scrollPos = container.scrollTop;
            const height = container.clientHeight;
            const newIndex = Math.round(scrollPos / height);

            if (
              newIndex !== currentIndex &&
              newIndex >= 0 &&
              newIndex < videos.length
            ) {
              setCurrentIndex(newIndex);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    if (container && !isMobile) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container && !isMobile) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentIndex, videos.length, isMobile]);

  const handleNext = useCallback(() => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, videos.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center space-x-3">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <span className="text-lg font-medium text-white">
            Loading reels...
          </span>
        </motion.div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-lg bg-white/10 backdrop-blur-sm p-8 text-center shadow-lg">
          <h3 className="mb-4 text-2xl font-bold text-white">
            No videos available
          </h3>
          <p className="text-gray-300">Check back later for new content!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory relative bg-gradient-to-br from-black via-gray-900 to-gray-800 scrollbar-hide">
      {videos.map((video, index) => (
        <ReelItem
          key={video.id}
          video={video}
          isActive={index === currentIndex}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      ))}
    </motion.div>
  );
}
