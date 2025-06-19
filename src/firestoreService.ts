import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp ,
} from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";

import { db } from "./firebase";

import { Entry, FirestoreEntry } from "./types";

function convertDocToFirestoreEntry(docId: string, data: DocumentData): FirestoreEntry {
  return {
    firebaseId: docId,            // Firestore 文件 ID
    id: data.id ?? "",            // 你自己產生的 UUID，確保有預設值
    type: data.type ?? "expense",
    category: data.category ?? "",
    amount: data.amount ?? 0,
    // 處理 Firestore Timestamp 與 Date 對象的轉換
    date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
    note: data.note ?? "",
    mode: data.mode ?? "once",
    // 處理創建時間的轉換
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
    // 處理更新時間的轉換
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
  };
}

export const firestoreService = {
  async addEntry(userId: string, entryData: Entry): Promise<string> {
    try {
      const now = new Date();

      // 路徑: users/{userId}/entries
      const docRef = await addDoc(collection(db, "users", userId, "entries"), {
        ...entryData,
        createdAt: now,// 自動添加創建時間戳
        updatedAt: now,// 自動添加更新時間戳
      });
      return docRef.id;// 返回新文件的 ID
    } catch (error) {
      console.error("Error adding entry", error);
      throw error;
    }
  },

  async getEntries(userId: string): Promise<FirestoreEntry[]> {
    try {
      // 建立查詢：按 createdAt 升序排序
      const q = query(
        collection(db, "users", userId, "entries"),
        orderBy("createdAt", "asc"),
      );
      const querySnapshot = await getDocs(q);

      // 將每個文件轉換為標準格式
      return querySnapshot.docs.map(doc => convertDocToFirestoreEntry(doc.id, doc.data()));
    } catch (error) {
      console.error("Error getting Entries", error);
      throw error;
    }
  },

  async editEntry(userId: string, firebaseId: string, entryData: Entry): Promise<void> {
    try {
      const docRef = doc(db, "users", userId, "entries", firebaseId);
      await updateDoc(docRef, {
        ...entryData,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error editing entry", error);
      throw error;
    }
  },

  async deleteEntry(userId: string, firebaseId: string): Promise<void> {
    try {
      const docRef = doc(db, "users", userId, "entries", firebaseId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting entry", error);
      throw error;
    }
  },
};
