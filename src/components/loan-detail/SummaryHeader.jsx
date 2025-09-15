"use client";
import styles from "@/app/(loan-operatioons-items)/loan-requests/[id]/LoanDetail.module.css";

export default function SummaryHeader({ items = [], compact = true }) {
  return (
    <div className={[styles.kvGrid, compact ? styles.summaryCompact : ""].join(" ")}>
      {items.map((it) => (
        <div key={it.label} className={styles.kvItem}>
          <div className={styles.kvLabel}>{it.label}</div>
          <div className={styles.kvValue}>{it.value}</div>
        </div>
      ))}
    </div>
  );
}
