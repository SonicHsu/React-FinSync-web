import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { validAmount, validDate, validNote } from "../utils/validation";
import { firestoreService } from "../firestoreService";
import { useAuth } from "../contexts/authContext";
import { useEntryContext } from "../contexts/entryContext";
import { Entry } from "../types";

export function useEntryForm() {
  const { user } = useAuth();
  const { currentDate, isEditing, selectedEntry, loadEntries } =
    useEntryContext();

  const [type, setType] = useState<Entry["type"]>(
    isEditing && selectedEntry ? selectedEntry.type : "expense",
  );
  const [category, setCategory] = useState<Entry["category"]>(
    isEditing && selectedEntry ? selectedEntry.category : "food",
  );
  const [amount, setAmount] = useState<string>(
    isEditing && selectedEntry ? selectedEntry.amount.toString() : "",
  );
  const [date, setDate] = useState<Entry["date"]>(
    isEditing && selectedEntry ? selectedEntry.date : currentDate,
  );
  const [note, setNote] = useState<Entry["note"]>(
    isEditing && selectedEntry ? selectedEntry.note : "",
  );
  const [mode, setMode] = useState<Entry["mode"]>(
    isEditing && selectedEntry ? selectedEntry.mode : "once",
  );

  const handleTypeChange = (newType: Entry["type"]) => {
    setType(newType);
    if (newType === "expense") {
      setCategory("food"); // 支出預設：飲食
    } else {
      setCategory("salary"); // 收入預設：薪資
    }
  };

  const handleSubmit = async () => {
    try {
      const data: Entry = {
        id: isEditing && selectedEntry ? selectedEntry.id : uuidv4(),
        type: type,
        category: category,
        amount: validAmount(amount),
        date: validDate(date),
        note: validNote(note),
        mode: mode,
      };

      if (isEditing && selectedEntry && user?.uid) {
        await firestoreService.editEntry(
          user.uid,
          selectedEntry.firebaseId,
          data,
        );
      } else if (user?.uid) {
        await firestoreService.addEntry(user?.uid, data);
      }

      await loadEntries();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message); // ✅ 正確用法
      } else {
        alert("發生未知錯誤");
      }
      return false;
    }
  };

    return {
    type, setType,
    category, setCategory,
    amount, setAmount,
    date, setDate,
    note, setNote,
    mode, setMode,
    handleTypeChange,
    handleSubmit,
  };
}
