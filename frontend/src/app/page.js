"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FitsCarousel from "@/components/fitsCarousel";
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

// demo starting comments
const INITIAL_COMMENTS = {
  1: [
    { id: 1, user: "Alex", text: "This fit is so clean 🔥" },
    { id: 2, user: "Jess", text: "Love the jacket + shoes!" },
  ],
  2: [{ id: 3, user: "Mia", text: "Streetwear king fr 👑" }],
  3: [{ id: 4, user: "Sara", text: "Very classy, 10/10." }],
};

export default function HomePage() {
  const [rating, setRating] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentsByFit, setCommentsByFit] = useState(INITIAL_COMMENTS);
  var a = 0;

  const currentFit = FITS[currentIndex] ?? FITS[0];
  const currentComments = commentsByFit[currentFit.id] ?? [];

  const handleSlideChange = (idx) => {
    setCurrentIndex(idx);
    setRating(0);
  };

  const handleAddComment = (text) => {
    const clean = text.trim();
    if (!clean) return;

    setCommentsByFit((prev) => {
      const existing = prev[currentFit.id] ?? [];
      const newComment = {
        id: Date.now(),
        user: "You",
        text: clean,
      };
      return {
        ...prev,
        [currentFit.id]: [...existing, newComment],
      };
    });
  };

  return (
    <main className="min-h-screen bg-[#f0ddbb] text-[#1A3D2F] flex flex-col">
      <div className="flex-1 flex flex-col gap-4 px-4 pt-15 pb-24 max-w-md w-full mx-auto">
        {/* TITLE */}
        <h1 className="text-[30px] font-semibold tracking-tight text-center text-[#1A3D2F]">
          Rate Your Friend&apos;s Outfit
        </h1>

        {/* CAROUSEL + OVERLAYS */}
        <div className="relative mt-0 h-[490px]">
          {/* User info bubble (top-left) */}
          <header className="absolute top-8 left-3 z-20 flex items-center gap-2 bg-white/85 text-[#1A3D2F] px-3 py-1 rounded-full backdrop-blur-md shadow-sm border border-[#AFC7B6]/60">
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

          {/* Comment button INSIDE carousel (bottom-left) */}
          <button
            type="button"
            onClick={() => setIsCommentsOpen(true)}
            className="absolute bottom-8 left-3 z-20 flex items-center justify-center h-10 w-10 rounded-2xl border-2 border-black bg-white shadow-sm active:scale-95 transition-transform"
          >
            <MessageCircle className="h-4 w-4 text-black" />
          </button>

          {/* Carousel stretched vertically */}
          <div className="absolute inset-0 pt-5 pb-2">
            <FitsCarousel items={FITS} onSlideChange={handleSlideChange} />
          </div>
        </div>

        {/* RATING SLIDER CENTERED BELOW CAROUSEL */}
        <div className="pt-0 px-5">
            <Slider
              min={0}
              max={100}
              step={1}
              resetKey={currentIndex}
              onLock={(num) => {
                  alert(num);         // should pop 34, 57, etc
                  setRating(num);
                  a = num;
                }}

            />
          <p className="mt-2 text-xs text-[#5F7467] text-center">
            Rating for{" "}
            <span className="font-semibold text-[#1A3D2F]">
              {currentFit.name}
            </span>
            :{" "}
            <span className="font-semibold text-[#1A3D2F]">
              {a}
            </span>
            /100
          </p>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed inset-x-0 bottom-2 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <BottomNav activeTab="home" />
      </div>

      {/* IG-STYLE COMMENT POPUP */}
      {isCommentsOpen && (
        <div className="fixed inset-1 z-40 flex flex-col bg-black/40">
          {/* tap outside to close */}
          <div className="flex-1" onClick={() => setIsCommentsOpen(false)} />

          {/* bottom sheet */}
          <div className="bg-[#F4F7F2] rounded-t-3xl p-4 pb-[calc(env(safe-area-inset-bottom)+25px)] max-h-[80vh] flex flex-col shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">

            {/* header */}
            <div className="flex items-center justify-between mb-5 mt-3 ml-2 mr-2">
              <div className="flex items-center gap-3 ">
                <Avatar className="h-9 w-9 border border-[#AFC7B6]">
                  <AvatarImage src={currentFit.avatar} alt={currentFit.name} />
                  <AvatarFallback>
                    {currentFit.name?.[0] || "👤"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">{currentFit.name}</span>
                  <span className="text-[11px] text-[#6B7280]">Comments</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCommentsOpen(false)}
                className="text-xs text-[#6B7280]"
              >
                Close
              </button>
            </div>

            {/* comments list */}
            <div className="flex-1 overflow-y-auto space-y-5 mb-5 pr-1 ml-2 mr-2">
              {currentComments.length === 0 ? (
                <p className="text-xs text-[#9CA3AF]">
                  No comments yet. Be the first to say something!
                </p>
              ) : (
                currentComments.map((c) => (
                  <div key={c.id} className="flex flex-col">
                    <span className="text-[11px] font-medium text-[#111827]">
                      {c.user}
                    </span>
                    <span className="text-xs text-[#374151]">{c.text}</span>
                  </div>
                ))
              )}
            </div>

            {/* comment input */}
            <CommentBar onSend={handleAddComment} />
          </div>
        </div>
      )}
    </main>
  );
}
