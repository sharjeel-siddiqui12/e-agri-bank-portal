"use client";

import { Button } from "@/components/ui/button-loan";
import styles from "@/app/(loan-operations-items)/loan-requests/[id]/LoanDetail.module.css";
import { Eye } from "lucide-react";

export default function KYCTab({ region, onViewMap, onProceed, onReject }) {
  return (
    <>
      <div className={`${styles.twoCol} ${styles.kycCompact}`}>
        {/* left */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Farmer Profile Snapshot</div>
          <div className={styles.profileSnapshotGrid}>
            <div className={styles.profileLabel}>Full Name:</div>
            <div className={styles.profileValue}>Muneeb Ahmed</div>

            <div className={styles.profileLabel}>CNIC front:</div>
            <div className={styles.profileValue}>
              <img src="/cnic-front.png" alt="cnic-front" className={styles.docImg} />
            </div>

            <div className={styles.profileLabel}>CNIC front:</div>
            <div className={styles.profileValue}>
              <img src="/cnic-back.png" alt="cnic-back" className={styles.docImg} />
            </div>

            <div className={styles.profileLabel}>Age:</div>
            <div className={styles.profileValue}>46</div>

            <div className={styles.profileLabel}>Gender:</div>
            <div className={styles.profileValue}>Male</div>

            <div className={styles.profileLabel}>Phone Number:</div>
            <div className={styles.profileValue}>+92 312 3456789</div>

            <div className={styles.profileLabel}>Location:</div>
            <div className={styles.profileValue}>{region.main}, {region.sub || "—"}</div>
          </div>
        </div>

        {/* right */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Land Verification Panel</div>

          <div className={styles.kvRow}>
            <div className={styles.kvLabelSm}>Location:</div>
            <div className={styles.kvValueRight}>Karachi Central</div>
          </div>

          <div className={styles.kvRow} style={{ marginTop: 6 }}>
            <div className={styles.kvLabelSm}>Ownership Documents:</div>
            <div className={styles.ownershipBox}>
              <span>Land ownership documents</span>
              <Eye size={18} />
            </div>
          </div>

          <div className={styles.kvRow} style={{ marginTop: 12 }}>
            <div className={styles.kvLabelSm}>Marked Land:</div>
          </div>

          <div className={styles.mapShot}>
            <img src="/placeholder-farm.png" alt="marked-land" />
          </div>

          <div className={styles.mapActions}>
            <Button className={`${styles.primaryBtn} ${styles.mapButton}`} onClick={onViewMap}>
              View on Google Map
            </Button>
            {/* <Button variant="outline" onClick={() => alert("Download KML")}>
              Download KML
            </Button> */}
          </div>
        </div>
      </div>

      <div className={`${styles.footerBar} ${styles.kycCompact}`}>
        <Button variant="outline" onClick={() => alert("Update Details form")}>
          Update Details
        </Button>

        <div className={styles.footerActions}>
          <Button variant="outline" onClick={onReject}>
            Reject Application
          </Button>
          <Button className={styles.primaryBtn} onClick={onProceed}>
            Proceed to Advisory Analysis
          </Button>
        </div>
      </div>
    </>
  );
}
