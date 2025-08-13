"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Settings, Gift, AlertTriangle, CalendarDays, Target, ChevronRight } from "lucide-react";
import styles from './layout.module.css';

export default function LendingRulesLayout({ children }) {
  const pathname = usePathname();
  
  const sidebarItems = [
    {
      title: "General Rules",
      icon: <Settings className={styles.icon} />,
      href: "/lending-rules/general",
    },
    {
      title: "Product-Based Rules",
      icon: <Gift className={styles.icon} />,
      href: "/lending-rules/product-based",
    },
    {
      title: "Exposure Limits",
      icon: <AlertTriangle className={styles.icon} />,
      href: "/lending-rules/exposure-limits",
    },
    {
      title: "Tenure Settings",
      icon: <CalendarDays className={styles.icon} />,
      href: "/lending-rules/tenure-settings",
    },
    {
      title: "Disbursement Conditions",
      icon: <Target className={styles.icon} />,
      href: "/lending-rules/disbursement-conditions",
    },
  ];
  
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Set Your Lending Rules</h1>
      
      <div className={styles.content}>
        <nav className={styles.sidebar}>
          {sidebarItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.sidebarItem} ${pathname === item.href ? styles.active : ''}`}
            >
              {item.icon}
              <span className={styles.itemText}>{item.title}</span>
              <ChevronRight className={styles.chevron} size={18} />
            </Link>
          ))}
        </nav>
        
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}