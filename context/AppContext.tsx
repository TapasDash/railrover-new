"use client";

import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";

type Train = {
  number: string;
  name: string;
  departure: string;
  arrival: string;
  duration: string;
};

type PNRStatus = {
  Pnr: string;
  TrainNo: string;
  TrainName: string;
  Doj: string;
  BoardingStationName: string;
  BoardingPoint: string;
  ReservationUptoName: string;
  ReservationUpto: string;
  Class: string;
  DepartureTime: string;
  ArrivalTime: string;
  Duration: string;
  ExpectedPlatformNo: string;
  TicketFare: string;
  PassengerStatus: Array<{
    BookingStatus: string;
    CurrentStatus: string;
  }>;
};

type AppContextType = {
  fromStation: string;
  toStation: string;
  setFromStation: (station: string) => void;
  setToStation: (station: string) => void;
  pnrNumber: string;
  setPnrNumber: (pnr: string) => void;
  trains: any;
  setTrains: (trains: Train[]) => void;
  pnrStatus: PNRStatus | null;
  setPnrStatus: (status: PNRStatus | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [pnrNumber, setPnrNumber] = useState("");
  const [trains, setTrains] = useState<Train[]>([]);
  const [pnrStatus, setPnrStatus] = useState<PNRStatus | null>(null);

  return (
    <AppContext.Provider
      value={{
        fromStation,
        toStation,
        setFromStation,
        setToStation,
        pnrNumber,
        setPnrNumber,
        trains,
        setTrains,
        pnrStatus,
        setPnrStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
