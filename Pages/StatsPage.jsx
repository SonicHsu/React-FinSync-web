import StatsDisplay from "../components/StatsDisplay";
import Header from "../components/Header";

export default function StatsPage({  currentDate, setCurrentDate, entries }) {
  return (
    <>
    <Header
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />

    <StatsDisplay entries={entries} currentDate={currentDate} />
    </>
  );
}