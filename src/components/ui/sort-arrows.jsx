import React from "react";
import styles from "@/app/loan-applications/page.module.css";

export default function SortArrows({ order }) {
  return (
    <span className={styles.sortArrows}>
      <svg width="34" height="34" viewBox="0 0 14 14" style={{ display: "block" }}>
        {/* Up arrow */}
        <path
          d="M7 4L9 6H5L7 4Z"
          fill={order === "asc" ? "#5D882D" : "#B0B0B0"}
        />
        {/* Down arrow */}
        <path
          d="M7 10L5 8H9L7 10Z"
          fill={order === "desc" ? "#5D882D" : "#B0B0B0"}
        />
      </svg>
    </span>
  );
}
