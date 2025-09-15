"use client";

import { Button } from "@/components/ui/button-loan";
import styles from "@/app/(loan-operatioons-items)/loan-requests/[id]/LoanDetail.module.css";

export default function ApprovalTab({ onSend }) {
  return (
    <>
      <div className={`${styles.twoCol} ${styles.approvalCompact}`}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Loan Disbursement Details</div>

          <label className={styles.inputLabel}>Markup%</label>
          <select className={styles.select}>
            <option>8.5%</option>
            <option>9.0%</option>
            <option>9.5%</option>
          </select>

          <label className={styles.inputLabel}>Tenure</label>
          <input className={styles.input} value="6 months" readOnly />
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Loan Officer Details</div>
          <div className={styles.kvRow}>
            <div className={styles.kvLabelSm}>Full Name:</div>
            <div className={styles.kvValueRight}>Nouman Islam</div>
          </div>
          <div className={styles.kvRow}>
            <div className={styles.kvLabelSm}>Designation:</div>
            <div className={styles.kvValueRight}>Agri Loan Head</div>
          </div>
        </div>
      </div>

      <div className={`${styles.footerBar} ${styles.approvalCompact}`}>
        <Button variant="outline" onClick={() => alert("Update Details form")}>
          Update Details
        </Button>
        <div className={styles.footerActions}>
          <Button className={styles.primaryBtn} onClick={() => { alert("Sent for approval"); onSend?.(); }}>
            Send for Approval
          </Button>
        </div>
      </div>
    </>
  );
}
