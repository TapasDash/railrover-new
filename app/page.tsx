"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { AutocompleteInput } from "@/components/AutocompleteInput";
import { Train, Search } from "lucide-react";
import { extractCode } from "./trains/page";

const stations = [
  "New Delhi (NDLS)",
  "Bhubaneswar (BBS)",
  "Mumbai Central (MMCT)",
  "Howrah Junction (HWH)",
  "Chennai Central (MAS)",
  "Bengaluru City Junction (SBC)",
  "Ahmedabad Junction (ADI)",
  "Pune Junction (PUNE)",
  "Jaipur Junction (JP)",
  "Lucknow Junction (LKO)",
  "Kanpur Central (CNB)",
  "Patna Junction (PNBE)",
  "Secunderabad Junction (SC)",
  "Vijayawada Junction (BZA)",
  "Bhopal Junction (BPL)",
  "Nagpur Junction (NGP)",
];

export default function Home() {
  const { fromStation, toStation, setFromStation, setToStation } =
    useAppContext();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/trains");
  };

  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center my-6 text-blue-600">
          Indian Railways
        </h1>
        <form onSubmit={handleSearch} className="space-y-4 mb-8">
          <AutocompleteInput
            placeholder="From Station"
            value={extractCode(fromStation)}
            onChange={setFromStation}
            stations={stations}
          />
          <AutocompleteInput
            placeholder="To Station"
            value={extractCode(toStation)}
            onChange={setToStation}
            stations={stations}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Train className="mr-2 h-4 w-4" />
            Search Trains
          </Button>
        </form>
        <Button
          onClick={() => router.push("/pnr")}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <Search className="mr-2 h-4 w-4" />
          Check PNR Status
        </Button>
      </div>
      <Navigation />
    </main>
  );
}
