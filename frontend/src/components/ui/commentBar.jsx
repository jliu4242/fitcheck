"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CommentBar({ onSend }) {
  const [comment, setComment] = useState("");

  return (
    <div className="flex items-center gap-2 rounded-full border-2 border-black px-3 py-1 bg-white">
      <Input
        className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xs"
        placeholder="Comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        size="icon"
        className="rounded-full h-8 w-8 px-0"
        onClick={() => {
          const text = comment.trim();
          if (!text) return;
          if (onSend) onSend(text);
          setComment("");
        }}
      >
        ➝
      </Button>
    </div>
  );
}
