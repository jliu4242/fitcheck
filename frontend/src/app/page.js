"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FitsCarousel from "@/components/fitsCarousel";   // ⬅️ new
import BottomNav from "@/components/ui/BottomNav";
import { Slider } from "@/components/ui/slider";
import CommentBar from "@/components/ui/commentBar";

const FITS = [
  {
    id: 1,
    name: "Emily Chen",
    username: "@emchen",
    avatar: "/emily.jpg",
    image: "/fits/basicgirl.jpg",
    timeAgo: "5 min ago",
  },
  {
    id: 2,
    name: "Rizky",
    username: "@riz",
    avatar: "/rizky.png",
    image: "/fits/guy.jpg",
    timeAgo: "30 min ago",
  },
  {
    id: 3,
    name: "Daniel Park",
    username: "@dpark",
    avatar: "/daniel.png",
    image: "/fits/man.jpg",
    timeAgo: "1 hr ago",
  },
];

export default function HomePage() {
  const [rating, setRating] = useState([40]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState([]);

  const currentFit = FITS[currentIndex] ?? FITS[0];

  const handleSendComment = (text) => {
    const newComment = { id: Date.now(), text };
    setComments((prev) => [...prev, newComment]);

    setTimeout(() => {
      setComments((prev) => prev.filter((c) => c.id !== newComment.id));
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#f0ddbb] text-[#1A3D2F] flex flex-col">
      <div className="flex-1 flex flex-col gap-4 px-4 pt-10 pb-24 max-w-md w-full mx-auto">
        {/* TITLE */}
        <h1 className="text-2xl font-semibold tracking-tight text-center text-[#1A3D2F]">
          Rate Your Friend&apos;s Outfit
        </h1>

        {/* CAROUSEL + OVERLAYS */}
        <div className="relative">
          {/* User info bubble */}
          <header className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-white/85 text-[#1A3D2F] px-3 py-1 rounded-full backdrop-blur-md shadow-sm border border-[#AFC7B6]/60">
            <Link href="/profile">
              <Avatar className="h-8 w-8 border border-[#AFC7B6]">
                <AvatarImage src={currentFit.avatar} alt={currentFit.name} />
                <AvatarFallback className="text-xs">
                  {currentFit.name?.[0] || "👤"}
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className="flex flex-col leading-tight">
              <span className="text-xs font-medium">{currentFit.name}</span>
              <span className="text-[10px] text-[#5F7467]">
                {currentFit.timeAgo}
              </span>
            </div>
          </header>

          {/* Floating comments */}
          {comments.length > 0 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex flex-col items-center gap-1 px-4">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#1A3D2F]/85 text-[#F4F7F2] px-3 py-1 rounded-full text-xs max-w-[80%] text-center shadow-sm border border-[#AFC7B6]/80"
                >
                  {c.text}
                </div>
              ))}
            </div>
          )}

          {/* shadcn carousel version */}
          <FitsCarousel items={FITS} onSlideChange={setCurrentIndex} />
        </div>

        {/* RATING SLIDER */}
        <div className="pt-3 px-5">
          <Slider
            value={rating}
            onValueChange={setRating}
            min={0}
            max={100}
            step={1}
          />
          <p className="mt-2 text-xs text-[#5F7467] text-center">
            Rating for{" "}
            <span className="font-semibold text-[#1A3D2F]">
              {currentFit.name}
            </span>
            :{" "}
            <span className="font-semibold text-[#1A3D2F]">
              {rating[0]}
            </span>
            /100
          </p>
        </div>

        {/* COMMENT BAR */}
        <CommentBar onSend={handleSendComment} />
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed inset-x-0 bottom-2 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <BottomNav activeTab="home" />
      </div>
    </main>
  );
}
