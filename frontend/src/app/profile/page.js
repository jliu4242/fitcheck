"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/ui/BottomNav";
import { useAuth } from "@/context/authContext";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

const MOCK_USER = {
  name: "You",
  username: "@you",
};

const MOCK_FRIENDS = [
  { id: 1, name: "Emily Chen", username: "@emchen" },
  { id: 2, name: "Rizky", username: "@riz" },
  { id: 3, name: "Daniel Park", username: "@dpark" },
];

const MOCK_POSTS = [
  { id: 1, label: "Post 1" },
  { id: 2, label: "Post 2" },
  { id: 3, label: "Post 3" },
];

export default function UserPage() {
  const router = useRouter();
  const { user, token } = useAuth();   

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main content */}
      <main className="flex-1 flex flex-col gap-4 px-4 pt-12 pb-24 max-w-md mx-auto w-full">
        {/* User header (same style idea as leaderboard: title + subtitle) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            {/* LEFT: Avatar + name */}
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" alt={MOCK_USER.name} />
                <AvatarFallback>
                  {MOCK_USER.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <CardTitle className="text-base">{MOCK_USER.name}</CardTitle>
                <CardDescription className="text-sm">
                  {MOCK_USER.username}
                </CardDescription>
              </div>
            </div>

            {/* RIGHT: Logout button */}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => router.push("/auth")}
            >
              Logout
            </Button>
          </CardHeader>
        </Card>

        {/* Friends section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Friends</CardTitle>
            <CardDescription className="text-xs">
              {MOCK_FRIENDS.length} friends
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {MOCK_FRIENDS.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={friend.name} />
                    <AvatarFallback>
                      {friend.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {friend.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {friend.username}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Previous postings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Previous posting
            </CardTitle>
            <CardDescription className="text-xs">
              Latest photos you posted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {MOCK_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square rounded-xl bg-gray-200 flex items-center justify-center text-xs text-muted-foreground"
                >
                  {post.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* ⭐ Bottom Navigation (fixed) */}
      <div className="fixed inset-x-0 bottom-2 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <BottomNav activeTab="profile" />
      </div>
    </div>
  );
}
