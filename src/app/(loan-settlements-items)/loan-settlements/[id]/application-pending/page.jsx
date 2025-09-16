"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button-loan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "@/app/(loan-operatioons-items)/loan-approvals/[id]/application-pending/ApplicationPending.module.css";

const InfoRow = ({ label, value, className = "" }) => (
  <div className={`${styles.infoRow} ${className}`}>
    <div className={styles.infoLabel}>{label}</div>
    <div className={styles.infoValue}>{value}</div>
  </div>
);

export default function ApplicationPendingPage() {
  const router = useRouter();
  const { id } = useParams();
  const [rowData, setRowData] = useState(null);

  const REGIONS = [
    { main: "Rawalpindi", sub: "Gujar Khan" },
    { main: "Rawalpindi", sub: "Kahuta" },
    { main: "Bahawalpur", sub: "Hasilpur" },
    { main: "Lahore", sub: "Model Town" },
    { main: "Faisalabad", sub: "Jaranwala" },
  ];
  const NAMES = [
    "Nazir Hussain",
    "Fida Hussain",
    "Hafiz Abdul Ghaffar",
    "Sultan Ahmed",
    "Sher Ali",
    "Barkat Ali",
    "Niaz Ahmed",
    "Manzoor Hussain",
    "Ghulam Rasool",
    "Bilal Aslam",
  ];
  const LOAN_TYPES = ["Crop Loan", "Agri - Production Loan"];
  const formatAmount = (n) => (typeof n === "number" ? n.toLocaleString("en-US") : n);

  function getMockById(idStr) {
    const n = Number(String(idStr).replace(/^0+/, "")) || 1;
    const name = NAMES[n % NAMES.length] || NAMES[0];
    const region = REGIONS[n % REGIONS.length] || REGIONS[0];
    const type = LOAN_TYPES[n % LOAN_TYPES.length];
    const amount = [1500000, 300000, 500000, 1250000][n % 4];
    return {
      id: idStr,
      name,
      region,
      type,
      amount,
      province: "Punjab",
      tehsil: `${region.main}, ${region.sub || "Jaranwala"}`,
      crop: "Wheat",
    };
  }

  function buildRecordFromRow(idStr, row) {
    if (!row) return null;
    const region = row.region || { main: "Rawalpindi", sub: "Gujar Khan" };
    return {
      id: row.id || idStr,
      name: row.name,
      region,
      type: row.loanType,
      amount: typeof row.amount === "number" ? row.amount : undefined,
      province: "Punjab",
      tehsil: `${region.main}${region.sub ? ", " + region.sub : ""}`,
      crop: undefined,
      status: row.status,
      date: row.date,
      time: row.time,
    };
  }

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage && id) {
        const raw = window.sessionStorage.getItem(`loan-settlements:row:${id}`);
        if (raw) setRowData(JSON.parse(raw));
      }
    } catch (_) {}
  }, [id]);

  const rec = useMemo(() => {
    const base = getMockById(id);
    const fromRow = buildRecordFromRow(id, rowData);
    if (!fromRow) return base;
    return {
      ...base,
      id: fromRow.id || base.id,
      name: fromRow.name || base.name,
      region: fromRow.region || base.region,
      type: fromRow.type || base.type,
      amount: fromRow.amount ?? base.amount,
      province: fromRow.province || base.province,
      tehsil: fromRow.tehsil || base.tehsil,
      crop: base.crop,
      status: fromRow.status || base.status,
      date: fromRow.date || base.date,
      time: fromRow.time || base.time,
    };
  }, [id, rowData]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.pageTitle}>Loan Application ID: #{rec.id}</h1>
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
              <div className={styles.summaryValue}>{rec.name}</div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Type of Loan</div>
              <div className={styles.summaryValue}>{rec.type}</div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Loan Amount</div>
              <div className={styles.summaryValue}>{formatAmount(rec.amount)} PKR</div>
            </div>
            <div className={styles.summaryItem}>
              <div className={styles.summaryLabel}>Ammount Due</div>
              <div className={styles.summaryValue}>{formatAmount(Math.round((rec.amount || 0) * 1.302))}</div>
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
                <InfoRow label="Crop" value={rec.crop || "Wheat"} />
                <InfoRow label="Crop Stage" value="Stored" />
                <InfoRow label="Crop Location" value="Warehouse" />
                <InfoRow
                  label="Warehouse Address"
                  value={`${rec.region.main}, ${rec.region.sub || "Jaranwala"} in ${rec.tehsil} Tehsil.`}
                />
                <InfoRow label="Province" value={rec.province} />
                <InfoRow label="Teshsil/District" value={rec.tehsil} />
                <InfoRow
                  label="Market Committee Name"
                  value="The Market Committee, Rawalpindi"
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
                <InfoRow label="Commodity" value="Wheat" />
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
            <Button className={styles.primaryBtn} onClick={() => alert("Marked as completed")}>
              Mark as Completed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


