"use client";
import React, { useState, useEffect, useRef } from "react";
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
    lat: 27.8607, 
    lng: 69.0011, // Karachi area
    status: "at-risk", 
    area: 120 
  },
  { 
    id: 4, 
    province: "Sindh", 
    lat: 25.3960, 
    lng: 68.3578, // Hyderabad area (adjusted coordinates)
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
  const [mapSize, setMapSize] = useState(350);
  const mapRef = useRef(null);

  useEffect(() => {
    const updateMapSize = () => {
      if (typeof window !== 'undefined') {
        const windowWidth = window.innerWidth;
        let newSize = 350;
        
        if (windowWidth < 640) {
          newSize = Math.min(300, windowWidth * 0.9);
        } else if (windowWidth < 1024) {
          newSize = Math.min(350, windowWidth * 0.6);
        }
        
        setMapSize(newSize);
      }
    };

    updateMapSize();
    window.addEventListener('resize', updateMapSize);
    
    return () => window.removeEventListener('resize', updateMapSize);
  }, []);

  console.log("PakistanMap rendering...");
  console.log("BasePakistanMap:", typeof BasePakistanMap);

  // Convert lat/lng to percentage positions based on Pakistan's actual bounds
  const getMarkerPosition = (lat, lng) => {
    // Pakistan's approximate geographical bounds
    const bounds = {
      north: 37.1,
      south: 23.6, 
      east: 77.8,
      west: 60.8
    };
    
    // Convert to percentage positions
    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * 100;
    const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * 100;
    
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  // Render risk markers as overlay
  const renderMarkers = () => {
    return riskData.map((point) => {
      const position = getMarkerPosition(point.lat, point.lng);
      
      return (
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
            left: `${position.x}%`,
            top: `${position.y}%`,
            width: `${Math.max(8, Math.min(16, point.area / 30))}px`, 
            height: `${Math.max(8, Math.min(16, point.area / 30))}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}
          title={`${point.province} - ${point.status} - Area: ${point.area}`}
        />
      );
    });
  };

  return (
    <div className={styles.mapWrapper}>
      <div style={{ 
        position: 'relative', 
        width: `${mapSize}px`,
        height: `${mapSize}px`,
        margin: '0 auto'
      }}>
        <BasePakistanMap
          type="select-single"
          size={mapSize}
          mapColor="#E6E6E6"
          strokeColor="#D4D4D4"
          strokeWidth={1}
          hoverColor="#D0D0D0"
          selectColor="#b5b5b5"
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