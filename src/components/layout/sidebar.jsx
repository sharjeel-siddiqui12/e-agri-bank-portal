"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "@/providers/navigation-provider";
import styles from "./sidebar.module.css";
import { Button } from "@/components/ui/button";
// lucide-react imports (trimmed to only what we use)
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  UserPlus,
  Store,
  ClipboardList,
  Settings,
  BadgeCheck,
  Gauge,
  Handshake,
  UserCheck,
  FolderOpen,
  FileSearch,
  Banknote,
  LineChart,
  FileCheck,
  Gavel,
  ReceiptText,
  Shield,
  UserCog,
} from "lucide-react";

// Primary top-level items (matches: dashboard tile, onboarding, marketplace)
const primaryItems = [
  { name: "Dashboards", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Farmer Registration Request", icon: UserPlus, href: "/farmer-registration-request" },
  { name: "Loan Marketplace", icon: Store, href: "/loan-marketplace" },
];

// Product Management section (clipboard/doc vibe + approvals/gauge/vendor)
const productManagementItems = [
  { name: "Product Setup", icon: Settings, href: "/product-setup" },
  { name: "Product Approval", icon: BadgeCheck, href: "/product-approval" },
  { name: "Credit Score Setup", icon: Gauge, href: "/credit-score-setup" },
  {
    name: "Preferred Vendor Setup",
    icon: Handshake,
    href: "/preferred-vendor-setup",
  },
  {
    name: "Preferred Vendor Setup - Approval",
    icon: UserCheck,
    href: "/preferred-vendor-setup-approval",
  },
];

// Loan Operations section (requests/assessment/approval/disbursement/monitoring)
const loanOperationsItems = [
  { name: "Loan Requests", icon: ClipboardList, href: "/loan-requests" },
  { name: "Loan Assessments", icon: FileSearch, href: "/loan-assessments" },
  { name: "Loan Approvals", icon: BadgeCheck, href: "/loan-approvals" },
  { name: "Loan Disbursements", icon: Banknote, href: "/loan-disbursements" },
  { name: "Loan Monitoring", icon: LineChart, href: "/loan-monitoring" },
];

// Loan Settlements section (auction + settlement/receipt)
const loanSettlementsItems = [
  {
    name: "Auction Requests Approval",
    icon: Gavel,
    href: "/auction-requests-approval",
  },
  { name: "Loan Settlements", icon: ReceiptText, href: "/loan-settlements" },
];

// Standalone
const resourceOnboardingItem = {
  name: "Resource Onboarding",
  icon: Settings,
  href: "/resource-onboarding",
};

// Access Rights Management section (security/roles)
const accessRightsItems = [
  { name: "User Role Define", icon: UserCog, href: "/user-role-define" },
  { name: "User Role Assign", icon: UserCheck, href: "/user-role-assign" },
];

export function Sidebar({ className, collapsed, setCollapsed }) {
  const { activePage, setActivePage } = useNavigation();

  const asideClassName = `${styles.sidebar} ${
    collapsed ? styles.collapsed : ""
  } ${className || ""}`;

  return (
    <aside className={asideClassName}>
      {/* Toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className={styles.collapseButton}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className={styles.collapseIcon} />
        ) : (
          <ChevronLeft className={styles.collapseIcon} />
        )}
      </Button>

      {/* Logo section */}
      <div className={styles.logoSection}>
        <Link
          href="/dashboard"
          className={styles.logoLink}
          onClick={() => setActivePage("Dashboards")}
        >
          <Image
            src="/logo.svg"
            width={collapsed ? 50 : 120}
            height={collapsed ? 50 : 40}
            alt="e-Agri Logo"
            className={styles.logo}
            priority
          />
        </Link>
      </div>

      {/* Menu label */}
      {!collapsed && <div className={styles.menuLabel}>Menu</div>}

      {/* Navigation items */}
      <nav className={styles.navigation}>
        {/* Primary items */}
        <div className={styles.section}>
          <div className={styles.sectionItems}>
            {primaryItems.map((item) => {
              const isActive = activePage === item.name;
              const itemClassName = `${styles.primaryLarge} ${
                isActive ? styles.active : ""
              } ${collapsed ? styles.collapsedItem : ""}`;
              const iconClassName = `${styles.icon} ${
                isActive ? styles.activeIcon : ""
              } ${collapsed ? styles.collapsedIcon : ""}`;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={itemClassName}
                  title={collapsed ? item.name : undefined}
                  onClick={() => setActivePage(item.name)}
                >
                  <item.icon className={iconClassName} />
                  {!collapsed && (
                    <span className={styles.navText}>{item.name}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Product Management Section */}
        <div className={styles.section}>
          {!collapsed && (
            <div className={styles.sectionHeader}>
              <ClipboardList className={styles.sectionIcon} />
              <span className={styles.sectionTitle}>Product Management</span>
            </div>
          )}

          <div className={styles.sectionItems}>
            {productManagementItems.map((item) => {
              const isActive = activePage === item.name;
              const itemClassName = `${styles.navItem} ${
                isActive ? styles.active : ""
              } ${collapsed ? styles.collapsedItem : ""}`;
              const iconClassName = `${styles.icon} ${
                isActive ? styles.activeIcon : ""
              } ${collapsed ? styles.collapsedIcon : ""}`;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={itemClassName}
                  title={collapsed ? item.name : undefined}
                  onClick={() => setActivePage(item.name)}
                >
                  <item.icon className={iconClassName} />
                  {!collapsed && (
                    <span className={styles.navText}>{item.name}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Loan Operations Section */}
        <div className={styles.section}>
          {!collapsed && (
            <div className={styles.sectionHeader}>
              <FolderOpen className={styles.sectionIcon} /> {/* folder icon */}
              <span className={styles.sectionTitle}>Loan Operations</span>
            </div>
          )}

          <div className={styles.sectionItems}>
            {loanOperationsItems.map((item) => {
              const isActive = activePage === item.name;
              const itemClassName = `${styles.navItem} ${
                isActive ? styles.active : ""
              } ${collapsed ? styles.collapsedItem : ""}`;
              const iconClassName = `${styles.icon} ${
                isActive ? styles.activeIcon : ""
              } ${collapsed ? styles.collapsedIcon : ""}`;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={itemClassName}
                  title={collapsed ? item.name : undefined}
                  onClick={() => setActivePage(item.name)}
                >
                  <item.icon className={iconClassName} />
                  {!collapsed && (
                    <span className={styles.navText}>{item.name}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Loan Operations Section */}
        <div className={styles.section}>
          {!collapsed && (
            <div className={styles.sectionHeader}>
              <FolderOpen className={styles.sectionIcon} />
              <span className={styles.sectionTitle}>Loan Operations</span>
            </div>
          )}

          <div className={styles.sectionItems}>
            {loanSettlementsItems.map((item) => {
              const isActive = activePage === item.name;
              const itemClassName = `${styles.navItem} ${
                isActive ? styles.active : ""
              } ${collapsed ? styles.collapsedItem : ""}`;
              const iconClassName = `${styles.icon} ${
                isActive ? styles.activeIcon : ""
              } ${collapsed ? styles.collapsedIcon : ""}`;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={itemClassName}
                  title={collapsed ? item.name : undefined}
                  onClick={() => setActivePage(item.name)}
                >
                  <item.icon className={iconClassName} />
                  {!collapsed && (
                    <span className={styles.navText}>{item.name}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Resource Onboarding */}
        <div className={styles.section}>
          <div className={styles.sectionItems}>
            {(() => {
              const item = resourceOnboardingItem;
              const isActive = activePage === item.name;
              const itemClassName = `${styles.primaryLarge} ${
                isActive ? styles.active : ""
              } ${collapsed ? styles.collapsedItem : ""}`;
              const iconClassName = `${styles.icon} ${
                isActive ? styles.activeIcon : ""
              } ${collapsed ? styles.collapsedIcon : ""}`;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={itemClassName}
                  title={collapsed ? item.name : undefined}
                  onClick={() => setActivePage(item.name)}
                >
                  <item.icon className={iconClassName} />
                  {!collapsed && (
                    <span className={styles.navText}>{item.name}</span>
                  )}
                </Link>
              );
            })()}
          </div>
        </div>

        {/* Access Rights Management Section */}
        <div className={styles.section}>
          {!collapsed && (
            <div className={styles.sectionHeader}>
              <Shield className={styles.sectionIcon} />
              <span className={styles.sectionTitle}>
                Access Rights Management
              </span>
            </div>
          )}

          <div className={styles.sectionItems}>
            {accessRightsItems.map((item) => {
              const isActive = activePage === item.name;
              const itemClassName = `${styles.navItem} ${
                isActive ? styles.active : ""
              } ${collapsed ? styles.collapsedItem : ""}`;
              const iconClassName = `${styles.icon} ${
                isActive ? styles.activeIcon : ""
              } ${collapsed ? styles.collapsedIcon : ""}`;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={itemClassName}
                  title={collapsed ? item.name : undefined}
                  onClick={() => setActivePage(item.name)}
                >
                  <item.icon className={iconClassName} />
                  {!collapsed && (
                    <span className={styles.navText}>{item.name}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}
