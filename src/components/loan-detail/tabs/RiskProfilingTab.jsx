"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button-loan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import styles from "@/app/(loan-operatioons-items)/loan-requests/[id]/LoanDetail.module.css";

const TableRow = ({ label, score, min=0, max=10, weight="7.50", obtained="7.50" }) => (
  <div className={styles.riskTableRow}>
    <div className={styles.riskTableLabel}>{label}</div>
    <div className={styles.riskTableScore}>{score}</div>
    <div className={styles.riskTableMin}>{min}</div>
    <div className={styles.riskTableMax}>{max}</div>
    <div className={styles.riskTableWeight}>{weight}</div>
    <div className={styles.riskTableObtained}>{obtained}</div>
  </div>
);

function MetricCard({ title, status, items }) {
  return (
    <Card className={styles.riskMetricCard}>
      <CardHeader className={styles.riskMetricHeader}>
        <div className={styles.riskMetricTitle}>{title}</div>
        <span className={styles.riskStatusPill}>{status}</span>
      </CardHeader>
      <CardContent className={styles.riskMetricContent}>
        {items.map(([k, v]) => (
          <div className={styles.riskMetricRow} key={k}>
            <div className={styles.riskMetricLabel}>{k}</div>
            <div className={styles.riskMetricValue}>{v}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function RiskProfilingTab({ onReject, onProceed }) {
  const [underwriterRequired, setUnderwriterRequired] = useState("No");

  return (
    <>
      {/* Header Section */}
      <div className={styles.riskHeader}>
        <h2 className={styles.riskTitle}>Risk Profiling</h2>
        <div className={styles.riskTotalScore}>Total Score: <strong>89.25%</strong></div>
      </div>

      {/* Main Content */}
      <div className={styles.riskMainContent}>
        {/* Left Column - Risk Assessment Tables */}
        <div className={styles.riskLeftColumn}>
          {/* KYC Section */}
          <Card className={styles.riskSectionCard}>
            <CardHeader className={styles.riskSectionHeader}>
              <div className={styles.riskSectionTitle}>
                KYC <span className={styles.riskWeightText}>(weight 45%)</span>
              </div>
              <div className={styles.riskSectionScore}>
                <span className={styles.riskScoreText}>(KYC Score 34.25%)</span>
              </div>
            </CardHeader>
            <CardContent className={styles.riskTableContent}>
              <div className={styles.riskTableHeader}>
                <div className={styles.riskTableHeaderLabel}>Score</div>
                <div className={styles.riskTableHeaderMin}>Min</div>
                <div className={styles.riskTableHeaderMax}>Max</div>
                <div className={styles.riskTableHeaderWeight}>Weight%</div>
                <div className={styles.riskTableHeaderObtained}>Obtained%</div>
              </div>
              <TableRow label="Age" score={2.5} min={0} max={5} weight="3.00" obtained="1.50" />
              <TableRow label="Geography" score={5} min={2.5} max={10} weight="4.50" obtained="2.25" />
              <TableRow label="Years of Education" score={5} min={0} max={10} weight="3.00" obtained="1.50" />
              <TableRow label="Relevant Experience" score={10} min={0} max={10} weight="7.50" obtained="7.50" />
              <TableRow label="Residence/Other land" score={5} min={2.5} max={10} weight="4.50" obtained="2.25" />
              <TableRow label="Adult Household Members" score={2} min={1} max={4} weight="3.00" obtained="1.50" />
              <TableRow label="Type of Water Source" score={2} min={0} max={4} weight="3.00" obtained="1.50" />
              <TableRow label="Proof of Tenancy" score={10} min={2.50} max={10} weight="7.50" obtained="7.50" />
              <TableRow label="Tenancy History with Current Land Owner" score={5} min={1} max={5} weight="4.50" obtained="4.50" />
              <TableRow label="Tenor of Tenancy Agreement" score={4} min={1} max={5} weight="4.50" obtained="4.50" />
              <div className={styles.riskTableFooter}>
                <div className={styles.riskTableFooterLabel}>Total KYC Average Score</div>
                <div className={styles.riskTableFooterValue}>45.00</div>
                <div className={styles.riskTableFooterValue}>34.25</div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Section */}
          <Card className={styles.riskSectionCard}>
            <CardHeader className={styles.riskSectionHeader}>
              <div className={styles.riskSectionTitle}>
                Financial <span className={styles.riskWeightText}>(weight 15%)</span>
              </div>
              <div className={styles.riskSectionScore}>
                <span className={styles.riskScoreText}>(Financial Score 15.00%)</span>
              </div>
            </CardHeader>
            <CardContent className={styles.riskTableContent}>
              <div className={styles.riskTableHeader}>
                <div className={styles.riskTableHeaderLabel}>Score</div>
                <div className={styles.riskTableHeaderMin}>Min</div>
                <div className={styles.riskTableHeaderMax}>Max</div>
                <div className={styles.riskTableHeaderWeight}>Weight%</div>
                <div className={styles.riskTableHeaderObtained}>Obtained%</div>
              </div>
              <TableRow label="Debt-Burden Ratio (DBR)" score={7} min={0} max={7} weight="7.50" obtained="7.50" />
              <TableRow label="ECIB / Data Check" score={5} min={0} max={10} weight="7.50" obtained="7.50" />
              <div className={styles.riskTableFooter}>
                <div className={styles.riskTableFooterLabel}>Total Financial Average Score</div>
                <div className={styles.riskTableFooterValue}>15.00</div>
                <div className={styles.riskTableFooterValue}>15.00</div>
              </div>
            </CardContent>
          </Card>

          {/* Agronomy Section */}
          <Card className={styles.riskSectionCard}>
            <CardHeader className={styles.riskSectionHeader}>
              <div className={styles.riskSectionTitle}>
                Agronomy <span className={styles.riskWeightText}>(weight 40%)</span>
              </div>
              <div className={styles.riskSectionScore}>
                <span className={styles.riskScoreText}>(Agronomy Score 40.00%)</span>
              </div>
            </CardHeader>
            <CardContent className={styles.riskTableContent}>
              <div className={styles.riskTableHeader}>
                <div className={styles.riskTableHeaderLabel}>Score</div>
                <div className={styles.riskTableHeaderMin}>Min</div>
                <div className={styles.riskTableHeaderMax}>Max</div>
                <div className={styles.riskTableHeaderWeight}>Weight%</div>
                <div className={styles.riskTableHeaderObtained}>Obtained%</div>
              </div>
              <TableRow label="Productivity / Crop Yield Index" score={100} min={0} max={100} weight="20" obtained="7.50" />
              <TableRow label="Crop Health" score={100} min={0} max={100} weight="5.00" obtained="7.50" />
              <TableRow label="Climate" score={100} min={0} max={100} weight="10.00" obtained="7.50" />
              <TableRow label="Irrigation" score={100} min={0} max={100} weight="5.00" obtained="7.50" />
              <div className={styles.riskTableFooter}>
                <div className={styles.riskTableFooterLabel}>Total Agronomy Average Score</div>
                <div className={styles.riskTableFooterValue}>40.00</div>
                <div className={styles.riskTableFooterValue}>40.00</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Index Cards */}
        <div className={styles.riskRightColumn}>
          <MetricCard
            title="Crop Loss Index"
            status="Normal"
            items={[
              ["Historical Loss Events", "0 in past 3 years"],
              ["Most Recent Loss", "Maize - Aug 2021"],
              ["Yield Variability", "9% Fluctuation year-to-year"],
            ]}
          />
          <MetricCard
            title="Disaster Index"
            status="No Risk"
            items={[
              ["Index Value", "0.01"],
              ["Recent Disaster", "Flood - Jul 2012"],
              ["Disaster Frequency", "0 in last 5 years"],
              ["Zone", "No-flood zone"],
            ]}
          />
          <MetricCard
            title="Insurance Index"
            status="Full"
            items={[
              ["Insurance Coverage", "Crop Loan"],
              ["Provider", "State Agri Insurance"],
              ["Coverage Limit", "3,192,000 PKR"],
              ["Settled Insurance of provider", "78%"],
            ]}
          />
        </div>
      </div>

      {/* Underwriter Engagement Section */}
      <Card className={styles.underwriterCard}>
        <CardHeader>
          <CardTitle className={styles.underwriterTitle}>Underwriter Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.underwriterQuestion}>Is Underwriter Required for the loan?</div>
          <RadioGroup 
            value={underwriterRequired} 
            onValueChange={setUnderwriterRequired}
            className={styles.underwriterRadioGroup}
          >
            <div className={styles.radioOption}>
              <RadioGroupItem value="Yes" id="yes" />
              <Label htmlFor="yes" className={styles.radioLabel}>Yes</Label>
            </div>
            <div className={styles.radioOption}>
              <RadioGroupItem value="No" id="no" />
              <Label htmlFor="no" className={styles.radioLabel}>No</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <div className={`${styles.footerBar} ${styles.riskCompact}`}>
        <Button variant="outline" onClick={() => alert("Update Details form")}>
          Update Details
        </Button>
        <div className={styles.footerActions}>
          <Button variant="outline" onClick={onReject}>
            Reject Application
          </Button>
          <Button className={styles.primaryBtn} onClick={onProceed}>
            Proceed to Approval
          </Button>
        </div>
      </div>
    </>
  );
}
