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

const masterDataItems = [
  { name: "Person Category Setup", icon: FileText, href: "/person-category-setup" },
  { name: "Person Category - Approval", icon: CheckCircle, href: "/person-category-approval" },
  { name: "SCS Category Setup", icon: FileText, href: "/scs-category-setup" },
  { name: "SCS Category - Approval", icon: CheckCircle, href: "/scs-category-approval" },
  { name: "Person - Stakeholder Mapping", icon: Users, href: "/person-stakeholder-mapping" },
  { name: "Person - Stakeholder Mapping - Approval", icon: CheckCircle, href: "/person-stakeholder-mapping-approval" },
  { name: "KYC Document Setup", icon: FileText, href: "/kyc-document-setup" },
  { name: "KYC Document Mapping", icon: FileCheck, href: "/kyc-document-mapping" },
  { name: "KYC Document Mapping - Approval", icon: CheckCircle, href: "/kyc-document-mapping-approval" },
  { name: "UoM Setup", icon: Scale, href: "/uom-setup" },
  { name: "UoM Category Setup", icon: FileText, href: "/uom-category-setup" },
  { name: "Grade Definition", icon: Award, href: "/grade-definition" },
  { name: "Grading Parameters", icon: BarChart3, href: "/grading-parameters" },
  { name: "Commodity Classification", icon: BookOpen, href: "/commodity-classification" },
  { name: "Commodity Classification Approval", icon: BookOpen, href: "/commodity-classification-approval" },
  { name: "Commodity Grade Specification", icon: Calculator, href: "/commodity-grade-specification" },
  { name: "Commodity Grade Specification - Approval", icon: PenTool, href: "/commodity-grade-specification-approval" },
];

const setupItems = [
  { name: "Charts of Accounts", icon: FileText, href: "/charts-of-accounts" },
  { name: "Charts of Accounts - Approval", icon: CheckCircle, href: "/charts-of-accounts-approval" },
  { name: "Manual Voucher Entry", icon: ClipboardList, href: "/manual-voucher-entry" },
  { name: "Manual Voucher Entry - Approval", icon: CheckCircle, href: "/manual-voucher-entry-approval" },
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
          href="/person-category-setup" 
          className={styles.logoLink}
          onClick={() => setActivePage("Person Category Setup")}
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
        {/* Master Data Section */}
        <div className={styles.section}>
          {!collapsed && (
            <div className={styles.sectionHeader}>
              <Database className={styles.sectionIcon} />
              <span className={styles.sectionTitle}>Master Data</span>
            </div>
          )}
          <div className={styles.sectionItems}>
            {masterDataItems.map((item) => {
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

        {/* Setup Section */}
        <div className={styles.section}>
          {!collapsed && (
            <div className={styles.sectionHeader}>
              <Settings className={styles.sectionIcon} />
              <span className={styles.sectionTitle}>Setup</span>
            </div>
          )}
          <div className={styles.sectionItems}>
            {setupItems.map((item) => {
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
