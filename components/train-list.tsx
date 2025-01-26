import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

// const trains = [
//   {
//     number: "12301",
//     name: "Rajdhani Express",
//     departure: "22:00",
//     arrival: "10:00",
//     duration: "12h 00m",
//   },
//   {
//     number: "12259",
//     name: "Sealdah Duronto",
//     departure: "20:30",
//     arrival: "07:00",
//     duration: "10h 30m",
//   },
//   {
//     number: "12302",
//     name: "New Delhi Rajdhani",
//     departure: "16:50",
//     arrival: "10:00",
//     duration: "17h 10m",
//   },
// ];

export function TrainList() {
  const { trains } = useAppContext();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Available Trains</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Train Number</TableHead>
            <TableHead>Train Name</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Arrival</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trains.map((train: any) => (
            <TableRow key={train.trainNo}>
              <TableCell>{train.trainNo}</TableCell>
              <TableCell>{train.trainName}</TableCell>
              <TableCell>{train.fromTime}</TableCell>
              <TableCell>{train.toTime}</TableCell>
              <TableCell>{train.travelTime}</TableCell>
              <TableCell>
                <Button variant="outline">Book</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
