"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button-loan";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell, LabelList } from "recharts";
import styles from "@/app/(loan-operations-items)/loan-requests/[id]/LoanDetail.module.css";

// Demo soil data - this will come from backend
const soilData = {
  npkData: [
    { symbol: "P", label: "Phosphorus (P)", percentage: 75 },
    { symbol: "K", label: "Potassium (K)", percentage: 60 },
    { symbol: "N", label: "Nitrogen (N)", percentage: 85 }
  ],
  metrics: [
    {
      label: "Soil pH",
      value: "6.0 – 7.5",
      warning: null
    },
    {
      label: "Organic Matter (%)",
      value: "> 1.5%",
      warning: "Very low organic content. Add compost or green manure."
    },
    {
      label: "Electrical Conductivity (EC)",
      value: "< 1.0 dS/m",
      warning: "High salt levels. Avoid salt-sensitive crops like pulses."
    },
    {
      label: "Soil Texture",
      value: "Balanced Loam",
      warning: "Soil is sandy. Apply more organic matter to improve hold."
    }
  ]
};

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.pill} ${active ? styles.pillActive : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/* ------------------------- Views inside the pills ------------------------ */
function LandHistoryView() {
  // Data for vertical bar chart (values scaled to match $ image)
  const yieldData = [
    { year: "2024", value: 200 },
    { year: "2025", value: 300 },
    { year: "2026", value: 380, highlight: true },
  ];

  // Data for horizontal bar chart
  const cropData = [
    { crop: "Wheat", times: 5 },
    { crop: "Brinjal", times: 4 },
    { crop: "Maize", times: 2 },
    { crop: "Sugarcane", times: 1 },
  ];

  return (
    <div className={styles.twoCol}>
      <Card>
        <CardHeader>
          <CardTitle className={styles.cardTitleBlack}>3-year yield trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.chartRelative}>
            <ChartContainer
              config={{ value: { label: "USD", color: "#375515" } }}
              className={styles.chartSm}
            >
              <BarChart data={yieldData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid stroke="#eef1ea" vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: "#6b7280" }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 500]}
                  ticks={[0, 100, 200, 300, 400, 500]}
                  tickFormatter={(v) => `$${v}`}
                  tick={{ fill: "#6b7280" }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`$${value}`, "Yield"]}
                      labelFormatter={(label) => `Year: ${label}`}
                    />
                  }
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={65}>
                  {yieldData.map((d) => (
                    <Cell
                      key={d.year}
                      fill={d.highlight ? "#375515" : "#9bb58a"}
                      opacity={d.highlight ? 1 : 0.7}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
            <span className={styles.chartNoteTopRight}>
              28.7 KWh
            </span>
        </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className={styles.cardTitleBlack}>Previously sown crops</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{ times: { label: "Times", color: "#375515" } }}
            className={styles.chartSm}
          >
            <BarChart
              data={cropData}
              layout="vertical"
              margin={{ left: 20, right: 20, top: 10, bottom: 10 }}
              

            >
              <CartesianGrid stroke="#eef1ea" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 10]} tickLine={false} axisLine={false} tick={{ fill: "#6b7280" }} />
              <YAxis dataKey="crop" type="category" width={70} tickLine={false} axisLine={false} tick={{ fill: "#6b7280" }} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [value, "Times Sown"]}
                    labelFormatter={(label) => `Crop: ${label}`}
                  />
                }
              />
              <Bar dataKey="times" fill="#375515" radius={[0, 8, 8, 0]} barSize={70}>
                <LabelList dataKey="times" position="right" formatter={(v) => `${v} Times`} fill="#6b7280" />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function AreaAnalysisView() {
  // Demo weather data (replace with backend data as needed)
  const weather = {
    status: { label: "Good", className: `${styles.badge} ${styles.badgeOk}` },
    rows: [
      {
        label: "Rainfall Deviation",
        sub: "Based on past 3 months",
        value: "+5% vs normal",
        pillClass: `${styles.badgeSoft} ${styles.badgeInfo}`,
      },
      {
        label: "Temperature Trend",
        sub: "Avg highs/lows are normal",
        value: "Stable",
        pillClass: `${styles.badgeSoft} ${styles.badgeOk}`,
      },
      {
        label: "Extreme Events",
        sub: "e.g., heatwave, floods",
        value: "None",
        pillClass: `${styles.badgeSoft}`,
      },
      {
        label: "Forecast Risk Window (Next 60 days)",
        sub: "From 3rd-party agri forecast API",
        value: "Low Risk",
        pillClass: `${styles.badgeSoft} ${styles.badgeWarn}`,
      },
      {
        label: "Best Crop Suitability",
        sub: "Based on advisory DB",
        value: "Maize",
        pillClass: `${styles.badgeSoft} ${styles.badgeOk}`,
      },
    ],
  };
  return (
    <div className={styles.twoCol}>
      <div className={styles.card}>
        <div className={styles.cardTitleRow}>
          <div className={styles.cardTitle}>Weather Pattern</div>
          <span className={weather.status.className}>{weather.status.label}</span>
        </div>
        <div className={styles.weatherList}>
          {weather.rows.map((row) => (
            <div className={styles.weatherRow} key={row.label}>
              <div className={styles.weatherLabelBlock}>
                <div className={styles.weatherLabel}>{row.label}</div>
                <div className={styles.weatherSub}>{row.sub}</div>
              </div>
              <span className={row.pillClass}>
                <span className={styles.weatherDot} />
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Soil Health Summary</div>
        {/* ...existing code for Soil Health Summary... */}
        <div className={styles.npkCircularRow}>
          {soilData.npkData.map((item) => (
            <div className={styles.npkCircularItem} key={item.label}>
              <div className={styles.circularProgress}>
                <svg width="60" height="60" className={styles.progressSvg}>
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    fill="none"
                    stroke="#5d882d"
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 25}`}
                    strokeDashoffset={`${2 * Math.PI * 25 * (1 - item.percentage / 100)}`}
                    transform="rotate(-90 30 30)"
                    className={styles.progressCircle}
                  />
                </svg>
                <div className={styles.progressLabel}>{item.symbol}</div>
              </div>
              <div className={styles.npkLabel}>{item.label}</div>
            </div>
          ))}
        </div>
        <div className={styles.soilMetricsList}>
          {soilData.metrics.map((metric) => (
            <div className={styles.soilMetricRow} key={metric.label}>
              <div className={styles.soilMetricInfo}>
                <span className={styles.soilMetricLabel}>{metric.label}:</span>
                <span className={styles.soilMetricValue}>{metric.value}</span>
              </div>
              {metric.warning && (
                <div className={styles.soilWarning}>
                  <span className={styles.warningIcon}>⚠</span>
                  <span className={styles.warningText}>{metric.warning}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdvisoryBreakdownView() {
  const rows = [
    ["Seed", "Maize Seed", "50 kg", "150 kg", "20,833"],
    ["Fertilizer", "DAP", "2 bags", "6 bags", "41,667"],
    ["Fertilizer", "Urea", "1.5 bags", "4.5 bags", "208,333"],
    ["Pesticide", "Generic name", "500 ml", "1.5 L", "208,333"],
    ["Soil Conditioner", "Gypsum", "25 kg", "75 kg", "333,333"],
    ["Service", "Irrigation", "---", "---", "120,000"],
    ["Service", "Drone Application", "---", "---", "75,000"],
    ["Service", "Mechanization Rental", "---", "---", "192,501"],
  ];
  const total = "1,200,000";

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Inputs Required</div>
      <div className={styles.tableWrapper}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Input Type</TableHead>
              <TableHead>Product Category</TableHead>
              <TableHead>Quantity (per acre)</TableHead>
              <TableHead>Total Required</TableHead>
              <TableHead className={styles.right}>Est. Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, idx) => (
              <TableRow key={idx}>
                <TableCell>{r[0]}</TableCell>
                <TableCell>{r[1]}</TableCell>
                <TableCell>{r[2]}</TableCell>
                <TableCell>{r[3]}</TableCell>
                <TableCell className={styles.right}>{r[4]}</TableCell>
              </TableRow>
            ))}
            <TableRow className={styles.totalRow}>
              <TableCell className={styles.bold}>Grand Total</TableCell>
              <TableCell>---</TableCell>
              <TableCell>---</TableCell>
              <TableCell>---</TableCell>
              <TableCell className={`${styles.right} ${styles.bold}`}>{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function PredictiveOutcomeView() {
  return (
    <div className={styles.predictGrid}>
      <div className={styles.predictRow}>
        <div className={styles.predictLabel}>Expected Yield</div>
        <div className={styles.predictValue}>39 MT</div>
      </div>
      <div className={styles.predictRow}>
        <div className={styles.predictLabel}>Est. Price at the time of harvest</div>
        <div className={styles.predictValue}>3,192,000 PKR</div>
      </div>
    </div>
  );
}

/* ---------------------------- Main Advisory Tab -------------------------- */
export default function AdvisoryTab({ onProceed, amount = "1,250,000 PKR", landSize = "12.5 Acers", crop = "Maize" }) {
  const [view, setView] = useState("history"); // history | area | breakdown | predictive

  return (
    <>
      {/* mini meta strip */}
      <div className={styles.metaRow}>
        <div>
          <div className={styles.metaLabel}>Loan Amount Requested</div>
          <div className={styles.metaValue}>{amount}</div>
        </div>
        <div>
          <div className={styles.metaLabel}>Land Size</div>
          <div className={styles.metaValue}>{landSize}</div>
        </div>
        <div>
          <div className={styles.metaLabel}>Crop</div>
          <div className={styles.metaValue}>{crop}</div>
        </div>
      </div>

      {/* Pills */}
      <div className={styles.pillGroup}>
        <Pill active={view === "history"} onClick={() => setView("history")}>Land History</Pill>
        <Pill active={view === "area"} onClick={() => setView("area")}>Area Analysis</Pill>
        <Pill active={view === "breakdown"} onClick={() => setView("breakdown")}>Advisory Breakdown</Pill>
        <Pill active={view === "predictive"} onClick={() => setView("predictive")}>Predictive Outcome</Pill>
      </div>

      {/* Content per pill */}
      {view === "history" && <LandHistoryView />}
      {view === "area" && <AreaAnalysisView />}
      {view === "breakdown" && <AdvisoryBreakdownView />}
      {view === "predictive" && <PredictiveOutcomeView />}

      <div className={styles.footerBar}>
        <Button variant="outline" onClick={() => alert("Update Details form")}>Update Details</Button>
        <div className={styles.footerActions}>
          <Button className={styles.primaryBtn} onClick={onProceed}>
            Proceed to Risk Profiling
          </Button>
        </div>
      </div>
    </>
  );
}
