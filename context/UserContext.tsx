"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser } from '@/lib/api'

const PUBLIC_ROUTES = ["/", "/login", "/register", "/about", "/verify", "/contact", "/articles", "/articles/[slug]"];


interface User {
    email: string;
    first_name: string;
    last_name: string;
    role: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loaded: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [loaded, setLoaded] = useState(false);

    const setUser = (user: User | null) => {
        setUserState(user);
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("user");
        }
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        const path = window.location.pathname;
        console.log("Path:", path);
        const isPublic = PUBLIC_ROUTES.some(route => path === route || path.startsWith(route + "/"));
        console.log("Is Public:", isPublic);

        if (isPublic) {
            setLoaded(true); // Don't fetch the user
            return;
        }

        const existingUser = sessionStorage.getItem("user");
        if (existingUser) {
            setUserState(JSON.parse(existingUser));
            setLoaded(true);
            return;
        }

        const fetchUser = async () => {
            const res = await getCurrentUser();

            if (res.ok && res.data?.user) {
                setUser(res.data.user);
            } else {
                window.location.href = "/login";
                return;
            }
            setLoaded(true);
        };

        fetchUser();
    }, []);


    return (
      <UserContext.Provider value={{ user, setUser, loaded }}>
          {children}
      </UserContext.Provider>
    );
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within a UserProvider");
    return ctx;
};
