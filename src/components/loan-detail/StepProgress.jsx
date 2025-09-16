"use client";

import styles from "@/app/(loan-operations-items)/loan-requests/[id]/LoanDetail.module.css";

export default function StepProgress({ steps, activeIndex = 0, onStepClick }) {
  return (
    <div className={styles.chevBar} role="tablist" aria-label="Loan workflow">
      {steps.map((label, i) => {
        const active = i === activeIndex;
        const done = i < activeIndex;
        return (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={active}
            className={[
              styles.chev,
              active ? styles.chevActive : "",
              done ? styles.chevDone : "",
              i === 0 ? styles.chevFirst : "",
              i === steps.length - 1 ? styles.chevLast : "",
            ].join(" ")}
            onClick={() => onStepClick?.(i)}
            title={label}
          >
            <span className={styles.chevLabel}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
