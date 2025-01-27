"use client";

import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import {
  Ticket,
  Train,
  Calendar,
  MapPin,
  User,
  X,
  RefreshCw,
  Clock,
  CreditCard,
} from "lucide-react";

export default function PNRStatus() {
  const { pnrNumber, setPnrNumber, pnrStatus, setPnrStatus } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedPNRStatus = localStorage.getItem("pnrStatus");
    if (savedPNRStatus) {
      setPnrStatus(JSON.parse(savedPNRStatus));
    }
  }, [setPnrStatus]);

  const getPNRStatus = async (pnrNumber: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PNR_URL}/pnr/${pnrNumber}`,
        {
          cache: "no-store", // This ensures we don't use any caching for PNR status
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch PNR status");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching PNR status:", error);
      alert("Failed to fetch PNR status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const pnr = pnrNumber.trim();
    if (pnr.length !== 10) {
      alert("Please enter a valid 10-digit PNR number.");
      return;
    }
    const pnrStatus = await getPNRStatus(pnr);
    setPnrStatus(pnrStatus);
    localStorage.setItem("pnrStatus", JSON.stringify(pnrStatus));
  };

  const handleRefresh = () => {
    if (pnrNumber) {
      getPNRStatus(pnrNumber).then(setPnrStatus);
    }
  };

  const handleDelete = () => {
    setPnrStatus(null);
    setPnrNumber("");
    localStorage.removeItem("pnrStatus");
  };

  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center my-6 text-blue-600">
          PNR Status
        </h1>
        <form onSubmit={handleSearch} className="space-y-4 mb-8">
          <Input
            placeholder="Enter 10-digit PNR Number"
            value={pnrNumber}
            onChange={(e) => setPnrNumber(e.target.value)}
            className="bg-white"
            maxLength={10}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Checking..." : "Check Status"}
          </Button>
        </form>
        {pnrStatus && (
          <div className="bg-white rounded-lg shadow-md p-4 relative">
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <button
              onClick={handleRefresh}
              className="absolute top-2 right-10 text-gray-500 hover:text-blue-500"
            >
              <RefreshCw size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {pnrStatus.TrainName} ({pnrStatus.TrainNo})
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Ticket className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">PNR:</span>
                <span className="ml-2">{pnrStatus.Pnr}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">Date:</span>
                <span className="ml-2">{pnrStatus.Doj}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">From:</span>
                <span className="ml-2">{`${pnrStatus.BoardingStationName} (${pnrStatus.BoardingPoint})`}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">To:</span>
                <span className="ml-2">{`${pnrStatus.ReservationUptoName} (${pnrStatus.ReservationUpto})`}</span>
              </div>
              <div className="flex items-center">
                <Train className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">Class:</span>
                <span className="ml-2">{pnrStatus.Class}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">Departure:</span>
                <span className="ml-2">{pnrStatus.DepartureTime}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">Arrival:</span>
                <span className="ml-2">{pnrStatus.ArrivalTime}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">Duration:</span>
                <span className="ml-2">{pnrStatus.Duration}</span>
              </div>
              <div className="flex items-center">
                <Train className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">Platform:</span>
                <span className="ml-2">{pnrStatus.ExpectedPlatformNo}</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">Fare:</span>
                <span className="ml-2">₹{pnrStatus.TicketFare}</span>
              </div>
            </div>
            <h3 className="text-md font-semibold mt-4 mb-2">
              Passenger Details:
            </h3>
            {pnrStatus.PassengerStatus.map((passenger, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded mb-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Passenger {index + 1}</span>
                  <span className="text-sm">{passenger.BookingStatus}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Seat: {passenger.CurrentStatus}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Navigation />
    </main>
  );
}
