"use client";

import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import axios from "axios";
import { Train } from "lucide-react";
import { ArrowRight, Clock } from "lucide-react";
import RunningDays from "@/components/RunningDays";
import { extractCode } from "@/utils/utils";

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
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        paddingBottom: "4rem",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            margin: "1.5rem 0",
            color: "#2563eb",
          }}
        >
          Available Trains
        </h1>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {trains.map((train: any) => (
            <div
              key={train.trainNo}
              style={{
                backgroundColor: "white",
                borderRadius: "0.75rem",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                padding: "1.5rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  alignItems: "center",
                }}
              >
                {/* Left Station */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    {train.sourceStationCode}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {train.sourceStationName}
                  </div>
                  <div style={{ fontSize: "1.125rem", fontWeight: "600" }}>
                    {train.fromTime}
                  </div>
                </div>

                {/* Center - Train Details */}
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    {train.trainNo}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#6b7280",
                    }}
                  >
                    {train.trainName}
                  </div>
                  <RunningDays
                    runningDays={train.runningDays}
                    key={train._id}
                  />
                </div>

                {/* Right Station */}
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    {train.destinationStationCode}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {train.destinationStationName}
                  </div>
                  <div style={{ fontSize: "1.125rem", fontWeight: "600" }}>
                    {train.toTime}
                  </div>
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
