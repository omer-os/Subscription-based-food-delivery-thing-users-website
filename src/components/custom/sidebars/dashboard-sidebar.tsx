"use client";
import { Box, DollarSign, Dot, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "~/lib/utils";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const pathnameSecondItem = pathname.split("/")[2];

  return (
    <div className="w-[14em]">
      <div className="mt-4">
        <div className="text-sm font-semibold text-muted-foreground">
          dashbaord
        </div>

        <div className="mt-2 flex flex-col">
          {[
            {
              title: "Profile",
              icon: User,
              link: "/dashboard",
            },
            {
              title: "Plans",
              icon: User,
              link: "/dashboard/plans",
            },
            {
              title: "Meals",
              icon: Box,
              link: "/meals",
            },
            {
              title: "Subscriptions",
              icon: DollarSign,
              link: "/subscriptions",
            },
            {
              title: "Reports",
              icon: Dot,
              link: "/reports",
            },
            {
              title: "Settings",
              icon: Dot,
              link: "/settings",
            },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-md bg-muted/0 p-2 transition-all hover:bg-muted",
                {
                  "bg-muted": "/dashboard/" + pathnameSecondItem === item.link,
                },
              )}
            >
              <item.icon />
              <div className="text-sm">{item.title}</div>
            </Link>
          ))}
        </div>
      </div>{" "}
    </div>
  );
}
