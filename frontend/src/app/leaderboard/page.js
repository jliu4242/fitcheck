"use client";

import React, { useEffect, useState, useMemo } from "react"
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
    4: "#A9A9A9", // Dark Gray
    5: "#B87333", // Copper
    default: "#B4C8B1", // Soft Green for others
  };

export default function LeaderboardPage() {
    const { user, token } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:8000/leaderboard/", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch leaderboard');
                }

                const responseData = await res.json();
                console.log("Raw data:", responseData);
                console.log("Is array?", Array.isArray(responseData));
                
                if (Array.isArray(responseData)) {
                    // Take top 5
                    const topFive = responseData.slice(0, 5);
                    
                    // Transform data and fetch usernames
                    const transformed = await Promise.all(topFive.map(async (item, index) => {
                        let username = 'Unknown';
                        
                        try {
                            const userRes = await fetch(`http://127.0.0.1:8000/api/users/${item.user_id}`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                            });
                            
                            if (userRes.ok) {
                                const userData = await userRes.json();
                                username = userData.username || 'Unknown';
                            }
                        } catch (err) {
                            console.error(`Error fetching user ${item.user_id}:`, err);
                        }
                        
                        return {
                            id: index + 1,
                            name: username,
                            username: `@${username.toLowerCase()}`,
                            avgRating: item.average_rating ?? 0,
                            totalRatings: item.total_ratings ?? 0,
                        };
                    }));
                    
                    setData(transformed);
                } else {
                    console.error("Data is not an array:", responseData);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        
        if (token) {
            fetchData();
        }
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
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1A3D2F] border-r-transparent"></div>
                <p className="text-sm text-[#5F7467] mt-3">Loading leaderboard...</p>
              </div>
            ) : data.length === 0 ? (
              <p className="text-center text-sm text-[#5F7467] py-4">
                No leaderboard data available
              </p>
            ) : (
              data.map((item, index) => {
                const bgColor = rankColors[index + 1] || rankColors.default;
                
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{
                      backgroundColor: bgColor,
                      borderColor: "rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Left: rank + avatar + name */}
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center text-sm font-semibold">
                        #{index + 1}
                      </span>

                      <Avatar className="h-9 w-9 border border-white/40">
                        <AvatarImage src="" alt={item.name} />
                        <AvatarFallback className="bg-[#1A3D2F] text-white">
                          {item.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none text-[#1A3D2F]">
                          {item.name}
                        </span>
                        <span className="text-xs text-[#1A3D2F]/70">
                          {item.username}
                        </span>
                      </div>
                    </div>

                    {/* Right: Rating */}
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-[#1A3D2F]">
                        {item.avgRating.toFixed(1)}
                        <span className="text-xs text-[#1A3D2F]/70"> / 100</span>
                      </span>
                    </div>
                  </div>
                );
              })
            )}
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