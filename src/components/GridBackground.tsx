import { cn } from "@/lib/utils";
import React from "react";

export function GridBackgroundDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex w-full items-center justify-center bg-neutral-900">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:60px_60px] sm:[background-size:90px_90px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>
      {children}
    </div>
  );
}
