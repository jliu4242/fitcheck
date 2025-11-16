"use client";

import React from "react";
import Link from "next/link";
import { Home, Users, Shirt, List, User } from "lucide-react";

export default function BottomNav({ activeTab = "outfit" }) {
  return (
    <nav className="rounded-full border-[2px] border-black bg-[#B8FFD8] px-4 py-2 flex items-center justify-between">
      <NavIcon href="/" icon={<Home />} label="Home" active={activeTab === "home"} />
      <NavIcon href="/users" icon={<Users />} label="Users" active={activeTab === "users"} />
      <NavIcon href="/outfit" icon={<Shirt />} label="Outfit" active={activeTab === "outfit"} />
      <NavIcon href="/leaderboard" icon={<List />} label="Leaderboard" active={activeTab === "leaderboard"} />
      <NavIcon href="/profile" icon={<User />} label="Profile" active={activeTab === "profile"} />
    </nav>
  );
}

function NavIcon({ href, icon, label, active }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex items-center justify-center shrink-0"
    >
      <div
        className={`h-11 w-11 rounded-full flex items-center justify-center transition-all ${
          active ? "bg-[#F4FFE3]" : "bg-transparent"
        }`}
      >
        <button className="h-9 w-9 rounded-full flex items-center justify-center">
          {icon}
        </button>
      </div>
    </Link>
  );
}
