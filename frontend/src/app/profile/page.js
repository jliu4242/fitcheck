"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/ui/BottomNav";

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

  return (
    <div className="min-h-screen flex flex-col bg-[#f0ddbb] text-[#1A3D2F]">

      {/* Main content */}
      <main className="flex-1 flex flex-col gap-4 px-4 pt-12 pb-24 max-w-md mx-auto w-full">

        {/* User Header */}
        <Card className="border border-[#AFC7B6]/60 bg-white/90 shadow-sm rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border border-[#AFC7B6]">
                <AvatarImage src="" alt={MOCK_USER.name} />
                <AvatarFallback className="bg-[#1A3D2F] text-white">
                  {MOCK_USER.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <CardTitle className="text-base text-[#1A3D2F]">
                  {MOCK_USER.name}
                </CardTitle>
                <CardDescription className="text-sm text-[#5F7467]">
                  {MOCK_USER.username}
                </CardDescription>
              </div>
            </div>

            {/* RIGHT */}
            <Button
              size="sm"
              className="rounded-full bg-[#1A3D2F] hover:bg-[#153126] text-white px-4"
              onClick={() => router.push("/auth")}
            >
              Logout
            </Button>
          </CardHeader>
        </Card>

        {/* Friends Section */}
        <Card className="border border-[#AFC7B6]/60 bg-white/90 shadow-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base text-[#1A3D2F]">Friends</CardTitle>
            <CardDescription className="text-xs text-[#5F7467]">
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
                  <Avatar className="h-8 w-8 border border-[#AFC7B6]">
                    <AvatarImage src="" alt={friend.name} />
                    <AvatarFallback className="bg-[#1A3D2F] text-white">
                      {friend.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#1A3D2F]">
                      {friend.name}
                    </span>
                    <span className="text-xs text-[#5F7467]">
                      {friend.username}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Previous Posts */}
        <Card className="border border-[#AFC7B6]/60 bg-white/90 shadow-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base text-[#1A3D2F]">
              Previous posting
            </CardTitle>
            <CardDescription className="text-xs text-[#5F7467]">
              Latest photos you posted
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {MOCK_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square rounded-xl bg-[#D5E0D6] text-[#5F7467] flex items-center justify-center text-xs shadow-sm"
                >
                  {post.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-2 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <BottomNav activeTab="profile" />
      </div>
    </div>
  );
}
