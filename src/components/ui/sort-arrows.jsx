import React from "react";

export default function SortArrows({ field, sortField, sortOrder, order }) {
  // Handle both prop patterns used across the app
  const currentOrder = field === sortField ? sortOrder : (order || undefined);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '4px' }}>
      <svg width="14" height="14" viewBox="0 0 14 14" style={{ display: "block" }}>
        {/* Up arrow */}
        <path
          d="M7 4L9 6H5L7 4Z"
          fill={currentOrder === "asc" ? "#5D882D" : "#B0B0B0"}
        />
        {/* Down arrow */}
        <path
          d="M7 10L5 8H9L7 10Z"
          fill={currentOrder === "desc" ? "#5D882D" : "#B0B0B0"}
        />
      </svg>
    </span>
  );
}

// Named export for compatibility
export { SortArrows };
