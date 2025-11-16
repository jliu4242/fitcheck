"use client"

import React from "react"
import BottomNav from "@/components/ui/BottomNav";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { useAuth } from "@/context/authContext";

const leaderboardData = [
  {
    id: 1,
    name: "You",
    username: "@you",
    avgRating: 4.9,
    totalRatings: 87,
  },
  {
    id: 2,
    name: "Emily Chen",
    username: "@emchen",
    avgRating: 4.7,
    totalRatings: 63,
  },
  {
    id: 3,
    name: "Rizky",
    username: "@riz",
    avgRating: 4.6,
    totalRatings: 51,
  },
  {
    id: 4,
    name: "Daniel Park",
    username: "@dpark",
    avgRating: 4.5,
    totalRatings: 39,
  },
  {
    id: 5,
    name: "Sarah Lee",
    username: "@sarah",
    avgRating: 4.4,
    totalRatings: 28,
  },
]

export default function LeaderboardPage() {
    const { user, token } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      
      {/* Page content */}
      <main className="flex-1 px-4 pb-24 pt-20 max-w-md mx-auto">
        
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Leaderboard
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            See how your average rating compares to your friends.
          </p>
        </header>

        {/* Leaderboard Card */}
        <Card className="border-none bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">
              Friends rating ranking
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {leaderboardData.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-xl bg-muted/60 px-4 py-3"
              >
                {/* Left: rank + avatar + name */}
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-sm font-semibold">
                    #{index + 1}
                  </span>

                  <Avatar className="h-9 w-9">
                    <AvatarImage src="" alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-none">
                      {user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.username}
                    </span>
                  </div>
                </div>

                {/* Right: rating */}
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold">
                    {user.avgRating.toFixed(1)}
                    <span className="text-xs text-muted-foreground"> / 5</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {user.totalRatings} ratings
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-2 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <BottomNav activeTab="leaderboard" />
      </div>
    </div>
  )
}
