import React from 'react';
import styles from './FunnelChart.module.css';

const FunnelChart = ({ data = defaultData }) => {
  return (
    <div className={styles.funnelContainer}>
      {data.map((item, index) => (
        <div key={index} className={styles.funnelItemWrapper}>
          <div 
            className={`${styles.funnelItem} ${styles[`level${index + 1}`]}`}
          >
            <span className={styles.itemValue}>{item.value}</span>
          </div>
          
          <div className={styles.labelContainer}>
            <div className={styles.labelLine}></div>
            <div className={styles.labelText}>
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Demo data that matches the image
const defaultData = [
  { value: 215, label: 'Applications\nReceived' },
  { value: 114, label: 'Verification in\nProgress' },
  { value: 71, label: 'Sanctioned' },
  { value: 80, label: 'Disbursed' }
];

export default FunnelChart;