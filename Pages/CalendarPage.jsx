import { useState, useEffect } from "react";
import Header from "../components/Header";
import MonthCalendar from "../components/MonthCalendar";
import DayCalendar from "../components/DayCalendar";
import EntryFormDialog from "../components/EntryFormDialog";
import EntryDetailDialog from "../components/EntryDetailDialog";
import EntryDeleteDialog from "../components/EntryDeleteDialog";
import { useBreakpoint } from "../hooks/useBreakpoint";

export default function CalendarPage({
  user,
  currentDate,
  setCurrentDate,
  dialogState,
  setDialogState,
  entries,
  setEntries,
  selectedEntry,
  setSelectedEntry,
  isEditing,
  setIsEditing,
  loadEntries,
}) {
  const [currentView, setCurrentView] = useState("Day");

  const handleOpenEntryForm = () => {
    setDialogState((prev) => ({ ...prev, entryForm: true }));
  };

  const handleCloseEntryForm = () => {
    setDialogState((prev) => ({ ...prev, entryForm: false }));
    setIsEditing(false);
  };

  const handleOpenEntryDetail = (entry) => {
    setSelectedEntry(entry);
    setDialogState((prev) => ({ ...prev, entryDetail: true }));
  };

  const handleCloseEntryDetail = () => {
    setDialogState((prev) => ({ ...prev, entryDetail: false }));
  };

  const handleOpenEntryEdit = () => {
    setIsEditing(true);
    setDialogState((prev) => ({
      ...prev,
      entryDetail: false,
      entryForm: true,
    }));
  };

  const handleOpenEntryDelete = () => {
    setDialogState((prev) => ({
      ...prev,
      entryDetail: false,
      entryDelete: true,
    }));
  };

  const handleCloseEntryDelete = () => {
    setDialogState((prev) => ({ ...prev, entryDelete: false }));
  };

  const { isMobile } = useBreakpoint();


  useEffect(() => {
  if (isMobile) {
    setCurrentView("Day");
  }
}, [isMobile]);


  return (
    <>
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />

      <main className="flex flex-col flex-grow min-h-0">
        {currentView === "Month" ? (
          <MonthCalendar
            date={currentDate}
            handleOpenEntryForm={handleOpenEntryForm}
            entries={entries}
            onViewChange={setCurrentView}
            onDateChange={setCurrentDate}
          />
        ) : (
          <DayCalendar
            date={currentDate}
            onDateChange={setCurrentDate}
            handleOpenEntryForm={handleOpenEntryForm}
            handleOpenEntryDetail={handleOpenEntryDetail}
            entries={entries}
            setSelectedEntry={setSelectedEntry}
          />
        )}
      </main>

      {/* 所有的對話框 */}
      <EntryFormDialog
        open={dialogState.entryForm}
        onClose={handleCloseEntryForm}
        currentDate={currentDate}
        setEntries={setEntries}
        isEditing={isEditing}
        selectedEntry={selectedEntry}
        user={user}
        loadEntries={loadEntries}
      />

      <EntryDetailDialog
        open={dialogState.entryDetail}
        onClose={handleCloseEntryDetail}
        currentDate={currentDate}
        selectedEntry={selectedEntry}
        setSelectedEntry={setSelectedEntry}
        handleOpenEntryEdit={handleOpenEntryEdit}
        handleOpenEntryDelete={handleOpenEntryDelete}
        setIsEditing={setIsEditing}
      />

      <EntryDeleteDialog
        open={dialogState.entryDelete}
        onClose={handleCloseEntryDelete}
        selectedEntry={selectedEntry}
        setEntries={setEntries}
        user={user}
        loadEntries={loadEntries}
      />
    </>
  );
}
