"use client";

import React from "react";
import Link from "next/link";
import { Home, Users, Shirt, List, User } from "lucide-react";

export default function BottomNav({ activeTab = "outfit"}) {
    return (
        <nav className="mt-auto rounded-full border-[2px] border-black bg-[#B8FFD8] px-4 py-2 flex items-center justify-between">
            <NavIcon href="/" icon={<Home />} label="Home" active={activeTab === "home"} />
            <NavIcon href="/users" icon={<Users />} label="Users" active={activeTab === "users"} />
            <NavIcon href="/outfit" icon={<Shirt />} label="Outfit" active={activeTab === "outfit"} />
            <NavIcon href="/lists" icon={<List />} label="Lists" active={activeTab === "lists"} />
            <NavIcon href="/profile" icon={<User />} label="Profile" active={activeTab === "profile"} />
        </nav>
    );
}

function NavIcon({ href, icon, active}) {
    // active = which page you're on
    if (active) {
        // highlighted state (like the shirt icon in your mock)
        return (
            <Link href={href} className="flex items-center justify-center">
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
        >
            {icon}
        </Link>
    );
}