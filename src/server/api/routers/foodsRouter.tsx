// server/routers/foodsRouter.ts

import { z } from "zod";
import { db } from "~/server/firebase/firebase-admin";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Food } from "~/lib/types";

const foodAvailabilitySchema = z.object({
  day: z.enum([
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]),
  mealTime: z.enum(["breakfast", "lunch", "dinner"]),
});

const foodSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  nutritionalInfo: z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fats: z.number(),
  }),
  availability: z.array(foodAvailabilitySchema),
});

export const foodsRouter = createTRPCRouter({
  // Add a new food
  addFood: protectedProcedure
    .input(foodSchema) // Omit id for creation
    .mutation(async ({ input }) => {
      const docRef = await db.collection("foods").add(input);
      return { id: docRef.id, ...input };
    }),

  // Update an existing food
  updateFood: protectedProcedure
    .input(foodSchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await db.collection("foods").doc(id).update(data);
      return { id, ...data };
    }),

  // Remove a food
  removeFood: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.collection("foods").doc(input.id).delete();
      return { id: input.id };
    }),

  // Get all foods
  getFoods: protectedProcedure.query(async () => {
    const snapshot = await db.collection("foods").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }),

  getFoodsByDay: protectedProcedure
    .input(
      z.object({
        day: z.enum([
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ]),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { day } = input;
      const foodsRef = db.collection("foods");
      const snapshot = await foodsRef.get();
      const foods: Food[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const isAvailable = data.availability.some(
          (avail) => avail.day === day,
        );
        if (isAvailable) {
          foods.push({ id: doc.id, ...data });
        }
      });
      return foods;
    }),
});
