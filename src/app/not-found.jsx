"use client";

import { useEffect } from "react";
import { useNavigation } from "@/providers/navigation-provider";
import styles from "./not-found.module.css";

export default function NotFoundPage() {
  const { setActivePage } = useNavigation();
  
  useEffect(() => {
    // Set the page title for 404 page
    setActivePage("Page Not Found");
  }, [setActivePage]);

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <div className={styles.divider}></div>
        <p className={styles.errorMessage}>This page could not be found.</p>
      </div>
    </div>
  );
}