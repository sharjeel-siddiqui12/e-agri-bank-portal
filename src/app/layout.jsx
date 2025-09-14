"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import { NavigationProvider } from "@/providers/navigation-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import "./globals.css";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",  // define CSS variable
  display: "swap",
});

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const isLogin = pathname === "/login" || pathname === "/";
  
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          {isLogin ? (
            <main className="flex-1 bg-white">{children}</main>
          ) : (
            <NavigationProvider>
              <div className="flex h-screen overflow-hidden">
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className="flex flex-col flex-1 overflow-auto">
                  <Topbar />
                  <main className="flex-1 bg-white">{children}</main>
                </div>
              </div>
            </NavigationProvider>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}