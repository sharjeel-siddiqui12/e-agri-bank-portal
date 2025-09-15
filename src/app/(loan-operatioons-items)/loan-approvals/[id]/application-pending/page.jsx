"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button-loan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./ApplicationPending.module.css";

const InfoRow = ({ label, value, className = "" }) => (
  <div className={`${styles.infoRow} ${className}`}>
    <div className={styles.infoLabel}>{label}</div>
    <div className={styles.infoValue}>{value}</div>
  </div>
);

export default function ApplicationPendingPage() {
  const router = useRouter();
  const { id } = useParams();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.pageTitle}>Loan Application ID: #{id}</h1>
            <Button
              variant="outline"
              onClick={handleBack}
              className={styles.backBtn}
            >
              ← Back
            </Button>
          </div>

          {/* Applicant Summary Strip */}
          <div className={styles.summaryStrip}>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Full Name</div>
              <div className={styles.summaryValue}>Muneeb Ahmed</div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Type of Loan</div>
              <div className={styles.summaryValue}>Agri - Production Loan</div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Loan Amount</div>
              <div className={styles.summaryValue}>1,250,000 PKR</div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Ammount Due</div>
              <div className={styles.summaryValue}>1,627,500</div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Lein</div>
              <div className={styles.summaryValue}>Crop Pledged</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Crop and Market Committee Card */}
            <Card className={styles.infoCard}>
              <CardHeader>
                <CardTitle className={styles.cardTitle}>
                  Crop and Market Committee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow label="Crop" value="Maize" />
                <InfoRow label="Crop Stage" value="Stored" />
                <InfoRow label="Crop Location" value="Warehouse" />
                <InfoRow
                  label="Warehouse Address"
                  value="Okara, Dipalpur in Depalpur Tehsil."
                />
                <InfoRow label="Province" value="Punjab" />
                <InfoRow label="Teshsil/District" value="Okara, Dipalpur" />
                <InfoRow
                  label="Market Committee Name"
                  value="The Market Committee, Okara"
                />
                <InfoRow label="Dispute Handling" value="Market Committee" />
              </CardContent>
            </Card>

            {/* Quality Parameters and Grading Card */}
            <Card className={styles.infoCard}>
              <CardHeader>
                <CardTitle className={styles.cardTitle}>
                  Quality Parameters and Grading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow label="Calculated Grade" value="B" />
                <InfoRow label="Moisture %" value="20" />
                <InfoRow label="Test weight" value="kg" />
                <InfoRow label="Protein %" value="10" />
                <InfoRow label="Broken kernels %" value="2" />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Auction Parameters Card */}
            <Card className={styles.infoCard}>
              <CardHeader>
                <CardTitle className={styles.cardTitle}>
                  Auction Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InfoRow label="Commodity" value="Maize" />
                <InfoRow label="Auction Type" value="Forward" />
                <InfoRow label="Style" value="English (ascending)" />
                <InfoRow label="Filling Method" value="Full Lot" />
                <InfoRow label="Clearing Price" value="Highest Bid" />
                <InfoRow
                  label="Reserve Price"
                  value="3,400 PKR/Maund (hidden)"
                />
                <InfoRow label="Allocation Rule" value="FIFO" />
                <InfoRow label="Tick Size" value="10" />
                <InfoRow
                  label="Bid Visibility"
                  value="Semi-transparent (highest bid shown)"
                />
                <InfoRow
                  label="Auction Start and End Time"
                  value="8 Dec, 2025 10:00 - 9 Dec, 2025 12:00"
                />
                <InfoRow
                  label="Time Extension on the last bid"
                  value="+5 min extension"
                />
                <InfoRow label="Number of Extensions allowed" value="3 Times" />
                <InfoRow label="Lot Quantity MT" value="34 MT" />
                <InfoRow label="Participation Deposit" value="20%" />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className={`${styles.footerBar} ${styles.repaymentCompact}`}>
          <div />
          <div className={styles.footerActions}>
            <Button variant="outline" onClick={() => alert("Report generated")}>
              Generate Report
            </Button>
            <Button
              className={styles.primaryBtn}
              onClick={() => alert("Marked as completed")}
            >
              Mark as Completed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
