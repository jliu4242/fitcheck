"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Shirt, List, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname(); // e.g. "/", "/outfit", "/leaderboard"

  // convert pathname to a simple key
  const activeTab =
    pathname === "/" ? "home" : pathname.split("/")[1] || "home";

  return (
    <nav className="mt-auto rounded-full border-[2px] border-black bg-[#B8FFD8] px-4 py-2 flex items-center justify-between">
      <NavIcon
        href="/"
        icon={<Home />}
        label="Home"
        active={activeTab === "home"}
      />
      <NavIcon
        href="/users"
        icon={<Users />}
        label="Users"
        active={activeTab === "users"}
      />
      <NavIcon
        href="/camera"
        icon={<Shirt />}
        label="snap"
        active={activeTab === "camer"}
      />
      <NavIcon
        href="/leaderboard"
        icon={<List />}
        label="Leaderboard"
        active={activeTab === "leaderboard"}
      />
      <NavIcon
        href="/profile"
        icon={<User />}
        label="Profile"
        active={activeTab === "profile"}
      />
    </nav>
  );
}

function NavIcon({ href, icon, label, active }) {
  // active = which page you're on
  if (active) {
    // highlighted state (like the shirt icon in your mock)
    return (
      <Link href={href} className="flex items-center justify-center" aria-label={label}>
        <div className="h-11 w-11 rounded-full bg-[#F4FFE3] flex items-center justify-center">
          <button className="h-9 w-9 rounded-full flex items-center justify-center">
            {icon}
          </button>
        </div>
      </Link>
    );
  }

  // normal icon
  return (
    <Link
      href={href}
      className="h-9 w-9 rounded-full flex items-center justify-center"
      aria-label={label}
    >
      {icon}
    </Link>
  );
}
