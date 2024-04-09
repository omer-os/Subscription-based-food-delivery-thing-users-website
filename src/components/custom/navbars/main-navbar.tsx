import Link from "next/link";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import SignoutButton from "../buttons/signout-button";
import { getServerAuthSession } from "~/server/auth";

export default async function MainNavBar() {
  const session = await getServerAuthSession();

  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <img className="h-10 w-10" src="/images/logo.png" alt="logo" />
        <p className="flex-1 text-lg font-bold">Next Dish</p>
      </div>

      <div>
        {session?.user ? (
          <SignoutButton>Sign out</SignoutButton>
        ) : (
          <Link className={cn(buttonVariants())} href="/auth/signin">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}
