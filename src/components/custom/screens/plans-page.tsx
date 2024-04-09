import React from "react";
import AvailableDays from "../cards/available-days";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import MealDayCard from "../cards/meal-day-card";
import { api } from "~/trpc/server";

export default async function PlansPage() {
  const availableDays = await api.days.getDays();

  return (
    <div className="p-4">
      <div className="text-xl font-bold">Plans Page</div>
      <div className="mt- text-muted-foreground">
        Select your plan from the list below to get started.
      </div>

      <Separator className="my-3" />

      <div>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            {availableDays.map((day, index) => (
              <TabsTrigger key={index} value={day.day}>
                {day.day}
              </TabsTrigger>
            ))}
          </TabsList>
          {availableDays.map((day, index) => (
            <TabsContent key={index} value={day.day}>
              <MealDayCard day={day} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
