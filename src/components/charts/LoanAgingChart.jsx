"use client";
import React from "react";
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
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis 
            type="number" 
            tickFormatter={(value) => value.toLocaleString()} 
            domain={[0, 100000]}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={80}
          />
          <Tooltip
            formatter={(value) => value.toLocaleString()}
            labelStyle={{ color: '#333', fontWeight: 600 }}
          />
          <Bar 
            dataKey="value" 
            barSize={30}
            shape={props => {
              return (
                <rect
                  x={props.x}
                  y={props.y}
                  width={props.width}
                  height={props.height}
                  fill={props.fill}
                  rx={4}
                  ry={4}
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