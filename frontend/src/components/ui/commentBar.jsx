
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function commentBar() {
    const [comment, setComment] = useState("");

    return (
        <div className="flex items-center gap-2 rounded-full border-2 border-black px-3 py-1">
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
    )
}