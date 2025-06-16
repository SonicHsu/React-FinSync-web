import { useEffect } from "react";
import Header from "../components/Header";
import MonthCalendar from "../components/MonthCalendar";
import DayCalendar from "../components/DayCalendar";
import EntryFormDialog from "../components/EntryFormDialog";
import EntryDetailDialog from "../components/EntryDetailDialog";
import EntryDeleteDialog from "../components/EntryDeleteDialog";
import { useBreakpoint } from "../hooks/useBreakpoint";

import { useEntryContext } from "../contexts/entryContext";

import { useEntryDialog } from "../hooks/useEntryDialog";

export default function CalendarPage() {
  const { isMobile } = useBreakpoint();
    const { dialogState, openForm, closeForm, openDetail, closeDetail, openEdit, openDelete, closeDelete } =
    useEntryDialog();

  const { currentView, setCalendarView } = useEntryContext();


  useEffect(() => {
    if (isMobile) {
      setCalendarView("Day");
    }
  }, [isMobile]);

  return (
    <>
      <Header />

      <main className="flex min-h-0 flex-grow flex-col">
        {currentView === "Month" ? (
          <MonthCalendar
          />
        ) : (
          <DayCalendar
          />
        )}
      </main>

      {/* 所有的對話框 */}
      <EntryFormDialog
      />

      <EntryDetailDialog
        open={dialogState.entryDetail}
      />

      <EntryDeleteDialog
        open={dialogState.entryDelete}

      />
    </>
  );
}
