import React from "react";

const BackgroundSVG = () => (
  <svg
    width="100vw"
    height="100vh"
    viewBox="0 0 1920 1080"
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      width: "100vw",
      height: "100vh",
      minWidth: "100vw",
      minHeight: "100vh",
      pointerEvents: "none",
      objectFit: "cover",
    }}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    {/* Base background */}
    <rect width="1920" height="1080" fill="#FCFDFE" />

    {/* Large, bright, left ellipse */}
    <ellipse
      cx="750"
      cy="950"
      rx="780"
      ry="700"
      fill="url(#ellipseLeft)"
      opacity="0.32"
    />

    {/* Main bright blue swirl, top right */}
    <path
      d="M1920 0 Q1640 320 1200 360 Q900 380 750 540 Q580 700 1200 980 Q1800 1200 1920 700 Z"
      fill="url(#mainSwirl)"
      opacity="0.35"
    />

    {/* Sub swirl accent, upper right */}
    <path
      d="M1920 80 Q1660 350 1400 440 Q1300 500 1200 700 Q1150 900 1700 970 Q1920 1000 1920 400 Z"
      fill="url(#accentSwirl)"
      opacity="0.18"
    />

    {/* Bottom left soft ellipse */}
    <ellipse
      cx="300"
      cy="1080"
      rx="420"
      ry="220"
      fill="url(#bottomLeft)"
      opacity="0.18"
    />

    {/* Faint diagonal highlight */}
    <path
      d="M 420 900 Q 900 1050 1600 700"
      stroke="url(#highlightStroke)"
      strokeWidth="8"
      fill="none"
      opacity="0.12"
    />

    <defs>
      {/* Brighter gradients for subtle blue coloring */}
      <linearGradient id="ellipseLeft" x1="0.1" y1="0.9" x2="0.9" y2="0.1">
        <stop offset="0%" stopColor="#e3f3ff" />
        <stop offset="100%" stopColor="#bfe0fa" stopOpacity="0.58" />
      </linearGradient>
      <linearGradient id="mainSwirl" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d6eeff" />
        <stop offset="100%" stopColor="#a9d4f7" stopOpacity="0.41" />
      </linearGradient>
      <linearGradient id="accentSwirl" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#b9e3fe" />
        <stop offset="100%" stopColor="#c3e5ff" stopOpacity="0.31" />
      </linearGradient>
      <linearGradient id="bottomLeft" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#e5f4ff" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#d7ecff" stopOpacity="0.18" />
      </linearGradient>
      <linearGradient id="highlightStroke" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#b8e6fb" stopOpacity="0.19" />
        <stop offset="100%" stopColor="#63b2fa" stopOpacity="0.16" />
      </linearGradient>
    </defs>
  </svg>
);

export default BackgroundSVG;