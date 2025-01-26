interface RunningDaysProps {
  runningDays: string;
}

const RunningDays = ({ runningDays }: RunningDaysProps) => {
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {daysOfWeek.map((day, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            margin: "0 2px",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: runningDays[index] === "1" ? "#1a365d" : "#94a3b8",
            opacity: runningDays[index] === "1" ? 1 : 0.7,
          }}
        >
          {day}
        </span>
      ))}
    </div>
  );
};

export default RunningDays;
