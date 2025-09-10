import React from "react";
import styles from "./FunnelChart.module.css";

const STAGE_WIDTHS = [98, 86, 70, 46]; // wide but safe (relative to left column)

const FunnelChart = ({ data = defaultData }) => {
  return (
    <div className={styles.funnel}>
      {data.slice(0, 4).map((item, i) => (
        <div className={styles.row} key={i}>
          <div
            className={`${styles.stage} ${styles[`level${i + 1}`]}`}
            style={{ "--w": `${STAGE_WIDTHS[i]}%` }}
          >
            <span className={styles.value}>{item.value}</span>
          </div>
          <div className={styles.labelCell}>
            <span className={styles.label}>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const defaultData = [
  { value: 215, label: "Applications\nReceived" },
  { value: 114, label: "Verification in\nProgress" },
  { value: 71, label: "Sanctioned" },
  { value: 80, label: "Disbursed" },
];

export default FunnelChart;
