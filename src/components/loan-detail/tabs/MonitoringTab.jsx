"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button-loan";
import styles from "@/app/(loan-operatioons-items)/loan-requests/[id]/LoanDetail.module.css";

// Breakdown Modal Component
function BreakdownModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const breakdownData = [
    { inputType: "Seed", category: "Maize Seed", price: "200,000" },
    { inputType: "Fertilizer", category: "DAP", price: "100,000" },
    { inputType: "Fertilizer", category: "Urea", price: "50,000" },
    { inputType: "Pesticide", category: "Generic name", price: "50,000" },
    { inputType: "Soil Conditioner", category: "Gypsum", price: "80,000" },
  ];

  // Close modal if clicking overlay (not modal content)
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Funds Utilization Breakdown</h2>
          <button className={styles.modalCloseBtn} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.breakdownTable}>
            <div className={styles.breakdownHeader}>
              <div>Input Type</div>
              <div>Product Category</div>
              <div>Price</div>
            </div>
            {breakdownData.map((item, index) => (
              <div key={index} className={styles.breakdownRow}>
                <div>{item.inputType}</div>
                <div>{item.category}</div>
                <div>{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MonitoringTab() {
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  return (
    <>
      <div className={`${styles.twoCol} ${styles.monitoringCompact}`}>
        <div className={styles.card}>
          <div className={styles.cardTitleBlack}>Spending Tracker</div>
          <div className={styles.spendingRow}>
            <span className={styles.spendingLabel}>Funds Utilized</span>
            <span className={styles.spendingValue}>300,000</span>
          </div>
          <button
            className={styles.spendingBreakdownBtn}
            type="button"
            onClick={() => setIsBreakdownOpen(true)}
          >
            See Breakdown
          </button>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Crop Health Tracker</div>
          <div className={styles.kvRow}>
            <div className={styles.kvLabelSm}>Last Satellite Scan</div>
            <div className={styles.kvValueRight}>15 May 2025</div>
          </div>
          <div className={styles.kvRow}>
            <div className={styles.kvLabelSm}>Health Status</div>
            <span className={`${styles.pillGreen}`}>
              <span className={styles.pillGreenDot}></span>
              Healthy
            </span>
          </div>
          <div className={styles.mapShot}>
            <img src="/placeholder-farm.png" alt="satellite" />
          </div>
        </div>
      </div>

      <BreakdownModal 
        isOpen={isBreakdownOpen} 
        onClose={() => setIsBreakdownOpen(false)} 
      />

      <div className={`${styles.footerBar} ${styles.monitoringCompact}`}>
        <div />
        <div className={styles.footerActions}>
          <Button variant="outline" onClick={() => alert("Alert raised")}>Raise Alert</Button>
          <Button className={styles.primaryBtn} onClick={() => alert("Reminder sent")}>Send Reminder</Button>
        </div>
      </div>
    </>
  );
}
