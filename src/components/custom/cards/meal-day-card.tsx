"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Day } from "~/lib/types";
import { api } from "~/trpc/react";

export default function MealDayCard({ day }: { day: Day }) {
  const foodsForDay = api.foods.getFoodsByDay.useQuery({ day: day.day });

  return (
    <div>
      <div className="text-xl font-bold">Meals Available For {day.day}</div>

      <div className="mt-2 grid gap-2">
        {/* {day.meals.map((meal, index) => (
          <Card key={index}>
            <CardHeader className="p-3">
              <CardTitle>{meal.mealType}</CardTitle>
              <CardDescription>
                Delivery time : {meal.deliveryTime}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <div className="mt-2">
                <div className="text-lg font-semibold">
                  available meals for {meal.mealType}
                </div>

                <div className="mt-2 grid gap-2">
                  {foodsForDay.data?.map((food, index) => (
                    <div key={index}>{food.name}</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))} */}

        <Accordion type="single" collapsible>
          {day.meals.map((meal, index) => (
            <AccordionItem value={meal.mealType}>
              <AccordionTrigger className="border">
                {meal.mealType}
              </AccordionTrigger>
              <AccordionContent>
                <div className="">
                  {foodsForDay.data?.map((food, index) => (
                    <div className="flex items-center gap-2 p-3" key={index}>
                      <div className="text-lg">
                        {food.name}- {food.price}
                      </div>
                      <Checkbox />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
