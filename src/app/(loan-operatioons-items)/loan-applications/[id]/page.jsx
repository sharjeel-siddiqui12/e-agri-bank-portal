"use client";

import { useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button-loan";
import { Card } from "@/components/ui/card"; // if you don’t have shadcn Card, swap with a div
import { Eye, Download, MapPin, ShieldCheck, ChevronRight } from "lucide-react";
import styles from "./LoanDetail.module.css";

import StepProgress from "@/components/loan-detail/StepProgress";
import SummaryHeader from "@/components/loan-detail/SummaryHeader";
import KYCTab from "@/components/loan-detail/tabs/KycTab";
import AdvisoryTab from "@/components/loan-detail/tabs/AdvisoryTab";
import RiskProfilingTab from "@/components/loan-detail/tabs/RiskProfilingTab";
import ApprovalTab from "@/components/loan-detail/tabs/ApprovalTab";
import MonitoringTab from "@/components/loan-detail/tabs/MonitoringTab";
import RepaymentTab from "@/components/loan-detail/tabs/RepaymentTab";

/* ---------- demo record (stable + matches table data shape) ---------- */
const REGIONS = [
  { main: "Okara", sub: "Dipalp ur" },
  { main: "Okara", sub: "Renala Khurd" },
  { main: "Lahore", sub: "Model Town" },
  { main: "Sahiwal", sub: "Harappa" },
  { main: "Multan", sub: "Shujabad" },
];
const NAMES = [
  "Muneeb Ahmed",
  "Ali Raza",
  "Ahmed Khan",
  "Hassan Javed",
  "Bilal Aslam",
  "Sana Ullah",
  "Usman Tariq",
  "Hammad Iqbal",
  "Zain Shah",
  "Fahad Mehmood",
];
const LOAN_TYPES = ["Agri - Production Loan", "Agri - Input Loan"];
const formatAmount = (n) => n.toLocaleString("en-US");

function getMockById(id) {
  // deterministic-ish record based on the numeric id
  const n = Number(id.replace(/^0+/, "")) || 1;
  const name = NAMES[n % NAMES.length] || NAMES[0];
  const region = REGIONS[n % REGIONS.length] || REGIONS[0];
  const type = LOAN_TYPES[n % LOAN_TYPES.length];
  const amount = [1500000, 300000, 500000, 1250000][n % 4];
  return {
    id,
    name,
    province: "Punjab",
    tehsil: `${region.main}, ${region.sub || "Dipalp ur"}`,
    type,
    landZones: 4,
    waterSource: "Tubewell",
    landSize: "12.5 Acers",
    crop: "Maize",
    amount,
    region,
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

export default function LoanRequestDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const rec = useMemo(() => getMockById(id), [id]);

  const [active, setActive] = useState("0"); // Tabs value "0".."5"

  // simple step advance helpers (all buttons are functional)
  const goto = (idx) => setActive(String(idx));
  const next = () => setActive((v) => String(Math.min(5, Number(v) + 1)));
  const backToList = () => router.push("/loan-requests");

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <h1 className={styles.title}>
            Loan Application ID: <span className={styles.mono}>#{rec.id}</span>
          </h1>

          <div className={styles.headerActions}>
            <Button variant="outline" onClick={() => window.print()}>
              <Download size={16} /> Export / Print
            </Button>
            <Button variant="outline" onClick={backToList}>
              Back to list
            </Button>
          </div>
        </div>

        {/* summary header grid */}
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

        {/* stepper */}
        <StepProgress
          steps={STEPS}
          activeIndex={Number(active)}
          onStepClick={(i) => goto(i)}
        />

        {/* tabs */}
        <Tabs
          value={active}
          onValueChange={setActive}
          className={styles.tabsRoot}
        >
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
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    rec.region.main
                  )}`,
                  "_blank"
                )
              }
              onProceed={() => goto(1)}
              onReject={() => {
                if (confirm("Reject this application?")) backToList();
              }}
            />
          </TabsContent>

          {/* <TabsContent value="1" className={styles.tabContent}>
            <AdvisoryTab onProceed={() => goto(2)} />
          </TabsContent> */}
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
            <RepaymentTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
