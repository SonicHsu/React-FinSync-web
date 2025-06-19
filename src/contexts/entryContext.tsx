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
  calendarView: View; // 行事曆顯示模式 (Day, Month, Year)
  setCalendarView: (calendarView: View) => void;
  currentDate: Date; // 目前選擇的日期
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  dialogState: DialogState; // 控制各種彈窗開關狀態
  setDialogState: React.Dispatch<React.SetStateAction<DialogState>>;
  isEditing: boolean; // 是否正在編輯條目
  setIsEditing: (isEditing: boolean) => void;
  selectedEntry: FirestoreEntry | null; // 目前選中的條目
  setSelectedEntry: (selectedEntry: FirestoreEntry | null) => void;
  entries: FirestoreEntry[]; // 目前使用者所有帳目條目資料
  statType: statType; // 統計類型 (expense/income)
  setStatType: (statType: statType) => void;
  loadEntries: () => Promise<void>; // 重新從 firestore 載入條目
};

// 建立 Context，初始值為 undefined，使用前要確認 Provider 包裹
const EntryContext = createContext<EntryContextType | undefined>(undefined);

// Provider 元件，包裹 App 或相關組件，提供條目資料與狀態管理
export const EntryProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [calendarView, setCalendarView] = useState<View>("Day");
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [dialogState, setDialogState] = useState<DialogState>({
    entryForm: false,
    entryFormType: "expense",
    entryDetail: false,
    entryDelete: false,
    viewStats: false,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<FirestoreEntry | null>(
    null,
  );
  const [entries, setEntries] = useState<FirestoreEntry[]>([]);
  const [statType, setStatType] = useState<statType>("expense");

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

// 自訂 Hook，方便在其他元件使用 Context，且未包裹 Provider 時會報錯提醒
export const useEntryContext = (): EntryContextType => {
  const context = useContext(EntryContext);
  if (!context) throw new Error("useEntryContext 必須在 EntryProvider 內使用");
  return context;
};
