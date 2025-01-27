"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Train, Search } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center p-4 ${
            pathname === "/" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        {pathname === "/trains" && (
          <Link
            href="/trains"
            className="flex flex-col items-center p-4 text-blue-600"
          >
            <Train size={24} />
            <span className="text-xs mt-1">Trains</span>
          </Link>
        )}
        <Link
          href="/pnr"
          className={`flex flex-col items-center p-4 ${
            pathname === "/pnr" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Search size={24} />
          <span className="text-xs mt-1">PNR Status</span>
        </Link>
      </div>
    </nav>
  );
}
