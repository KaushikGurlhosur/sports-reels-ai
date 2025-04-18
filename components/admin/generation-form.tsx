"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Wand2 } from "lucide-react";
import * as Toast from "@radix-ui/react-toast";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export function GenerationForm() {
  const [celebrityName, setCelebrityName] = useState("");
  const [sport, setSport] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");

  // Toast state
  const [open, setOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");
  const [toastType, setToastType] = useState("default"); // default, success, error

  const showToast = (title, description, type = "default") => {
    setToastTitle(title);
    setToastDescription(description);
    setToastType(type);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!celebrityName || !sport) {
      showToast(
        "Missing information",
        "Please provide both celebrity name and sport.",
        "error"
      );
      return;
    }

    setLoading(true);
    setGeneratedScript("");

    // Show the "generating" toast when process starts
    showToast(
      "Processing",
      `Your video for ${celebrityName} is being generated.`
    );

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          celebrityName,
          sport,
          additionalInfo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate video");
      }

      // Show success toast
      showToast(
        "Success!",
        `Your video for ${celebrityName} has been generated.`,
        "success"
      );

      // Display the generated script preview if available
      if (data.script) {
        setGeneratedScript(data.script);
      }
    } catch (error) {
      console.error("Error generating video:", error);

      // Show error toast
      showToast(
        "Error",
        "Failed to generate script. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast.Provider swipeDirection="right">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}>
          {/* Gradient Border Card */}
          <div className="p-1 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg">
            <Card className="overflow-hidden border-0 bg-white rounded-lg">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="space-y-2">
                    <Label htmlFor="celebrity-name" className="text-gray-700">
                      Celebrity Name
                    </Label>
                    <Input
                      id="celebrity-name"
                      value={celebrityName}
                      onChange={(e) => setCelebrityName(e.target.value)}
                      placeholder="e.g., Michael Jordan"
                      required
                      className="border-gray-300 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-2">
                    <Label htmlFor="sport" className="text-gray-700">
                      Sport
                    </Label>
                    <Input
                      id="sport"
                      value={sport}
                      onChange={(e) => setSport(e.target.value)}
                      placeholder="e.g., Basketball"
                      required
                      className="border-gray-300 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-2">
                    <Label htmlFor="additional-info" className="text-gray-700">
                      Additional Information (Optional)
                    </Label>
                    <Textarea
                      id="additional-info"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Any specific aspects of their career you want to highlight..."
                      rows={4}
                      className="border-gray-300 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                      disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate Video
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <AnimatePresence>
                    {generatedScript && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
                        <h4 className="font-medium mb-2 text-blue-800">
                          Generated Script Preview:
                        </h4>
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                          {generatedScript}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Radix Toast Components */}
        <AnimatePresence>
          {open && (
            <Toast.Root asChild forceMount>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`
                  fixed bottom-4 right-4 rounded-md shadow-lg p-4 
                  ${
                    toastType === "error"
                      ? "bg-red-100 border border-red-200"
                      : toastType === "success"
                      ? "bg-green-100 border border-green-200"
                      : "bg-blue-100 border border-blue-200"
                  }
                  max-w-sm
                `}>
                <Toast.Title
                  className={`font-medium mb-1 
                  ${
                    toastType === "error"
                      ? "text-red-800"
                      : toastType === "success"
                      ? "text-green-800"
                      : "text-blue-800"
                  }`}>
                  {toastTitle}
                </Toast.Title>
                <Toast.Description
                  className={
                    toastType === "error"
                      ? "text-red-600"
                      : toastType === "success"
                      ? "text-green-600"
                      : "text-blue-600"
                  }>
                  {toastDescription}
                </Toast.Description>
                <Toast.Action
                  className="absolute top-2 right-2"
                  asChild
                  altText="Close toast">
                  <button
                    className="rounded-full p-1 text-gray-400 hover:text-gray-600"
                    aria-label="Close">
                    ×
                  </button>
                </Toast.Action>
              </motion.div>
            </Toast.Root>
          )}
        </AnimatePresence>
        <Toast.Viewport />
      </Toast.Provider>
    </>
  );
}
