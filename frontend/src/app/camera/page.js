"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const router = useRouter();

  const [stream, setStream] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [photoBlob, setPhotoBlob] = useState(null);

  useEffect(() => {
    const startCam = async () => {
      try {
        const cam = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(cam);
        if (videoRef.current) {
          videoRef.current.srcObject = cam;
        }
      } catch (err) {
        console.error(err);
        alert("Camera access denied.");
      }
    };

    startCam();

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, []);

  const handleTake = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setPhotoBlob(blob);
        setPhotoUrl(url);
      },
      "image/jpeg",
      0.9
    );
  };

  const handleRetake = () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(null);
    setPhotoBlob(null);
  };

  const handlePost = async () => {
    if (!photoBlob) return;

    const formData = new FormData();
    formData.append("photo", photoBlob, "photo.jpg");

    try {
      const res = await fetch("/api/post-photo", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");

      alert("Photo posted!");
      router.back();
    } catch (err) {
      console.error(err);
      alert("Upload error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f3f3] pb-6">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <span className="text-sm font-medium">Take a Photo</span>

        <div className="w-10" /> {/* keeps center text centered */}
      </div>

      <div className="flex-1 flex flex-col items-center gap-4 px-4">
        
        <div className="w-full max-w-md aspect-[3/4] bg-black rounded-2xl overflow-hidden border">
          {!photoUrl ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={photoUrl}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {!photoUrl ? (
          <Button onClick={handleTake} className="rounded-full px-6 mt-2">
            Take Photo
          </Button>
        ) : (
          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              onClick={handleRetake}
              className="rounded-full px-5"
            >
              Retake
            </Button>
            <Button
              onClick={handlePost}
              className="rounded-full px-6"
            >
              Post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
