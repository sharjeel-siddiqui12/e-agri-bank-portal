import React from "react";

// This SVG matches a real eye shape with sharp left/right corners and your requested green color.
// Size is increased for better visibility.

export default function EyeGreen({ className = "", ...props }) {
  return (
    <svg
      width="32"
      height="20"
      viewBox="0 0 32 20"
      fill="none"
      className={className}
      {...props}
    >
      {/* Outer eye shape with sharp left/right (not a simple ellipse) */}
      <path
        d="M2 10C5.5 4.5 11 2 16 2C21 2 26.5 4.5 30 10C26.5 15.5 21 18 16 18C11 18 5.5 15.5 2 10Z"
        fill="#5D882D"
        stroke="#5D882D"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      {/* Sclera (white part) */}
      <ellipse
        cx="16"
        cy="10"
        rx="5"
        ry="5"
        fill="white"
      />
      {/* Iris */}
      <circle
        cx="16"
        cy="10"
        r="2.5"
        fill="#5D882D"
      />
    </svg>
  );
}