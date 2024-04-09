"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function PlansPage() {
  const [SelectedDays, setSelectedDays] = useState<string[]>([]);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const meals = [
    {
      name: "Breakfast",
      items: [
        { name: "Egg", price: 10 },
        { name: "Bread", price: 5 },
        { name: "Butter", price: 2 },
        { name: "none", price: 0 },
      ],
    },
    {
      name: "Lunch",
      items: [
        { name: "Rice", price: 10 },
        { name: "Chicken", price: 20 },
        { name: "Salad", price: 5 },
        { name: "none", price: 0 },
      ],
    },
    {
      name: "Dinner",
      items: [
        { name: "Pasta", price: 10 },
        { name: "Meatballs", price: 15 },
        { name: "Sauce", price: 5 },
        { name: "none", price: 0 },
      ],
    },
  ];

  const initialMealSelections = days.reduce(
    (acc: { [key: string]: any }, day) => {
      acc[day] = { breakfast: null, lunch: null, dinner: null };
      return acc;
    },
    {},
  );

  const [mealSelections, setMealSelections] = useState(initialMealSelections);

  return (
    <div>
      <Card className="mx-auto mt-10 w-max">
        <CardHeader>
          <CardTitle>Plans Page</CardTitle>
          <CardDescription>This is the plans page</CardDescription>
        </CardHeader>

        <CardContent className="w-[30em]">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-muted-foreground">
                select days you want to receive meals
              </p>

              <div className="mt-2 flex flex-wrap gap-4">
                {days.map((day) => (
                  <Button
                    key={day}
                    variant={
                      SelectedDays.includes(day) ? "secondary" : "outline"
                    }
                    onClick={() =>
                      setSelectedDays((prev) =>
                        prev.includes(day)
                          ? prev.filter((d) => d !== day)
                          : [...prev, day],
                      )
                    }
                  >
                    {SelectedDays.includes(day) && (
                      <CheckCircle
                        className={`${"text-green-500"}`}
                        size={16}
                      />
                    )}
                    {day}
                  </Button>
                ))}
              </div>

              <p className="mt-4 text-sm font-semibold text-muted-foreground">
                Select meals for each day
              </p>
              <div className="mt-3">
                <div className="flex flex-col gap-4">
                  <Accordion type="single" collapsible>
                    {SelectedDays.map((day) => (
                      <AccordionItem key={day} value={day}>
                        <AccordionTrigger>Meals for {day}</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-2 rounded border p-3">
                            {meals.map((meal) => (
                              <div
                                className="flex items-center justify-between"
                                key={meal.name}
                              >
                                <p className="flex-1">{meal.name}</p>
                                <Select
                                  onValueChange={(selectedItem) => {
                                    const newSelections = { ...mealSelections };
                                    newSelections[day][
                                      meal.name.toLowerCase()
                                    ] = selectedItem;
                                    setMealSelections(newSelections);
                                  }}
                                  value={
                                    mealSelections[day][meal.name.toLowerCase()]
                                  }
                                >
                                  <SelectTrigger className="w-max">
                                    <SelectValue placeholder="Select Item" />
                                  </SelectTrigger>
                                  <SelectContent className="w-[10em]">
                                    {meal.items.map((item) => (
                                      <SelectItem
                                        value={item.name}
                                        key={item.name}
                                      >
                                        <div className="flex items-center gap-3">
                                          {item.price > 0 && (
                                            <div className="text-green-600 text-muted-foreground">
                                              +${item.price}
                                            </div>
                                          )}
                                          {item.name}
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => {
              console.log(mealSelections);
            }}
          >
            Subscribe for $20
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
