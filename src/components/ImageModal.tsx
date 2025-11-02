"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  title: string;
  type: "exercise" | "meal";
  onClose: () => void;
}

export default function ImageModal({ title, type, onClose }: ImageModalProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    generateImage();
  }, [title]);

  const generateImage = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: title, type }),
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Error generating image:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white/90 dark:bg-pink-950/30 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 max-w-xl w-[80%] overflow-hidden border border-white/20 dark:border-[#333333]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-300/50 dark:border-[#333333]">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100/50 dark:hover:bg-[#222222] rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Image Content */}
          <div className="p-6">
            <div className="relative w-full aspect-square bg-gray-100/50 dark:bg-pink-950/30 rounded-2xl overflow-hidden border border-gray-300/50 dark:border-[#333333]">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <Loader2 className="w-12 h-12 animate-spin text-pink-600 dark:text-pink-400" />
                  <span className="mt-4 text-gray-600 dark:text-gray-400">
                    Generating image...
                  </span>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Unable to generate image at this time
                  </p>
                  <button
                    onClick={generateImage}
                    className="px-5 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all shadow-lg shadow-pink-500/25 border border-pink-500/20"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {imageUrl && !loading && !error && (
                <>
                  {imageUrl.startsWith('data:') ? (
                    // Use regular img tag for base64 data URLs
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                      onError={() => setError(true)}
                    />
                  ) : (
                    // Use Next.js Image for external URLs
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover"
                      onError={() => setError(true)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}