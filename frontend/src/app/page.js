"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FitsCarousel from "@/components/fitsCarousel";
import BottomNav from "@/components/ui/BottomNav";
import { Slider } from "@/components/ui/slider";
import CommentBar from "@/components/ui/commentBar";
import { useAuth } from "@/context/authContext";

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
  const { token } = useAuth();
  const [rating, setRating] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentsByFit, setCommentsByFit] = useState(INITIAL_COMMENTS);
  const [fits, setFits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch fits data + resolve usernames from /api/users/{user_id}
  useEffect(() => {
    if (!token) return;

    async function fetchFits() {
      try {
        setLoading(true);

        // 1) fetch posts
        const res = await fetch("http://localhost:8000/api/posts/get-recent", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const posts = await res.json();
        console.log("Raw fits data:", posts);

        if (!Array.isArray(posts)) {
          setFits([]);
          return;
        }

        // 2) collect unique user_ids
        const userIds = Array.from(
          new Set(posts.map((p) => p.user_id).filter(Boolean))
        );

        // 3) fetch usernames for each user_id
        const userMap = {};

        await Promise.all(
          userIds.map(async (userId) => {
            try {
              const userRes = await fetch(
                `http://localhost:8000/api/users/${userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (!userRes.ok) {
                throw new Error("Failed to fetch user");
              }

              const userData = await userRes.json();
              // backend returns { username: "..." }
              userMap[userId] = userData?.username || "Unknown";
            } catch (e) {
              console.error(`Error fetching user ${userId}:`, e);
              userMap[userId] = "Unknown";
            }
          })
        );

        // 4) transform posts using userMap
        const transformed = posts.map((item) => {
          const username = userMap[item.user_id] || "Unknown";

          return {
            id: item.post_id, // ✅ actual post_id from db
            image: item.image_url,
            name: username,
            username: `@${username || "unknown"}`,
            avatar: item.user_avatar || "",
            caption: item.caption || "",
            timeAgo: item.created_at || "Just now",
          };
        });

        setFits(transformed);
      } catch (err) {
        console.error("Fetch error:", err);
        setFits([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFits();
  }, [token]);

  const currentFit = fits[currentIndex];
  const currentComments = currentFit ? commentsByFit[currentFit.id] ?? [] : [];

  const handleSlideChange = (idx) => {
    setCurrentIndex(idx);
    setRating(0);
  };

  const handleAddComment = (text) => {
    const clean = text.trim();
    if (!clean || !currentFit) return;

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

  async function saveRating(num) {
    if (!currentFit) return;

    const post_id = currentFit.id;
    console.log("Saving rating for post_id:", post_id);

    const body = JSON.stringify({
      post_id: post_id,
      rating_value: Number(num),
    });

    console.log(body);

    try {
      const res = await fetch(
        "http://localhost:8000/ratings/create-rating",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: body,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save rating");
      }

      const data = await res.json();
      console.log("Rating saved:", data);
    } catch (err) {
      console.error("Error saving rating:", err);
    }
  }

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-[#f0ddbb] flex items-center justify-center">
        <p className="text-[#1A3D2F]">Loading fits...</p>
      </main>
    );
  }

  // Show empty state
  if (!currentFit) {
    return (
      <main className="min-h-screen bg-[#f0ddbb] flex items-center justify-center">
        <p className="text-[#1A3D2F]">No fits available</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0ddbb] text-[#1A3D2F] flex flex-col">
      <div className="flex-1 flex flex-col gap-4 px-4 pt-9 pb-24 max-w-md w-full mx-auto">
        {/* TITLE */}
        <h1 className="text-[30px] font-semibold tracking-tight text-center text-[#1A3D2F]">
          Rate Your Friend&apos;s Outfit
        </h1>

        {/* CAROUSEL + OVERLAYS */}
        <div className="relative h-[480px]">
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
            className="absolute bottom-6 left-3 z-20 flex items-center justify-center h-10 w-10 rounded-2xl border-2 border-black bg-white shadow-sm active:scale-95 transition-transform"
          >
            <MessageCircle className="h-4 w-4 text-black" />
          </button>

          {/* Carousel stretched vertically */}
          <div className="absolute inset-0 pt-4 pb-0">
            <FitsCarousel items={fits} onSlideChange={handleSlideChange} />
          </div>
        </div>

        {/* CAPTION SECTION (only if caption exists) */}
        {currentFit.caption && currentFit.caption.trim() !== "" && (
          <div className="px-3 py-2 rounded-2xl bg-white/80 border border-[#AFC7B6]/60 shadow-sm">
            <p className="text-xs text-[#111827]">
              <span className="font-semibold mr-1">
                {currentFit.username}
              </span>
              {currentFit.caption}
            </p>
          </div>
        )}

        {/* RATING SLIDER + CAPTION */}
        <div className="pt-0 px-5">
          <Slider
            min={0}
            max={100}
            step={1}
            resetKey={currentIndex}
            onLock={(num) => {
              const value = num[0];
              saveRating(value);
              setRating(value);
            }}
          />
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
          <div
            className="flex-1"
            onClick={() => setIsCommentsOpen(false)}
          />

          {/* bottom sheet */}
          <div className="bg-[#F4F7F2] rounded-t-3xl p-4 pb-[calc(env(safe-area-inset-bottom)+25px)] max-h-[80vh] flex flex-col shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
            {/* header */}
            <div className="flex items-center justify-between mb-5 mt-3 ml-2 mr-2">
              <div className="flex items-center gap-3 ">
                <Avatar className="h-9 w-9 border border-[#AFC7B6]">
                  <AvatarImage
                    src={currentFit.avatar}
                    alt={currentFit.name}
                  />
                  <AvatarFallback>
                    {currentFit.name?.[0] || "👤"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">
                    {currentFit.name}
                  </span>
                  <span className="text-[11px] text-[#6B7280]">
                    Comments
                  </span>
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
                    <span className="text-xs text-[#374151]">
                      {c.text}
                    </span>
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
