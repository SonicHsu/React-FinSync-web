import { useEntryContext } from "../contexts/entryContext";
import { FirestoreEntry } from "../types";

export function useEntryDialog() {
  const {
    dialogState,
    setDialogState,
    setSelectedEntry,
    setIsEditing,
  } = useEntryContext();

    const openForm = () => {
    setDialogState((prev) => ({ ...prev, entryForm: true }));
  };

    const closeForm = () => {
    setDialogState((prev) => ({ ...prev, entryForm: false }));
    setIsEditing(false);
  };

    const openDetail = (entry: FirestoreEntry) => {
    setSelectedEntry(entry);
    setDialogState((prev) => ({ ...prev, entryDetail: true }));
  };

    const closeDetail = () => {
    setDialogState((prev) => ({ ...prev, entryDetail: false }));
  };

    const openEdit = () => {
    setIsEditing(true);
    setDialogState((prev) => ({
      ...prev,
      entryDetail: false,
      entryForm: true,
    }));
  };

    const openDelete = () => {
    setDialogState((prev) => ({
      ...prev,
      entryDetail: false,
      entryDelete: true,
    }));
  };

    const closeDelete = () => {
    setDialogState((prev) => ({ ...prev, entryDelete: false }));
  };

    return {
    dialogState,
    openForm,
    closeForm,
    openDetail,
    closeDetail,
    openEdit,
    openDelete,
    closeDelete,
  };
}