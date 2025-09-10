"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "@/providers/navigation-provider";
import styles from "./sidebar.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Settings,
  CheckCircle,
  FolderOpen,
  Database,
  Users,
  FileCheck,
  Scale,
  Award,
  BarChart3,
  BookOpen,
  Calculator,
  ClipboardList,
  PenTool,
} from "lucide-react";

// Primary top-level items
const primaryItems = [
  { name: "Dashboards", icon: BarChart3, href: "/dashboard" },
  { name: "Onboard Farmer", icon: Users, href: "/onboard-farmer" },
  { name: "Loan Marketplace", icon: FolderOpen, href: "/loan-marketplace" },
];

// Product Management section
const productManagementItems = [
  { name: "Product Setup", icon: FileText, href: "/product-setup" },
  { name: "Product Approval", icon: CheckCircle, href: "/product-approval" },
  { name: "Credit Score Setup", icon: Scale, href: "/credit-score-setup" },
  { name: "Preferred Vendor Setup", icon: FileText, href: "/preferred-vendor-setup" },
  { name: "Preferred Vendor Setup - Approval", icon: CheckCircle, href: "/preferred-vendor-setup-approval" },
];

// Loan Operations section
const loanOperationsItems = [
  { name: "Loan Requests", icon: ClipboardList, href: "/loan-requests" },
  { name: "Loan Assessments", icon: Award, href: "/loan-assessments" },
  { name: "Loan Approvals", icon: CheckCircle, href: "/loan-approvals" },
  { name: "Loan Disbursements", icon: Calculator, href: "/loan-disbursements" },
  { name: "Loan Monitoring", icon: BarChart3, href: "/loan-monitoring" },
];

// Loan Settlements section
const loanSettlementsItems = [
  { name: "Auction Requests Approval", icon: CheckCircle, href: "/auction-requests-approval" },
  { name: "Loan Settlements", icon: FileCheck, href: "/loan-settlements" },
];

// Standalone
const resourceOnboardingItem = { name: "Resource Onboarding", icon: Settings, href: "/resource-onboarding" };

// Access Rights Management section
const accessRightsItems = [
  { name: "User Role Define", icon: FileText, href: "/user-role-define" },
  { name: "User Role Assign", icon: PenTool, href: "/user-role-assign" },
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
          <ChevronRight className={styles.collapseIcon}/>
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
              <Database className={styles.sectionIcon} />
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
              <FolderOpen className={styles.sectionIcon} />
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

        {/* Loan Settlements Section */}
        <div className={styles.section}>
          {!collapsed && (
            <div className={styles.sectionHeader}>
              <FileText className={styles.sectionIcon} />
              <span className={styles.sectionTitle}>Loan Settlements</span>
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
            })()}
          </div>
        </div>

        {/* Access Rights Management */}
        <div className={styles.section}>
          {!collapsed && (
            <div className={styles.sectionHeader}>
              <Settings className={styles.sectionIcon} />
              <span className={styles.sectionTitle}>Access Rights Management</span>
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
