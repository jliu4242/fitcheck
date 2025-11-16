"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BottomNav from "@/components/ui/BottomNav";
import { useAuth } from "@/context/authContext";

const ALL_USERS = [
  { id: 1, name: "Michael" },
  { id: 2, name: "James" },
  { id: 3, name: "June" },
];

export default function FriendsPage() {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [nonFriends, setNonFriends] = useState([]);
  const [activeTab, setActiveTab] = useState("find"); // "find" | "list"
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    async function fetchData() {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8000/api/users/search/${search}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch users');
            }

            const responseData = await res.json();
            console.log("Raw data:", responseData);
            console.log("Is array?", Array.isArray(responseData));
            
            if (Array.isArray(responseData)) {
                
                const transformed = responseData.map((item, index) => ({
                    id: index + 1,
                    name: item.username,
                    avgRating: item.average_rating ?? 0,
                    totalRatings: item.total_ratings ?? 0,
                }));
                
                setNonFriends(transformed);
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
}, [token, search]);

  useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:8000/api/friend/get-all-friends", {
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
                    
                    const transformed = responseData.map((item, index) => ({
                        id: index + 1,
                        name: item.username,
                        avgRating: item.average_rating ?? 0,
                        totalRatings: item.total_ratings ?? 0,
                    }));
                    
                    setFriends(transformed);
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

    const handleAdd = async (user) => {
        try {
          const res = await fetch(`http://localhost:8000/api/friend/add-friend/${user.name}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
    
          if (!res.ok) {
            throw new Error('Failed to add friend');
          }
    
          // Remove the user from nonFriends list
          setNonFriends((prev) => prev.filter((f) => f.id !== user.id));
          
          // Add to friends list
          if (!friends.some((f) => f.id === user.id)) {
            setFriends((prev) => [...prev, user]);
          }
        } catch (err) {
          console.error("Error adding friend:", err);
        }
      };

  return (
    <div className="min-h-screen bg-[#f0ddbb] flex flex-col text-[#1A3D2F]">
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-11 pb-32">
        {/* Page title + subtitle */}
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1A3D2F]">
            Friends
          </h1>
          <p className="text-xs text-[#5F7467] mt-1">
            Find new friends or manage your friend list.
          </p>
        </header>

        {/* Main card */}
        <Card className="rounded-3xl shadow-md border border-[#AFC7B6]/60 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4 space-y-5">
            {/* Top tab switcher */}
            <div className="bg-[#E1E9DF] rounded-full p-1 flex text-xs font-semibold mb-2">
              <button
                type="button"
                onClick={() => setActiveTab("find")}
                className={
                  "flex-1 py-2 rounded-full transition " +
                  (activeTab === "find"
                    ? "bg-white text-[#1A3D2F] shadow-sm"
                    : "text-[#5F7467]")
                }
              >
                Find Friends
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("list")}
                className={
                  "flex-1 py-2 rounded-full transition " +
                  (activeTab === "list"
                    ? "bg-white text-[#1A3D2F] shadow-sm"
                    : "text-[#5F7467]")
                }
              >
                Friend List
              </button>
            </div>

            {/* TAB: FIND FRIENDS */}
            {activeTab === "find" && (
              <div className="space-y-5">
                {/* Search bar */}
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9AAD9C]" />
                    <Input
                      placeholder="Find your friend here..."
                      className="pl-9 rounded-full bg-white border border-[#C9D7CC] focus-visible:ring-1 focus-visible:ring-[#AFC7B6]"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* People you may know */}
                <section>
                  <h2 className="text-sm font-semibold text-[#1A3D2F] mb-2">
                    Friend suggestions
                  </h2>

                  <div className="space-y-3">
                    {nonFriends.map((user) => (
                      <Card
                        key={user.id}
                        className="bg-[#F4F7F2] rounded-2xl border border-[#C9D7CC] shadow-none"
                      >
                        <CardContent className="py-2 px-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 bg-[#1A3D2F]">
                              <AvatarFallback className="text-white text-sm bg-[#1A3D2F]">
                                {user.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm text-[#1A3D2F]">
                                {user.name}
                              </span>
                              <span className="text-[11px] text-[#5F7467]">
                                Suggested friend
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full px-4 text-xs font-semibold border-[#AFC7B6] text-[#1A3D2F] hover:bg-[#1A3D2F] hover:text-white"
                            onClick={() => handleAdd(user)}
                          >
                            Add
                          </Button>
                        </CardContent>
                      </Card>
                    ))}

                    {nonFriends.length === 0 && (
                      <p className="text-xs text-[#5F7467] text-center py-2">
                        No more people to add with this search.
                      </p>
                    )}
                  </div>
                </section>
              </div>
            )}

            {/* TAB: FRIEND LIST */}
            {activeTab === "list" && (
              <section className="space-y-3">
                <h2 className="text-sm font-semibold text-[#1A3D2F] mb-2">
                  Your friends
                </h2>

                {friends.length === 0 && (
                  <p className="text-xs text-[#5F7467] text-center py-4">
                    You haven&apos;t added any friends yet.
                  </p>
                )}

                {friends.map((user) => (
                  <Card
                    key={user.id}
                    className="bg-[#F4F7F2] rounded-2xl border border-[#C9D7CC] shadow-none"
                  >
                    <CardContent className="py-2 px-3 flex items-center gap-3">
                      <Avatar className="h-9 w-9 bg-[#1A3D2F]">
                        <AvatarFallback className="text-white text-sm bg-[#1A3D2F]">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-[#1A3D2F]">
                          {user.name}
                        </span>
                        <span className="text-[11px] text-[#5F7467]">
                          Friend
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </section>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-2 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <BottomNav activeTab="friends" />
      </div>
    </div>
  );
}
