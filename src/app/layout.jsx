"use client";

import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { NavigationProvider } from "@/providers/navigation-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import "./globals.css";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isLogin = pathname === "/login" || pathname === "/";

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setCollapsed(true);
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          {isLogin ? (
            <main className="flex-1 bg-white">{children}</main>
          ) : (
            <NavigationProvider>
              <div className="flex h-screen overflow-hidden relative">
                {/* Mobile overlay */}
                {isMobile && sidebarOpen && (
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                  />
                )}
                
                <Sidebar 
                  collapsed={collapsed} 
                  setCollapsed={setCollapsed}
                  isMobile={isMobile}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                
                <div className="flex flex-col flex-1 overflow-auto min-w-0">
                  <Topbar 
                    isMobile={isMobile}
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                  />
                  <main className="flex-1 bg-white overflow-auto">
                    <div className="h-full">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            </NavigationProvider>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}