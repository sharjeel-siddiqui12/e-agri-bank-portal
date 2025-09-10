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
  "/": "Dashboard",
  "/login": "Login",
  "/dashboard": "Dashboard",
  // Master Data routes
  "/person-category-setup": "Person Category Setup",
  "/person-category-approval": "Person Category - Approval",
  "/scs-category-setup": "SCS Category Setup",
  "/scs-category-approval": "SCS Category - Approval",
  "/person-stakeholder-mapping": "Person - Stakeholder Mapping",
  "/person-stakeholder-mapping-approval": "Person - Stakeholder Mapping - Approval",
  "/kyc-document-setup": "KYC Document Setup",
  "/kyc-document-mapping": "KYC Document Mapping",
  "/kyc-document-mapping-approval": "KYC Document Mapping - Approval",
  "/uom-setup": "UoM Setup",
  "/uom-category-setup": "UoM Category Setup",
  "/grade-definition": "Grade Definition",
  "/grading-parameters": "Grading Parameters",
  "/commodity-classification": "Commodity Classification",
  "/commodity-grade-specification": "Commodity Grade Specification",
  "/commodity-grade-specification-approval": "Commodity Grade Specification - Approval",
  // Setup routes
  "/charts-of-accounts": "Charts of Accounts",
  "/charts-of-accounts-approval": "Charts of Accounts - Approval",
  "/manual-voucher-entry": "Manual Voucher Entry",
  "/manual-voucher-entry-approval": "Manual Voucher Entry - Approval",
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
