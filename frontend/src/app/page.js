"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FitsSlider from "@/components/fitsSlider";
import BottomNav from "@/components/ui/BottomNav";

export default function HomePage() {
  const [rating, setRating] = useState([40]);
  const [comment, setComment] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
      {/* Phone frame */}
      <div className="w-[340px] h-[700px] rounded-[32px] border-[3px] border-black bg-white p-3">
        <div className="w-full h-full rounded-[26px] border-[2px] border-black p-4 flex flex-col gap-3">
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
              <span className="text-xs text-muted-foreground">3hrs ago</span>
            </div>
          </header>

          {/* ==== IMAGE CARD ==== */}
          <FitsSlider />

          {/* ==== SLIDER ==== */}
          <div className="flex flex-col items-center gap-1">
            <Slider
              value={rating}
              onValueChange={setRating}
              max={100}
              step={1}
              className="w-2/3"
            />
          </div>

          {/* ==== COMMENT BAR ==== */}
          <div className="flex items-center gap-2 rounded-full border-[2px] border-black px-3 py-1">
            <Input
              className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xs"
              placeholder="Comment Here ..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              size="icon"
              className="rounded-full h-8 w-8 px-0"
              onClick={() => {
                console.log("comment:", comment);
                setComment("");
              }}
            >
              ➝
            </Button>
          </div>

          {/* ==== BOTTOM NAVIGATION ==== */}
          <BottomNav activeTab="outfit" />
        </div>
      </div>
    </div>
  );
}
