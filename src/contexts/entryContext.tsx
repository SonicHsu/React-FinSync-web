import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./authContext";
import { firestoreService } from "../firestoreService";
import { today } from "../utils/dateUtils";
import { DialogState, FirestoreEntry, View, statType } from "../types";

type EntryContextType = {
  calendarView: View;
  setCalendarView: React.Dispatch<React.SetStateAction<View>>
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  dialogState: DialogState;
  setDialogState: React.Dispatch<React.SetStateAction<DialogState>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEntry: FirestoreEntry | null;
  setSelectedEntry: React.Dispatch<React.SetStateAction<FirestoreEntry | null>>;
  entries: FirestoreEntry[];
  statType: statType;
  setStatType: React.Dispatch<React.SetStateAction<statType>>;
  loadEntries: () => Promise<void>;
};

const EntryContext = createContext<EntryContextType | undefined>(undefined);

export const EntryProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [calendarView, setCalendarView] = useState<View>("Day");
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [dialogState, setDialogState] = useState<DialogState>({
    entryForm: false,
    entryDetail: false,
    entryDelete: false,
    viewStats: false,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<FirestoreEntry | null>(null);
  const [entries, setEntries] = useState<FirestoreEntry[]>([]);
  const [statType, setStatType] = useState<statType>("expense")

  const loadEntries = async () => {
    if (!user) return;

    try {
      const firestoreData = await firestoreService.getEntries(user.uid); // 這裡從 Firebase 撈資料
      setEntries(firestoreData);
    } catch (error) {
      console.error("讀取失敗:", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadEntries();
    } else {
      setEntries([]);
      setSelectedEntry(null);
    }
  }, [user]);

  return (
    <EntryContext.Provider
      value={{
        calendarView,
        setCalendarView,
        currentDate,
        setCurrentDate,
        dialogState,
        setDialogState,
        isEditing,
        setIsEditing,
        selectedEntry,
        setSelectedEntry,
        entries,
        statType,
        setStatType,
        loadEntries,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};

export const useEntryContext = (): EntryContextType => {
    const context = useContext(EntryContext);
    if (!context) throw new Error("useEntryContext 必須在 EntryProvider 內使用");
    return context;
};