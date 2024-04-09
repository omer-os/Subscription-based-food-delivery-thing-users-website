"use client";
import React from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Tabs } from "~/components/ui/tabs";

export default function AvailableDays() {
  const days = [
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
    { day: "Sunday" },
  ];

  

  return (
    <div>
      <div className="mt-4 gap-4">
        <Tabs></Tabs>
      </div>
    </div>
  );
}
