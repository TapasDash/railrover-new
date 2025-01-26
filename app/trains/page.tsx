"use client";

import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import axios from "axios";
import { ArrowRight, Clock } from "lucide-react";

// Sample data for trains
const sampleTrains = [
  {
    number: "12301",
    name: "Rajdhani Express",
    departure: "22:00",
    arrival: "10:00",
    duration: "12h 00m",
  },
  {
    number: "12259",
    name: "Sealdah Duronto",
    departure: "20:30",
    arrival: "07:00",
    duration: "10h 30m",
  },
  {
    number: "12302",
    name: "New Delhi Rajdhani",
    departure: "16:50",
    arrival: "10:00",
    duration: "17h 10m",
  },
  {
    number: "12951",
    name: "Mumbai Rajdhani",
    departure: "16:55",
    arrival: "08:15",
    duration: "15h 20m",
  },
  {
    number: "12303",
    name: "Poorva Express",
    departure: "20:40",
    arrival: "18:30",
    duration: "21h 50m",
  },
];
export const extractCode = (str: string) => {
  const startIndex = str.indexOf("(") + 1;
  const endIndex = str.indexOf(")");
  const code = str.substring(startIndex, endIndex);
  return code;
};
export default function Trains() {
  const { fromStation, toStation, trains, setTrains } = useAppContext();
  const getTrainBetweenStations = async (
    fromStation: string,
    toStation: string
  ) => {
    console.log("getTrainBetweenStations", { fromStation, toStation });
    console.log("new env--->", process.env.NEXT_PUBLIC_TRAIN_TIMETABLE_URL);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_TRAIN_TIMETABLE_URL}/from/${fromStation}/to/${toStation}`
    ); // { stationCode: fromStation, destinationStation: toStation }
    console.log({ response });
    console.log("---->", response.data);
    return response?.data?.trains;
  };

  useEffect(() => {
    const fetchTrains = async () => {
      console.log("fetchTrains", { fromStation, toStation });
      const trains = await getTrainBetweenStations(
        extractCode(fromStation),
        extractCode(toStation)
      );
      setTrains(trains || []);
    };
    fetchTrains();
  }, [fromStation, toStation, setTrains]);

  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center my-6 text-blue-600">
          Available Trains
        </h1>
        <h2 className="text-lg font-semibold mb-4 text-center">
          {fromStation} <ArrowRight className="inline mx-2" /> {toStation}
        </h2>
        <div className="space-y-4">
          {trains.map((train: any) => (
            <div
              key={train.trainNo}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">{train.trainName}</span>
                <span className="text-sm text-gray-600">#{train.trainNo}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>{train.departure}</span>
                <ArrowRight size={16} className="text-blue-600" />
                <span>{train.arrival}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={14} className="mr-1" />
                  <span>{train.travelTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Navigation />
    </main>
  );
}
