"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Navigation } from "@/components/Navigation";
import RunningDays from "@/components/RunningDays";
import { extractCode } from "@/utils/utils";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import TrainLoadingAnimation from "@/components/TrainLoadingAnimation";

async function getTrains(fromStation: string, toStation: string) {
  let res: any = await fetch(
    `${process.env.NEXT_PUBLIC_TRAIN_TIMETABLE_URL}/from/${fromStation}/to/${toStation}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch trains");
  }
  res = await res.json();
  console.log({ res });
  return res?.trains;
}

export default function Trains() {
  const { fromStation, toStation, trains, setTrains } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (fromStation === "" || toStation === "") {
      router.push("/");
    } else if (fromStation && toStation) {
      setIsLoading(true);
      setError(null);
      getTrains(extractCode(fromStation), extractCode(toStation))
        .then((trains) => {
          setTrains(trains);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    } else {
      setIsModalOpen(true);
    }
  }, [fromStation, toStation, setTrains]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/");
  };

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
        {isLoading ? (
          <TrainLoadingAnimation />
        ) : error ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
            {error}
          </div>
        ) : trains.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            No trains found for the selected route.
          </div>
        ) : (
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
                    <RunningDays runningDays={train.runningDays} />
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
        )}
      </div>
      <Navigation />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Station Selection Required
        </h2>
        <p>
          Please select both "From" and "To" stations before viewing trains.
        </p>
      </Modal>
    </main>
  );
}
