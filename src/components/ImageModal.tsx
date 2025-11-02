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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image Content */}
          <div className="p-6">
            <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                  <span className="ml-3 text-gray-600 dark:text-gray-400">
                    Generating image...
                  </span>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Unable to generate image at this time
                  </p>
                  <button
                    onClick={generateImage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
