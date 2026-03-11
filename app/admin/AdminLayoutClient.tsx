"use client";

import { TooltipProvider } from "@/components/ui/tooltip";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}