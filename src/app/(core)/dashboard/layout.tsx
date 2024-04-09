import React from "react";
import DashboardLayout from "~/components/custom/layouts/dashboard-layout";

export default function layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
