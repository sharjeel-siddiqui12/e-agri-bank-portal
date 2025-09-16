"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button-loan";
import styles from "@/app/(loan-operations-items)/loan-requests/[id]/LoanDetail.module.css";

const Row = ({ k, v, unit }) => (
  <div className={styles.repaymentRow}>
    <div className={styles.repaymentLabel}>{k}</div>
    <div className={styles.repaymentValue}>{v} {unit || ""}</div>
  </div>
);

export default function RepaymentTab({ recordId, section = "loan-requests", rowDataForPending }) {
  const router = useRouter();

  const handleApplicationPendingClick = () => {
    const id = recordId || "000001";
    const base = section === "loan-approvals"
      ? "/loan-approvals"
      : section === "loan-assessments"
        ? "/loan-assessments"
      : section === "loan-disbursements"
        ? "/loan-disbursements"
      : section === "loan-monitoring"
        ? "/loan-monitoring"
      : section === "loan-settlements"
        ? "/loan-settlements"
        : "/loan-requests";
    try {
      if (typeof window !== 'undefined' && window.sessionStorage && rowDataForPending) {
        window.sessionStorage.setItem(`${section}:row:${id}`, JSON.stringify(rowDataForPending));
      }
    } catch (_) {}
    router.push(`${base}/${id}/application-pending`);
  };

  return (
    <>
      <div className={`${styles.threeCol} ${styles.repaymentCompact}`}>
        <div className={styles.repaymentCard}>
          <div className={styles.repaymentCardTitle}>Quality Parameters and Grading</div>
          <Row k="Moisture %" v={20} />
          <Row k="Test weight" v="kg" />
          <Row k="Protein %" v={10} />
          <Row k="Broken kernels %" v={2} />
          <Row k="Grade" v="B" />
        </div>

        <div className={styles.repaymentCard}>
          <div className={styles.repaymentCardTitle}>Harvest & Sale Status</div>
          <Row k="Crop Harvested" v="Yes" />
          <Row k="Quantity Produced" v="990 Maund" />
          <Row k="Sold Via" v="e-Auction" />
          <div className={styles.repaymentRow}>
            <div className={styles.repaymentLabel}>Sale Status</div>
            <div className={styles.repaymentValue}>
              <span 
                className={styles.statusButton}
                onClick={handleApplicationPendingClick}
                style={{ cursor: 'pointer' }}
              >
                Application Pending
              </span>
            </div>
          </div>
          <Row k="Sale Amount" v="NA" />
        </div>

        <div className={styles.repaymentCard}>
          <div className={styles.repaymentCardTitle}>Repayment Tracker</div>
          <Row k="Amount to be Repaid" v="1,500,000" />
          <Row k="Payment Due" v="1,500,000" />
          <Row k="Paid" v="--" />
        </div>
      </div>

      <div className={`${styles.footerBar} ${styles.repaymentCompact}`}>
        <div />
        <div className={styles.footerActions}>
          <Button variant="outline" onClick={() => alert("Report generated")}>Generate Report</Button>
          <Button className={styles.primaryBtn} onClick={() => alert("Marked as completed")}>Mark as Completed</Button>
        </div>
      </div>
    </>
  );
}
