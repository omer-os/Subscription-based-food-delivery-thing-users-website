import Link from "next/link";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function HomePage() {
  return (
    <div className="p-4">
      <div className="mx-auto flex max-w-2xl flex-col">
        <div className="mt-10 text-center text-4xl font-extrabold">
          Customized Meal Plans, Delivered Daily to Your Doorstep!
        </div>
        <div className="mt-4 text-center text-lg text-muted-foreground sm:text-2xl">
          Get started with Next Dish today!
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-4">
        <Link className={cn(buttonVariants())} href="/auth/signin">
          Sign in
        </Link>

        <Link
          className={cn(
            buttonVariants({
              variant: "secondary",
            }),
          )}
          href="#"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
