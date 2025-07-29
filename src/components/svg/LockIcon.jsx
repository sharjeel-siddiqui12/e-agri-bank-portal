import React from "react";

export default function LockIcon() {
  return (
    <svg
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M12 17v1" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}