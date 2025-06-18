import { useEffect } from "react";
import StatsContent from "../components/stats/StatsContent";
import Header from "../components/ui/Header";
import { useEntryContext } from "../contexts/entryContext";

export default function StatsPage() {

    const { calendarView, setCalendarView } = useEntryContext();

  useEffect(() => {
    if (calendarView !== "Month") {
      setCalendarView("Month");
    }
  }, [calendarView, setCalendarView]);



  return (
    <>
    <Header />

    <StatsContent  />
    </>
  );
}