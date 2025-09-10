"use client";

import React, { useEffect, useState } from "react";
import { useNavigation } from "@/providers/navigation-provider";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import styles from "./topbar.module.css";
import { Bell, Search, ChevronDown } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

// Map of routes to page titles - should match what's in the NavigationProvider
const routeTitleMap = {
  "/": "Dashboards",
  "/login": "Login",
  "/dashboard": "Dashboards",
  // Primary
  "/onboard-farmer": "Onboard Farmer",
  "/loan-marketplace": "Loan Marketplace",
  // Product Management
  "/product-setup": "Product Setup",
  "/product-approval": "Product Approval",
  "/credit-score-setup": "Credit Score Setup",
  "/preferred-vendor-setup": "Preferred Vendor Setup",
  "/preferred-vendor-setup-approval": "Preferred Vendor Setup - Approval",
  // Loan Operations
  "/loan-requests": "Loan Requests",
  "/loan-assessments": "Loan Assessments",
  "/loan-approvals": "Loan Approvals",
  "/loan-disbursements": "Loan Disbursements",
  "/loan-monitoring": "Loan Monitoring",
  // Loan Settlements
  "/auction-requests-approval": "Auction Requests Approval",
  "/loan-settlements": "Loan Settlements",
  // Resource Onboarding
  "/resource-onboarding": "Resource Onboarding",
  // Access Rights Management
  "/user-role-define": "User Role Define",
  "/user-role-assign": "User Role Assign",
};

export function Topbar() {
  const { activePage } = useNavigation();
  const pathname = usePathname();
  const [displayTitle, setDisplayTitle] = useState("");
  const { logout } = useAuth();
  
  // Immediately set the title based on current path
  useEffect(() => {
    // Get title from path or use a default
    const titleFromPath = routeTitleMap[pathname] || "Dashboard";
    setDisplayTitle(titleFromPath);
  }, [pathname]);

  // Then update if activePage changes (for manual overrides)
  useEffect(() => {
    if (activePage) {
      setDisplayTitle(activePage);
    }
  }, [activePage]);

  return (
    <div className={styles.topbar}>
      {/* Left: Page Title and Subtitle */}
      <div className={styles.titleContainer}>
        <h1 className={styles.pageTitle}>{activePage}</h1>
        <p className={styles.subtitle}>Let's check your update today</p>
      </div>

      {/* Center: Search */}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <Input
            type="search"
            placeholder="Search..."
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Right: Notifications and User Profile */}
      <div className={styles.userActions}>
        {/* Notification Bell */}
        <div className={styles.notificationWrapper}>
          <Button
            variant="outline"
            size="icon"
            className={styles.notificationButton}
          >
            <Bell className={styles.bellIcon} />
            <span className={styles.notificationIndicator}></span>
          </Button>
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={styles.userProfileButton}>
              <div className={styles.userProfile}>
                <Avatar className={styles.avatar}>
                  <AvatarImage src="/user.png" alt="User" />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>Sharjeel</span>
                  <span className={styles.userRole}>Super Admin</span>
                </div>
                <ChevronDown className={styles.dropdownIcon} />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={styles.dropdownContent}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
