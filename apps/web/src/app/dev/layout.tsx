"use client";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[auto_1fr] h-svh">
      <div>
        <div className="flex flex-row items-center justify-between px-2 py-1">
          <nav className="flex gap-4 text-lg">
            <Link href="/">Home</Link>
            <Link href="/dev">Dev Area</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
        <hr />
      </div>
      {children}
    </div>
  );
}