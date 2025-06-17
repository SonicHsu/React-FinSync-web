import { useEffect } from "react";
import Header from "../components/ui/Header";
import MonthCalendar from "../components/calendar/MonthCalendar";
import DayCalendar from "../components/calendar/DayCalendar";
import EntryFormDialog from "../components/dialogs/EntryFormDialog";
import EntryDetailDialog from "../components/dialogs/EntryDetailDialog";
import EntryDeleteDialog from "../components/dialogs/EntryDeleteDialog";
import { useBreakpoint } from "../hooks/useBreakpoint";

import { useEntryContext } from "../contexts/entryContext";


export default function CalendarPage() {
  const { isMobile } = useBreakpoint();
  const { calendarView, setCalendarView } = useEntryContext();


  useEffect(() => {
    if (isMobile) {
      setCalendarView("Day");
    }
  }, [isMobile]);

  return (
    <>
      <Header />

      <main className="flex min-h-0 flex-grow flex-col">
        {calendarView === "Month" ? (
          <MonthCalendar
          />
        ) : (
          <DayCalendar
          />
        )}
      </main>

      {/* 所有的對話框 */}
      <EntryFormDialog />

      <EntryDetailDialog
      />

      <EntryDeleteDialog />
    </>
  );
}
