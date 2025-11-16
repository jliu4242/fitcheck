"use client";

import React from "react";
import Link from "next/link";
import { Home, Users, Shirt, List, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav({ activeTab = "outfit" }) {
  return (
    <nav className="rounded-full border border-[#AFC7B6] bg-[#1A3D2F] px-4 py-2 flex items-center justify-between shadow-md">
      <NavIcon
        href="/"
        icon={<Home size={20} />}
        label="Home"
        active={activeTab === "home"}
      />
      <NavIcon
        href="/friends"
        icon={<Users size={20} />}
        label="Friends"
        active={activeTab === "friends"}
      />
      <NavIcon
        href="/outfit"
        icon={<Shirt size={20} />}
        label="Outfit"
        active={activeTab === "outfit"}
      />
      <NavIcon
        href="/leaderboard"
        icon={<List size={20} />}
        label="Leaderboard"
        active={activeTab === "leaderboard"}
      />
      <NavIcon
        href="/profile"
        icon={<User size={20} />}
        label="Profile"
        active={activeTab === "profile"}
      />
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
        className={`relative h-11 w-11 flex items-center justify-center ${
          active ? "text-[#1A3D2F]" : "text-[#D7E1D8]"
        }`}
      >
        {active && (
          <motion.span
            layoutId="nav-active-circle"
            className="absolute inset-0 rounded-full bg-[#E7EEE3]"
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
