"use client";


import { useUser } from "@/context/UserContext";
import { logout } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Header = () => {
  const { user, loaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  if (!loaded) {
    return (
      <SkeletonTheme baseColor="#2d2d2d" highlightColor="#3c3c3c">
        <header
          className="flex items-center justify-between px-6 py-4"
          aria-busy="true"
        >
          {/* Left side: avatar + text */}
          <div className="flex items-center gap-3">
            <Skeleton circle width={32} height={32} />
            <Skeleton height={16} width={128} borderRadius={4} />
          </div>

          {/* Right side: text block */}
          <Skeleton height={16} width={160} borderRadius={4} />
        </header>
      </SkeletonTheme>
    );
  }

  const initials = user
    ? `${user.first_name[0] || ""}${user.last_name[0] || ""}`.toUpperCase()
    : "U";

  return (
    <header className="px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-sm font-semibold text-accent-foreground">
              {initials}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {user ? `${user.first_name} ${user.last_name}` : "Guest"}
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden "
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="mt-4 flex flex-col gap-4 md:hidden justify-center items-center">
          <Link href="/" className="text-foreground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/articles" className="text-muted-foreground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Articles</Link>
          {!user && (
            <button >
              <Link href="/login" className="text-muted-foreground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Login</Link>
            </button>
          )}
          {user && (
            <>
              <Link href="/dashboard" className="text-muted-foreground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <Link href="/" onClick={() => { logout(); setIsOpen(false); }} className="text-muted-foreground hover:text-accent transition-colors">Logout</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};
