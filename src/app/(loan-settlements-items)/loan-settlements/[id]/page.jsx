"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button-loan";
import styles from "@/app/(loan-operations-items)/loan-requests/[id]/LoanDetail.module.css"; 

import StepProgress from "@/components/loan-detail/StepProgress";
import SummaryHeader from "@/components/loan-detail/SummaryHeader";
import KYCTab from "@/components/loan-detail/tabs/KycTab";
import AdvisoryTab from "@/components/loan-detail/tabs/AdvisoryTab";
import RiskProfilingTab from "@/components/loan-detail/tabs/RiskProfilingTab";
import ApprovalTab from "@/components/loan-detail/tabs/ApprovalTab";
import MonitoringTab from "@/components/loan-detail/tabs/MonitoringTab";
import RepaymentTab from "@/components/loan-detail/tabs/RepaymentTab";

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
const formatAmount = (n) => n.toLocaleString("en-US");

function getMockById(id) {
  const n = Number(String(id).replace(/^0+/, "")) || 1;
  const name = NAMES[n % NAMES.length] || NAMES[0];
  const region = REGIONS[n % REGIONS.length] || REGIONS[0];
  const type = LOAN_TYPES[n % LOAN_TYPES.length];
  const amount = [1500000, 300000, 500000, 1250000][n % 4];
  return {
    id,
    name,
    province: "Punjab",
    tehsil: `${region.main}, ${region.sub || "Jaranwala"}`,
    type,
    landZones: 4,
    waterSource: "Canal",
    landSize: "10.0 Acers",
    crop: "Wheat",
    amount,
    region,
  };
}

function buildRecordFromRow(id, row) {
  if (!row) return null;
  const region = row.region || { main: "Rawalpindi", sub: "Gujar Khan" };
  return {
    id: row.id || id,
    name: row.name || undefined,
    amount: typeof row.amount === "number" ? row.amount : undefined,
    region,
    province: "Punjab",
    tehsil: `${region.main}${region.sub ? ", " + region.sub : ""}`,
    type: row.loanType || undefined,
    landZones: undefined,
    waterSource: undefined,
    landSize: undefined,
    crop: undefined,
    status: row.status,
    date: row.date,
    time: row.time,
  };
}

const STEPS = [
  "KYC & Identity Verification",
  "Loan Application + Advisory Analysis",
  "Risk Profiling",
  "Approval & Disbursement",
  "Loan Monitoring",
  "Repayment & Settlement",
];

export default function LoanSettlementDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [rowData, setRowData] = useState(null);

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
      amount: fromRow.amount ?? base.amount,
      region: fromRow.region || base.region,
      province: fromRow.province || base.province,
      tehsil: fromRow.tehsil || base.tehsil,
      type: fromRow.type || base.type,
      landZones: base.landZones,
      waterSource: base.waterSource,
      landSize: base.landSize,
      crop: base.crop,
      status: fromRow.status || base.status,
      date: fromRow.date || base.date,
      time: fromRow.time || base.time,
    };
  }, [id, rowData]);

  const [active, setActive] = useState("0");
  const goto = (idx) => setActive(String(idx));
  const backToList = () => router.push("/loan-settlements");

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <h1 className={styles.title}>
            Loan Application ID: <span className={styles.mono}>#{rec.id}</span>
          </h1>

          <div className={styles.headerActions}>
            <Button variant="outline" onClick={() => window.print()}>Export / Print</Button>
            <Button variant="outline" onClick={backToList}>Back to list</Button>
          </div>
        </div>

        <SummaryHeader
          items={[
            { label: "Full Name:", value: rec.name },
            { label: "Province:", value: rec.province },
            { label: "Tehsil/District:", value: rec.tehsil },
            { label: "Type of Loan:", value: rec.type },
            { label: "Land size:", value: rec.landSize },
            { label: "Land Ownership Status:", value: "Owner" },
            { label: "Land Zones:", value: rec.landZones },
            { label: "Water Source", value: rec.waterSource },
            { label: "Amount:", value: `${formatAmount(rec.amount)} PKR` },
            { label: "Crop", value: rec.crop },
          ]}
        />

        <StepProgress
          steps={STEPS}
          activeIndex={Number(active)}
          onStepClick={(i) => goto(i)}
        />

        <Tabs value={active} onValueChange={setActive} className={styles.tabsRoot}>
          <TabsList className={styles.hiddenTabsList}>
            {STEPS.map((_, i) => (
              <TabsTrigger key={i} value={String(i)} />
            ))}
          </TabsList>

          <TabsContent value="0" className={styles.tabContent}>
            <KYCTab
              region={rec.region}
              onViewMap={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rec.region.main)}`,
                  "_blank"
                )
              }
              onProceed={() => goto(1)}
              onReject={() => {
                if (confirm("Reject this application?")) backToList();
              }}
            />
          </TabsContent>

          <TabsContent value="1" className={styles.tabContent}>
            <AdvisoryTab
              onProceed={() => goto(2)}
              amount={`${formatAmount(rec.amount)} PKR`}
              landSize={rec.landSize}
              crop={rec.crop}
            />
          </TabsContent>

          <TabsContent value="2" className={styles.tabContent}>
            <RiskProfilingTab onReject={() => goto(0)} onProceed={() => goto(3)} />
          </TabsContent>

          <TabsContent value="3" className={styles.tabContent}>
            <ApprovalTab onSend={() => goto(4)} />
          </TabsContent>

          <TabsContent value="4" className={styles.tabContent}>
            <MonitoringTab />
          </TabsContent>

          <TabsContent value="5" className={styles.tabContent}>
            <RepaymentTab recordId={rec.id} section="loan-settlements" rowDataForPending={{
              id: rec.id,
              name: rec.name,
              amount: rec.amount,
              region: rec.region,
              loanType: rec.type,
              status: "Application Pending",
              date: rec.date,
              time: rec.time,
            }} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


