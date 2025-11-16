"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/ui/BottomNav";

export default function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Start camera
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error(err);
        setError("Camera unavailable. Check permissions or HTTPS.");
      }
    }

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !video) return;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  const retake = () => {
    setHasPhoto(false);
    setCaption("");
  };

  const postPhoto = async () => {
    if (!canvasRef.current) return;

    setLoading(true);
    setError("");

    try {
      // Convert canvas to blob
      const blob = await new Promise((resolve) => {
        canvasRef.current.toBlob(resolve, "image/jpeg", 0.95);
      });

      // Create a File object from the blob
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('image', file);

      const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTc2Mzg4NDQ3M30.k1ZSxV3GyycmZ4mDCg-CzjpB3393Ul-e4SZM4KnGgAA";

      const res = await fetch('http://localhost:8000/api/posts/create', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to create post');
      }

      const data = await res.json();
      console.log("Post created:", data);
      alert("Photo posted successfully!");
      
      // Reset
      retake();
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-13 pb-32 flex flex-col gap-4">
        {/* Title & Subtitle */}
        <header className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Share Your Outfit</h1>
          <p className="text-xs text-slate-500 mt-1">
            Take a photo and post it.
          </p>
        </header>

        {/* Camera / Preview */}
        <div className="w-full flex-1 flex flex-col justify-center">
          <div className="w-full aspect-[3/4] bg-black rounded-2xl overflow-hidden shadow-md">
            {!hasPhoto ? (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
            ) : (
              <canvas ref={canvasRef} className="w-full h-full object-cover" />
            )}
          </div>

          {error && (
            <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
          )}
        </div>

        {/* Caption Input */}
        {hasPhoto && (
          <div className="w-full">
            <input
              type="text"
              placeholder="Add a caption (optional)..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-2">
          {!hasPhoto ? (
            <Button
              className="rounded-full px-6 text-sm font-semibold"
              onClick={takePhoto}
            >
              Take Photo
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="rounded-full px-6 text-sm font-semibold"
                onClick={retake}
                disabled={loading}
              >
                Retake
              </Button>

              <Button
                className="rounded-full px-6 text-sm font-semibold"
                onClick={postPhoto}
                disabled={loading}
              >
                {loading ? "Posting..." : "Post"}
              </Button>
            </>
          )}
        </div>
      </main>

      {/* Bottom Navigation (fixed) */}
      <div className="fixed inset-x-0 bottom-2 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <BottomNav activeTab="outfit" />
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}