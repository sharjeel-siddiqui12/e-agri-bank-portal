"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button-loan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styles from "@/app/(loan-operations-items)/loan-approvals/[id]/application-pending/ApplicationPending.module.css";
import detailStyles from "@/app/(loan-operations-items)/loan-requests/[id]/LoanDetail.module.css";

const InfoRow = ({ label, value, className = "" }) => (
  <div className={`${styles.infoRow} ${className}`}>
    <div className={styles.infoLabel}>{label}</div>
    <div className={styles.infoValue}>{value}</div>
  </div>
);

export default function AuctionRequestDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [rowData, setRowData] = useState(null);
  const [showReject, setShowReject] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [reason, setReason] = useState("Low Sale Price");

  const REGIONS = [
    { main: "Bahawalpur", sub: "Yazman" },
    { main: "Bahawalpur", sub: "Khairpur Tamewali" },
    { main: "Bahawalnagar", sub: "Fort Abbas" },
    { main: "Rahim Yar Khan", sub: "Sadiqabad" },
    { main: "Lodhran", sub: "Kahror Pakka" },
  ];
  const NAMES = [
    "Muhammad Rafiq",
    "Aslam Khan",
    "Iqbal Shah",
    "Nadeem Akhtar",
    "Kashif Mehmood",
    "Shahid Nawaz",
    "Sajjad Hussain",
    "Tariq Mahmood",
    "Zeeshan Ali",
    "Arif Khan",
  ];
  const LOAN_TYPES = ["Crop Loan", "Agri - Production Loan"];
  const formatAmount = (n) => (typeof n === "number" ? n.toLocaleString("en-US") : n);

  function getMockById(idStr) {
    const n = Number(String(idStr).replace(/^0+/, "")) || 1;
    const name = NAMES[n % NAMES.length] || NAMES[0];
    const region = REGIONS[n % REGIONS.length] || REGIONS[0];
    const type = LOAN_TYPES[n % LOAN_TYPES.length];
    const amount = [1250000, 300000, 500000, 1500000][n % 4];
    return {
      id: idStr,
      name,
      region,
      type,
      amount,
      province: "Punjab",
      tehsil: `${region.main}, ${region.sub || "Yazman"}`,
      crop: "Maize",
      loanContractId: `LC-25-${String(n).padStart(4, "0")}`,
      auctionId: `2025-${String(n).padStart(4, "0")}`,
    };
  }

  function buildRecordFromRow(idStr, row) {
    if (!row) return null;
    const region = row.region || { main: "Bahawalpur", sub: "Yazman" };
    return {
      id: row.id || idStr,
      name: row.name,
      region,
      type: row.loanType,
      amount: typeof row.amount === "number" ? row.amount : undefined,
      province: "Punjab",
      tehsil: `${region.main}${region.sub ? ", " + region.sub : ""}`,
      crop: undefined,
      loanContractId: row.loanContractId,
      auctionId: row.auctionId,
      kyc: row.kyc,
      date: row.date,
      time: row.time,
    };
  }

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage && id) {
        const raw = window.sessionStorage.getItem(`auction-requests-approval:row:${id}`);
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
      loanContractId: fromRow.loanContractId || base.loanContractId,
      auctionId: fromRow.auctionId || base.auctionId,
      kyc: fromRow.kyc || base.kyc,
      date: fromRow.date || base.date,
      time: fromRow.time || base.time,
    };
  }, [id, rowData]);

  const handleBack = () => router.push("/auction-requests-approval");

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.pageTitle}>Loan Application ID: #{rec.id}</h1>
            <Button variant="outline" onClick={handleBack} className={styles.backBtn}>← Back</Button>
          </div>

          <div className={styles.summaryStrip}>
            <div className={styles.summaryItem}><div className={styles.summaryLabel}>Full Name</div><div className={styles.summaryValue}>{rec.name}</div></div>
            <div className={styles.summaryItem}><div className={styles.summaryLabel}>Type of Loan</div><div className={styles.summaryValue}>{rec.type}</div></div>
            <div className={styles.summaryItem}><div className={styles.summaryLabel}>Loan Amount</div><div className={styles.summaryValue}>{formatAmount(rec.amount)} PKR</div></div>
            <div className={styles.summaryItem}><div className={styles.summaryLabel}>Amount Due</div><div className={styles.summaryValue}>{formatAmount(Math.round((rec.amount || 0) * 1.302))}</div></div>
            <div className={styles.summaryItem}><div className={styles.summaryLabel}>Lien</div><div className={styles.summaryValue}>Crop Pledged</div></div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <Card className={styles.infoCard}>
              <CardHeader><CardTitle className={styles.cardTitle}>Crop and Market Committee</CardTitle></CardHeader>
              <CardContent>
                <InfoRow label="Crop" value={rec.crop || "Maize"} />
                <InfoRow label="Crop Stage" value="Stored" />
                <InfoRow label="Crop Location" value="Warehouse" />
                <InfoRow label="Warehouse Address" value={`${rec.region.main}, ${rec.region.sub || "Yazman"} in ${rec.tehsil} Tehsil.`} />
                <InfoRow label="Province" value={rec.province} />
                <InfoRow label="Teshsil/District" value={rec.tehsil} />
                <InfoRow label="Market Committee Name" value="The Market Committee, Bahawalpur" />
                <InfoRow label="Dispute Handling" value="Market Committee" />
              </CardContent>
            </Card>

            <Card className={styles.infoCard}>
              <CardHeader><CardTitle className={styles.cardTitle}>Quality Parameters and Grading</CardTitle></CardHeader>
              <CardContent>
                <InfoRow label="Calculated Grade" value="B" />
                <InfoRow label="Moisture %" value="20" />
                <InfoRow label="Test weight" value="kg" />
                <InfoRow label="Protein %" value="10" />
                <InfoRow label="Broken kernels %" value="2" />
              </CardContent>
            </Card>
          </div>

          <div className={styles.rightColumn}>
            <Card className={styles.infoCard}>
              <CardHeader><CardTitle className={styles.cardTitle}>Auction Parameters</CardTitle></CardHeader>
              <CardContent>
                <InfoRow label="Commodity" value={rec.crop || "Maize"} />
                <InfoRow label="Auction Type" value="Forward" />
                <InfoRow label="Style" value="English (ascending)" />
                <InfoRow label="Filling Method" value="Full Lot" />
                <InfoRow label="Clearing Price" value="Highest Bid" />
                <InfoRow label="Reserve Price" value="3,400 PKR/Maund (hidden)" />
                <InfoRow label="Allocation Rule" value="FIFO" />
                <InfoRow label="Tick Size" value="10" />
                <InfoRow label="Bid Visibility" value="Semi-transparent (highest bid shown)" />
                <InfoRow label="Auction Start and End Time" value="8 Dec, 2025 10:00 - 9 Dec, 2025 12:00" />
                <InfoRow label="Time Extension on the last bid" value="+5 min extension" />
                <InfoRow label="Number of Extensions allowed" value="3 Times" />
                <InfoRow label="Lot Quantity MT" value="34 MT" />
                <InfoRow label="Participation Deposit" value="20%" />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className={styles.footerBar}>
          <div />
          <div className={styles.footerActions}>
            <Button variant="outline" className={styles.rejectBtn} onClick={() => setShowReject(true)}>Reject Request</Button>
            <Button className={styles.approveBtn} onClick={() => setShowApprove(true)}>Approve Request</Button>
          </div>
        </div>

        {showReject && (
          <div className={detailStyles.modalOverlay} onClick={() => setShowReject(false)}>
            <div className={detailStyles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={detailStyles.modalHeader}>
                <h3 className={detailStyles.modalTitle}>Suggest Edits</h3>
                <button className={detailStyles.modalCloseBtn} onClick={() => setShowReject(false)}>×</button>
              </div>
              <div className={detailStyles.modalBody}>
                <div className={detailStyles.modalFormGroup}>
                  <label className={detailStyles.modalLabel}>Reason for rejection</label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger className={detailStyles.modalSelect}>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent className="z-[1002]" style={{ zIndex: 1002 }}>
                      <SelectItem value="Low Sale Price">Low Sale Price</SelectItem>
                      <SelectItem value="Incorrect Quantity / Lot Size">Incorrect Quantity / Lot Size</SelectItem>
                      <SelectItem value="Reserve Price Too High">Reserve Price Too High</SelectItem>
                      <SelectItem value="Invalid Auction Timing">Invalid Auction Timing</SelectItem>
                      <SelectItem value="Insufficient Documentation">Insufficient Documentation</SelectItem>
                      <SelectItem value="Ambiguous Clearing Rules">Ambiguous Clearing Rules</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className={detailStyles.modalActions}>
                  <button className={detailStyles.modalCancelBtn} onClick={() => setShowReject(false)}>Cancel</button>
                  <button className={detailStyles.modalSubmitBtn} onClick={() => { alert(`Submitted: ${reason}`); setShowReject(false); }}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showApprove && (
          <div className={detailStyles.modalOverlay} onClick={() => setShowApprove(false)}>
            <div className={detailStyles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={detailStyles.modalHeader}>
                <h3 className={detailStyles.modalTitle}>Approve Request</h3>
                <button className={detailStyles.modalCloseBtn} onClick={() => setShowApprove(false)}>×</button>
              </div>
              <div className={detailStyles.modalBody}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <p style={{ fontSize: '16px', color: '#374151', lineHeight: '1.6' }}>
                    Are you sure you want to Approve this produce for auction?
                  </p>
                </div>

                <div className={detailStyles.modalActions}>
                  <button className={detailStyles.modalCancelBtn} onClick={() => setShowApprove(false)}>No</button>
                  <button className={detailStyles.modalSubmitBtn} onClick={() => { alert("Approved! Proceeding to Advisory Analysis"); setShowApprove(false); }}>Yes</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


