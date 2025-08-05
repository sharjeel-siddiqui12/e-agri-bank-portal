"use client";
import React, { useState } from "react";
import BasePakistanMap from "@react-map/pakistan";
import styles from "./PakistanMap.module.css";

// Corrected risk points data with more accurate province positions
const riskData = [
  // Punjab (eastern region)
  { 
    id: 1, 
    province: "Punjab", 
    lat: 31.5204, 
    lng: 74.3587, // Lahore area
    status: "performing", 
    area: 180 
  },
  { 
    id: 2, 
    province: "Punjab", 
    lat: 30.1575, 
    lng: 71.5249, // Multan area
    status: "at-risk", 
    area: 90 
  },
  
  // Sindh (southern region)
  { 
    id: 3, 
    province: "Sindh", 
    lat: 24.8607, 
    lng: 67.0011, // Karachi area
    status: "at-risk", 
    area: 120 
  },
  { 
    id: 4, 
    province: "Sindh", 
    lat: 26.0475, 
    lng: 68.9380, // Hyderabad area
    status: "performing", 
    area: 170 
  },
  
  // KPK (northwestern region)
  { 
    id: 5, 
    province: "KPK", 
    lat: 34.0151, 
    lng: 71.5249, // Peshawar area
    status: "performing", 
    area: 150 
  },
  
  // Balochistan (southwestern region)
  { 
    id: 6, 
    province: "Balochistan", 
    lat: 28.4907, 
    lng: 65.0959, // Quetta area
    status: "lost", 
    area: 50 
  },
  
  // Additional point in Northern areas
  { 
    id: 7, 
    province: "GilgitBaltistan", 
    lat: 35.8884, 
    lng: 74.4648, 
    status: "performing", 
    area: 100 
  },
];

export default function PakistanMap() {
  const [hoveredProvince, setHoveredProvince] = useState(null);

  console.log("PakistanMap rendering...");
  console.log("BasePakistanMap:", typeof BasePakistanMap);

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
          left: `${((point.lng - 60.8) / (78.4 - 60.8)) * 100}%`,
          top: `${(1 - (point.lat - 23.6) / (37.1 - 23.6)) * 100}%`,
          width: `${Math.max(8, Math.min(16, point.area / 30))}px`, 
          height: `${Math.max(8, Math.min(16, point.area / 30))}px`,
          transform: 'translate(-50%, -50%)',
          zIndex: 10
        }}
        title={`${point.province} - ${point.status} - Area: ${point.area}`}
      />
    ));
  };

  return (
    <div className={styles.mapWrapper}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <BasePakistanMap
          type="select-single"
          size={350}
          mapColor="#E6E6E6"
          strokeColor="#D4D4D4"
          strokeWidth={1}
          hoverColor="#D0D0D0"
          onHover={(province) => {
            console.log("Province hovered:", province);
            setHoveredProvince(province);
          }}
          onClick={(province) => {
            console.log("Province clicked:", province);
          }}
        />
        {renderMarkers()}
      </div>
    </div>
  );
}