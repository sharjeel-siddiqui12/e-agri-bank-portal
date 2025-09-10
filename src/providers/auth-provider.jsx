"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext({
  isAuthenticated: false,
  isReady: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasJustLoggedIn, setHasJustLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem("isAuthenticated") : null;
      setIsAuthenticated(stored === "true");
    } catch (_) {
      setIsAuthenticated(false);
    } finally {
      setIsReady(true);
    }
  }, []);

  // Simple client-side guard routing
  useEffect(() => {
    if (!isReady) return;
    
    // When not authenticated: allow staying on "/" (acts as login) or "/login"
    if (!isAuthenticated) {
      if (pathname !== "/" && pathname !== "/login") {
        router.replace("/");
      }
      return;
    }
    
    // When authenticated: only redirect to dashboard if user just logged in
    // This prevents automatic redirect on page refresh
    if (isAuthenticated && hasJustLoggedIn && (pathname === "/" || pathname === "/login")) {
      router.replace("/dashboard");
      setHasJustLoggedIn(false);
    }
  }, [isAuthenticated, isReady, pathname, router, hasJustLoggedIn]);

  const login = () => {
    try {
      window.localStorage.setItem("isAuthenticated", "true");
    } catch (_) {}
    setIsAuthenticated(true);
    setHasJustLoggedIn(true);
  };

  const logout = () => {
    try {
      window.localStorage.removeItem("isAuthenticated");
    } catch (_) {}
    setIsAuthenticated(false);
    router.replace("/login");
  };

  const value = useMemo(
    () => ({ isAuthenticated, isReady, login, logout }),
    [isAuthenticated, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);


