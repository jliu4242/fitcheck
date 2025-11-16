"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FitsSlider from "@/components/fitsSlider";
import BottomNav from "@/components/ui/BottomNav";
import { Slider } from "@/components/ui/slider";

export default function HomePage() {
  const [rating, setRating] = useState([40]);
  const [comment, setComment] = useState("");

  return (
    <main className="min-h-screen bg-[#f3f3f3] flex flex-col">
      {/* Main content area */}
      <div className="flex-1 flex flex-col gap-3 px-4 pt-4 pb-24 max-w-md w-full mx-auto">
        {/* ==== TOP: user info ==== */}
        <header className="flex items-center gap-3">
          <Link href="/auth">
            <Avatar className="h-10 w-10 border border-black">
              <AvatarImage src="/avatar.png" alt="You" />
              <AvatarFallback className="text-lg">👤</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">You</span>
            <span className="text-xs text-muted-foreground">3 hrs ago</span>
          </div>
        </header>

        {/* ==== IMAGE CARD ==== */}
        <FitsSlider />
        <div className='pl-5 pr-5'>
            <Slider/>
        </div>
      </div>

      {/* ==== BOTTOM NAVIGATION (fixed) ==== */}
      <div className="fixed inset-x-0 bottom-0 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <BottomNav activeTab="outfit" />
      </div>
    </main>
  );
}
