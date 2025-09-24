"use client";
import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import styles from "./LoanAgingChart.module.css";

// Demo data
const data = [
  { name: "0-30 Days", value: 89000, fill: "#4caf50" },
  { name: "31-60 Days", value: 10000, fill: "#9575cd" },
  { name: "61-90 Days", value: 2000, fill: "#ffb74d" },
  { name: "90+ Days", value: 1000, fill: "#ef5350" }
];

export default function LoanAgingChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const chartHeight = isMobile ? 160 : 200;
  const barSize = isMobile ? 20 : 30;
  const yAxisWidth = isMobile ? 60 : 80;

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={data}
          layout="vertical"
          margin={isMobile ? 
            { top: 5, right: 10, left: 10, bottom: 5 } : 
            { top: 5, right: 30, left: 20, bottom: 5 }
          }
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis 
            type="number" 
            tickFormatter={(value) => isMobile ? 
              `${Math.round(value/1000)}k` : 
              value.toLocaleString()
            }
            domain={[0, 100000]}
            fontSize={isMobile ? 10 : 12}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={yAxisWidth}
            fontSize={isMobile ? 9 : 11}
            tick={{
              fontSize: isMobile ? 9 : 11,
              fill: '#666'
            }}
          />
          <Tooltip
            formatter={(value) => value.toLocaleString()}
            labelStyle={{ color: '#333', fontWeight: 600, fontSize: isMobile ? 12 : 14 }}
            contentStyle={{
              fontSize: isMobile ? 11 : 13,
              padding: isMobile ? '6px 8px' : '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Bar 
            dataKey="value" 
            barSize={barSize}
            shape={props => {
              return (
                <rect
                  x={props.x}
                  y={props.y}
                  width={props.width}
                  height={props.height}
                  fill={props.fill}
                  rx={isMobile ? 3 : 4}
                  ry={isMobile ? 3 : 4}
                />
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className={styles.labels}>
        {data.map((item, index) => (
          <div key={index} className={styles.labelItem}>
            <div className={styles.labelName}>{item.name}</div>
            <div className={styles.labelValue}>{item.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}