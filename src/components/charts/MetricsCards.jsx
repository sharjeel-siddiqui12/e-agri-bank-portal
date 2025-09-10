import React from "react";
import { TrendingUp, CheckCircle, DollarSign, Users, AlertTriangle } from "lucide-react";
import styles from "./MetricsCards.module.css";

export default function MetricsCards() {
  return (
    <div className={styles.grid}>
      {/* Total Crop Loans Disbursed */}
      <div className={`${styles.card} ${styles.span2}`}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={`${styles.iconWrap} ${styles.green}`}>
              <TrendingUp className={styles.icon} />
            </div>
            <div>
              <p className={styles.label}>Total Crop Loans Disbursed</p>
              <p className={styles.value}>Rs. 127M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Loans */}
      <div className={`${styles.card} ${styles.span2}`}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={`${styles.iconWrap} ${styles.green}`}>
              <CheckCircle className={styles.icon} />
            </div>
            <div>
              <p className={styles.label}>Active Loans</p>
              <p className={styles.value}>Rs. 99M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Outstanding Amount */}
      <div className={`${styles.card} ${styles.span2}`}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={`${styles.iconWrap} ${styles.green}`}>
              <DollarSign className={styles.icon} />
            </div>
            <div>
              <p className={styles.label}>Total Outstanding Amount</p>
              <p className={styles.value}>Rs. 92M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Borrowers */}
      <div className={`${styles.card} ${styles.span2}`}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={`${styles.iconWrap} ${styles.olive}`}>
              <Users className={styles.icon} />
            </div>
            <div>
              <p className={styles.label}>Active Borrowers</p>
              <p className={styles.value}>500</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overdue Accounts */}
      <div className={`${styles.card} ${styles.span2}`}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={`${styles.iconWrap} ${styles.yellow}`}>
              <AlertTriangle className={styles.icon} />
            </div>
            <div>
              <p className={styles.label}>Overdue Accounts</p>
              <p className={styles.value}>186</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settled Loans */}
      <div className={`${styles.card} ${styles.span2}`}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={`${styles.iconWrap} ${styles.green}`}>
              <CheckCircle className={styles.icon} />
            </div>
            <div>
              <p className={styles.label}>Settled Loans</p>
              <p className={styles.value}>642 | 42M PKR</p>
            </div>
          </div>
        </div>
      </div>

      {/* NPL (Defaults) Rate */}
      <div className={`${styles.card} ${styles.span6}`}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={`${styles.iconWrap} ${styles.olive}`}>
              <TrendingUp className={styles.icon} />
            </div>
            <div>
              <p className={styles.label}>NPL (Defaults) Rate</p>
              <p className={styles.value}>3.4%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
