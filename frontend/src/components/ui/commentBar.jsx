"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CommentBar({ onSend }) {
  const [comment, setComment] = useState("");

  const handleSend = () => {
    const trimmed = comment.trim();
    if (!trimmed) return;

    if (onSend) {
      onSend(trimmed);
    } else {
      console.log("comment:", trimmed);
    }

    setComment("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-full border-2 bg-[white] border-black px-3 py-1">
      <Input
        className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xs"
        placeholder="Comment Here ..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        size="icon"
        className="rounded-full h-8 w-8 px-0"
        onClick={handleSend}
      >
        ➝
      </Button>
    </div>
  );
}
