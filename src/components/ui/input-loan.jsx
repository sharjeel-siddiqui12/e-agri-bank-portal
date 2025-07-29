import React from "react";

export const Input = React.forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      className={`block w-full border border-gray-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#97AA63] transition-all ${className || ""}`}
      ref={ref}
      {...props}
    />
  );
});