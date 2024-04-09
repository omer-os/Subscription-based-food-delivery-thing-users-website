import React from "react";
import PlansPage from "~/components/custom/screens/plans-page";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <div className="p-4">
      {session?.user ? (
        <PlansPage />
      ) : (
        <div className="text-center text-xl font-bold">
          You need to sign in to Subscribe to a plan.
        </div>
      )}
    </div>
  );
}
