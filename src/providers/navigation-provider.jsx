"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const NavigationContext = createContext({});

// Map routes to page titles - aligned with sidebar
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

export function NavigationProvider({ children }) {
  const pathname = usePathname();
  
  // Initialize with the current path's title
  const initialTitle = routeTitleMap[pathname] || "Dashboard";
  const [activePage, setActivePage] = useState(initialTitle);
  const previousPathRef = useRef(pathname);

  // Update title when path changes
  useEffect(() => {
    // Only update if the path actually changed
    if (previousPathRef.current !== pathname) {
      const pageTitle = routeTitleMap[pathname] || "Dashboard";
      setActivePage(pageTitle);
      previousPathRef.current = pathname;
    }
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);   