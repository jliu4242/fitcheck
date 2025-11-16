"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BottomNav from "@/components/ui/BottomNav";

const ALL_USERS = [
  { id: 1, name: "Michael" },
  { id: 2, name: "James" },
  { id: 3, name: "June" },
];

export default function FriendsPage() {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);

  const nonFriends = useMemo(
    () =>
      ALL_USERS.filter(
        (u) =>
          !friends.some((f) => f.id === u.id) &&
          u.name.toLowerCase().includes(search.toLowerCase())
      ),
    [friends, search]
  );

  const handleAdd = (user) => {
    if (!friends.some((f) => f.id === user.id)) {
      setFriends((prev) => [...prev, user]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-11 pb-32">
        {/* Page title + subtitle (like leaderboard) */}
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Add Friend
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Find your friends and add them to your list.
          </p>
        </header>

        {/* Main white card container (like leaderboard card) */}
        <Card className="rounded-3xl shadow-lg border border-slate-100 bg-white">
          <CardContent className="p-4 space-y-5">
            {/* Search bar */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Find your friend here..."
                  className="pl-9 rounded-full bg-slate-50 border-slate-200 focus-visible:ring-1 focus-visible:ring-slate-300"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* People you may know */}
            <section>
              <h2 className="text-sm font-semibold text-slate-800 mb-2">
                Friends suggestion
              </h2>

              <div className="space-y-3">
                {nonFriends.map((user) => (
                  <Card
                    key={user.id}
                    className="bg-slate-100 rounded-2xl border-0 shadow-none"
                  >
                    <CardContent className="py-2 px-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 bg-slate-700">
                          <AvatarFallback className="text-white text-sm">
                            {user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-slate-900">
                            {user.name}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Suggested friend
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full px-4 text-xs font-semibold border-slate-300 hover:bg-slate-900 hover:text-white"
                        onClick={() => handleAdd(user)}
                      >
                        Add
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                {nonFriends.length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-2">
                    No more people to add with this search.
                  </p>
                )}
              </div>
            </section>

            {/* Friend list */}
            <section>
              <h2 className="text-sm font-semibold text-slate-800 mb-2">
                Your friends
              </h2>

              {friends.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-2">
                  You haven&apos;t added any friends yet.
                </p>
              )}

              <div className="space-y-3">
                {friends.map((user) => (
                  <Card
                    key={user.id}
                    className="bg-slate-100 rounded-2xl border-0 shadow-none"
                  >
                    <CardContent className="py-2 px-3 flex items-center gap-3">
                      <Avatar className="h-9 w-9 bg-slate-700">
                        <AvatarFallback className="text-white text-sm">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-slate-900">
                          {user.name}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Friend
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
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
