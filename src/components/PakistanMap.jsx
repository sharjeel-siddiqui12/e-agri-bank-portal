"use client";
import React, { useState } from "react";
import BasePakistanMap from "@react-map/pakistan";
import styles from "./PakistanMap.module.css";

// Risk points data for different regions of Pakistan
const riskData = [
  { 
    id: 1, 
    province: "Punjab", 
    lat: 31.1704, 
    lng: 72.7097, 
    status: "performing", 
    area: 180 
  },
  { 
    id: 2, 
    province: "Sindh", 
    lat: 25.8943, 
    lng: 68.5247, 
    status: "at-risk", 
    area: 120 
  },
  { 
    id: 3, 
    province: "KPK", 
    lat: 34.9526, 
    lng: 72.3311, 
    status: "performing", 
    area: 150 
  },
  { 
    id: 4, 
    province: "Balochistan", 
    lat: 28.4907, 
    lng: 65.0959, 
    status: "lost", 
    area: 50 
  },
  { 
    id: 5, 
    province: "Punjab", 
    lat: 30.3753, 
    lng: 69.3451, 
    status: "at-risk", 
    area: 90 
  },
  { 
    id: 6, 
    province: "Sindh", 
    lat: 27.2520, 
    lng: 68.3571, 
    status: "performing", 
    area: 170 
  },
];

export default function PakistanMap() {
  const [hoveredProvince, setHoveredProvince] = useState(null);

  console.log("PakistanMap component rendering");
  console.log("BasePakistanMap:", BasePakistanMap);

  // Render risk markers as overlay
  const renderMarkers = () => {
    return riskData.map((point) => (
      <div
        key={point.id}
        className={`${styles.riskMarker} ${
          point.status === "performing" 
            ? styles.greenMarker 
            : point.status === "at-risk" 
            ? styles.yellowMarker 
            : styles.redMarker
        }`}
        style={{ 
          position: 'absolute',
          left: `${(point.lng - 61) / (78 - 61) * 100}%`,
          top: `${100 - (point.lat - 23) / (37 - 23) * 100}%`,
          width: `${Math.max(10, Math.min(20, point.area / 25))}px`, 
          height: `${Math.max(10, Math.min(20, point.area / 25))}px`,
          transform: 'translate(-50%, -50%)',
          zIndex: 10
        }}
        title={`${point.province} - ${point.status}`}
      />
    ));
  };

  return (
    <div className={styles.mapWrapper}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <BasePakistanMap
          type="select-single"
          size={400}
          mapColor="#E6E6E6"
          strokeColor="#D4D4D4"
          strokeWidth={1}
          hoverColor="#D0D0D0"
          onHover={(province) => {
            console.log("Hovered province:", province);
            setHoveredProvince(province);
          }}
          onClick={(province) => {
            console.log("Clicked province:", province);
          }}
        />
        {renderMarkers()}
      </div>
    </div>
  );
}