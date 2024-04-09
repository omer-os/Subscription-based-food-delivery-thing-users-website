import React from "react";
import DashboardSidebar from "../sidebars/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-5xl">
      <DashboardSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
