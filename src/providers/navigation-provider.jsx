"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const NavigationContext = createContext({});

// Map routes to page titles - update this based on your actual routes
const routeTitleMap = {
  "/": "Person Category Setup",
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
  "/commodity-classification-approval": "Commodity Classification - Approval",
  "/commodity-grade-specification": "Commodity Grade Specification",
  "/commodity-grade-specification-approval": "Commodity Grade Specification - Approval",
  // Setup routes
  "/charts-of-accounts": "Charts of Accounts",
  "/charts-of-accounts-approval": "Charts of Accounts - Approval",
  "/manual-voucher-entry": "Manual Voucher Entry",
  "/manual-voucher-entry-approval": "Manual Voucher Entry - Approval",
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