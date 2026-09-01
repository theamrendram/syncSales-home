import { cn } from "@/lib/utils";
import React from "react";

export function GridBackgroundDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex w-full items-center justify-center bg-background">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:60px_60px] sm:[background-size:90px_90px]",
          "[background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)]"
        )}
      />
      {/* Fades the grid out toward the edges so it reads as texture rather
          than a boxed-in table. */}
      <div className="pointer-events-none absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      {children}
    </div>
  );
}
