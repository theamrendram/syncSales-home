"use client";
import { type ComponentProps } from "react";
import { ActionButton } from "./ui/action-button";

export function SyncsalesActionButton({
  action,
  successMessage,
  ...props
}: Omit<ComponentProps<typeof ActionButton>, "action"> & {
  action: () => Promise<{ error: null | { message?: string } }>;
  successMessage?: string;
}) {
  return (
    <ActionButton
      {...props}
      action={async () => {
        const res = await action();
        if (res.error)
          return { error: true, message: res.error.message || "Action failed" };
        return {
          error: false,
          message: successMessage ?? "Action completed successfully",
        };
      }}
    />
  );
}
