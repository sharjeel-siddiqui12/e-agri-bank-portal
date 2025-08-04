"use client";
import React from "react";
import { ResponsiveContainer, FunnelChart as RechartsFunnel, Funnel, LabelList, Tooltip } from "recharts";
import styles from "./FunnelChart.module.css";

const data = [
  {
    name: "Applications Received",
    value: 215,
    fill: "#F2F7EA"
  },
  {
    name: "Verification In Progress",
    value: 114,
    fill: "#E6EFD6"
  },
  {
    name: "Sanctioned",
    value: 71,
    fill: "#D9E7C2"
  },
  {
    name: "Disbursed",
    value: 80,
    fill: "#63862D"
  }
];

export default function FunnelChart() {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={350}>
        <RechartsFunnel
          width={400}
          height={350}
          data={data}
        >
          <Tooltip />
          <Funnel
            dataKey="value"
            nameKey="name"
            isAnimationActive
          >
            <LabelList 
              position="right" 
              fill="#000" 
              stroke="none" 
              dataKey="value"
              className={styles.labelList}
            />
          </Funnel>
        </RechartsFunnel>
      </ResponsiveContainer>
      <div className={styles.labels}>
        <div className={styles.labelItem}>
          <div className={styles.line}></div>
          <div className={styles.labelText}>Applications Received</div>
        </div>
        <div className={styles.labelItem}>
          <div className={styles.line}></div>
          <div className={styles.labelText}>Verification in Progress</div>
        </div>
        <div className={styles.labelItem}>
          <div className={styles.line}></div>
          <div className={styles.labelText}>Sanctioned</div>
        </div>
        <div className={styles.labelItem}>
          <div className={styles.line}></div>
          <div className={styles.labelText}>Disbursed</div>
        </div>
      </div>
    </div>
  );
}