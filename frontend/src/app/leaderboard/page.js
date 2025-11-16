"use client";

import React, { useEffect, useState } from "react"
import BottomNav from "@/components/ui/BottomNav";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { useAuth } from "@/context/authContext";

const rankColors = {
  1: "#D4AF37", // Gold
  2: "#C0C0C0", // Silver
  3: "#CD7F32", // Bronze
  default: "#B4C8B1", // Soft Green for others
};
// const leaderboardData = [
//   {
//     id: 1,
//     name: "You",
//     username: "@you",
//     avgRating: 4.9,
//     totalRatings: 87,
//   },
//   {
//     id: 2,
//     name: "Emily Chen",
//     username: "@emchen",
//     avgRating: 4.7,
//     totalRatings: 63,
//   },
//   {
//     id: 3,
//     name: "Rizky",
//     username: "@riz",
//     avgRating: 4.6,
//     totalRatings: 51,
//   },
//   {
//     id: 4,
//     name: "Daniel Park",
//     username: "@dpark",
//     avgRating: 4.5,
//     totalRatings: 39,
//   },
//   {
//     id: 5,
//     name: "Sarah Lee",
//     username: "@sarah",
//     avgRating: 4.4,
//     totalRatings: 28,
//   },
// ]

export default function LeaderboardPage() {
    const { user, token } = useAuth();
    const [data, setData] = useState([]);

    function createData(users) {
        const data = data.map((item, index) => ({
            i: index + 1,
            name: item.user_id,
            avgRating: item.avg_rating,
        }))
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://localhost:8000/leaderboard/", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            var data = await res.json();
            console.log("Raw data:", data); // ← Check what this logs
            console.log("Is array?", Array.isArray(data)); // ← Check if it's an array
            if (data.length > 5) {
                data = data.slice(0,5);
            }
            setData(data && data.map((item, index) => ({
                i: index + 1,
                name: item.user_id,
                avgRating: item.average_rating,
            })))
        }
        
        fetchData();
    }, [token]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f0ddbb] text-[#1A3D2F]">

      {/* Page content */}
      <main className="flex-1 px-4 pb-24 pt-20 max-w-md mx-auto">
        
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A3D2F]">
            Leaderboard
          </h1>
          <p className="text-sm text-[#5F7467] mt-2">
            See how your average rating compares to your friends.
          </p>
        </header>

        {/* Leaderboard Card */}
        <Card className="border border-[#AFC7B6]/60 bg-white/90 shadow-sm rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#1A3D2F]">
              Friends rating ranking
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            {data.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-xl bg-muted/60 px-4 py-3"
                style={{
                    backgroundColor: bgColor,
                    borderColor: "rgba(0,0,0,0.08)",
                  }}
                >
              >
                {/* Left: rank + avatar + name */}
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-sm font-semibold">
                    #{index + 1}
                  </span>

                    <Avatar className="h-9 w-9 border border-white/40">
                      <AvatarImage src="" alt={user.name} />
                      <AvatarFallback className="bg-[#1A3D2F] text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none text-[#1A3D2F]">
                        {user.name}
                      </span>
                      <span className="text-xs text-[#1A3D2F]/70">
                        {user.username}
                      </span>
                    </div>
                  </div>

                  {/* Right: Rating */}
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-[#1A3D2F]">
                      {user.avgRating.toFixed(1)}
                      <span className="text-xs text-[#1A3D2F]/70"> / 5</span>
                    </span>
                    <span className="text-[11px] text-[#1A3D2F]/70">
                      {user.totalRatings} ratings
                    </span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-2 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <BottomNav activeTab="leaderboard" />
      </div>
    </div>
  );
}
