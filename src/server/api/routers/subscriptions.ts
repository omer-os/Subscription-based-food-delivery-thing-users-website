// subscriptionsRoute.ts
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { subscriptionSchema } from "~/lib/zod";
import { db } from "~/server/firebase/firebase-admin";
import { z } from "zod";

export const subscriptionsRoute = createTRPCRouter({
  // Create a new subscription
  createSubscription: protectedProcedure
    .input(subscriptionSchema)
    .mutation(async ({ input }) => {
      const docRef = await db.collection("subscriptions").add(input);
      return { subscriptionId: docRef.id, ...input };
    }),

  // Update an existing subscription
  updateSubscription: protectedProcedure
    .input(subscriptionSchema.extend({ subscriptionId: z.string() }))
    .mutation(async ({ input }) => {
      const { subscriptionId, ...data } = input;
      await db.collection("subscriptions").doc(subscriptionId).update(data);
      return { subscriptionId, ...data };
    }),

  // Fetch a user's subscription
  getSubscription: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const snapshot = await db
        .collection("subscriptions")
        .where("userId", "==", input.userId)
        .get();
      if (snapshot.empty) {
        throw new Error("Subscription not found");
      }
      const subscriptions = snapshot.docs.map((doc) => ({
        subscriptionId: doc.id,
        ...doc.data(),
      }));
      // Assuming a user can have multiple subscriptions, adjust as necessary
      return subscriptions;
    }),
});
