"use client";

import { useUser } from "@/context/UserContext";
import { logout } from "@/lib/api";
import Link from "next/link";


export const Header = () => {
  const { user, loaded } = useUser();

  if (!loaded) {
    return (
      <header className="flex items-center justify-between px-6 py-4 border-b border-border animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-700" />
          <div className="w-32 h-4 bg-gray-700 rounded" />
        </div>
        <div className="w-40 h-4 bg-gray-700 rounded" />
      </header>
    );
  }

  const initials = user
    ? `${user.first_name[0] || ""}${user.last_name[0] || ""}`.toUpperCase()
    : "U";

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
          <span className="text-sm font-semibold text-accent-foreground">{initials}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {user ? `${user.first_name} ${user.last_name}` : "Guest"}
          </span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-foreground hover:text-accent transition-colors">Home</Link>
        <Link href="/articles" className="text-muted-foreground hover:text-accent transition-colors">Articles</Link>
        {!user && (
          <Link href="/login" className="text-muted-foreground hover:text-accent transition-colors">Login</Link>
        )}
        {user && (
          <>
            <Link href="/dashboard" className="text-muted-foreground hover:text-accent transition-colors">Dashboard</Link>
            <Link href="/" onClick={logout} className="text-muted-foreground hover:text-accent transition-colors">Logout</Link>
          </>
        )}
      </nav>
    </header>
  );
};
