"use client";

import React from "react";
import Link from "next/link";
import { Home, Users, Shirt, List, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav({ activeTab = "outfit" }) {
  return (
    <nav className="rounded-full border-[2px] border-black bg-[#B8FFD8] px-4 py-2 flex items-center justify-between">
      <NavIcon href="/" icon={<Home />} label="Home" active={activeTab === "home"} />
      <NavIcon href="/friends" icon={<Users />} label="Friends" active={activeTab === "friends"} />
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
      <div className="relative h-11 w-11 flex items-center justify-center">
        {active && (
          <motion.span
            layoutId="nav-active-circle"
            className="absolute inset-0 rounded-full bg-[#F4FFE3]"
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          />
        )}

        <div className="relative z-10 h-9 w-9 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
    </Link>
  );
}
