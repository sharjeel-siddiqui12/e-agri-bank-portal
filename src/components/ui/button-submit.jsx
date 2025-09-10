import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

function Button({ className, ...props }, ref) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
}

const ForwardedButton = forwardRef(Button);
ForwardedButton.displayName = "Button";

export { ForwardedButton as Button };
