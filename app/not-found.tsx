import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="w-full max-w-7xl items-center justify-center gap-4 flex flex-col pt-20">
      <div className="mt-10" />
      <div className=" flex items-start gap-2 justify-center text-8xl font-extrabold tracking-wide text-primary">
        <span>4</span>
        <span className="mt-5">0</span>
        <span>4</span>
      </div>
      <p className="text-3xl font-extrabold tracking-wide mb-2">
        La page n existe pas
      </p>

      <Button asChild>
        <Link href="/" className="p-2 text-xl">
          Revenir en lieu sur
        </Link>
      </Button>
    </main>
  );
};

export default NotFound;
