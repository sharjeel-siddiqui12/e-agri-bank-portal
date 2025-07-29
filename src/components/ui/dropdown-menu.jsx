import React, { useState, useRef, useEffect } from "react";

export function DropdownMenu({ children }) {
  return <div className="relative">{children}</div>;
}
export function DropdownMenuTrigger({ children }) {
  return <>{children}</>;
}
export function DropdownMenuContent({ children, className }) {
  return (
    <div className={`absolute right-0 z-10 mt-2 w-44 rounded-lg bg-white border border-gray-200 shadow-lg ${className || ""}`}>
      {children}
    </div>
  );
}
export function DropdownMenuItem({ children, onClick }) {
  return (
    <button
      className="w-full px-4 py-2 text-left hover:bg-gray-100 text-base"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}