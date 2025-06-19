import { useState, useEffect } from "react";
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

  // 表單欄位狀態
  const [type, setType] = useState<Entry["type"]>("expense");
  const [category, setCategory] = useState<Entry["category"]>("food");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Entry["date"]>(currentDate);
  const [note, setNote] = useState<Entry["note"]>("");
  const [mode, setMode] = useState<Entry["mode"]>("once");

  // 重置表單到初始狀態
  const resetForm = () => {
    setType("expense");
    setCategory("food");
    setAmount("");
    setDate(currentDate);
    setNote("");
    setMode("once");
  };

  // 當編輯狀態或選中項目改變時，更新表單狀態
  useEffect(() => {
    if (isEditing && selectedEntry) {
      // 編輯模式：載入選中項目的數據
      setType(selectedEntry.type);
      setCategory(selectedEntry.category);
      setAmount(selectedEntry.amount.toString());
      setDate(selectedEntry.date);
      setNote(selectedEntry.note);
      setMode(selectedEntry.mode);
    } else {
      // 新增模式：重置表單並使用當前日期
      resetForm();
    }
  }, [isEditing, selectedEntry, currentDate]);

  // 切換「收入/支出」類型時，預設類別也跟著變（支出預設食物、收入預設薪資）
  const handleTypeChange = (newType: Entry["type"]) => {
    setType(newType);
    if (newType === "expense") {
      setCategory("food"); // 支出預設：飲食
    } else {
      setCategory("salary"); // 收入預設：薪資
    }
  };

  // 表單送出，會做欄位驗證，並呼叫 Firebase API 新增或更新資料
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
        // 編輯模式呼叫 Firebase 修改資料
        await firestoreService.editEntry(
          user.uid,
          selectedEntry.firebaseId,
          data,
        );
      } else if (user?.uid) {
        // 新增模式呼叫 Firebase 新增資料
        await firestoreService.addEntry(user?.uid, data);
      }

      await loadEntries(); // 更新資料列表

      if (!isEditing) {
        resetForm();
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("發生未知錯誤");
      }
      return false;
    }
  };

  return {
    type,
    setType,
    category,
    setCategory,
    amount,
    setAmount,
    date,
    setDate,
    note,
    setNote,
    mode,
    setMode,
    handleTypeChange,
    handleSubmit,
    resetForm,
  };
}
