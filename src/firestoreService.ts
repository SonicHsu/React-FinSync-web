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
    date: data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date),
    note: data.note ?? "",
    mode: data.mode ?? "once",
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(data.updatedAt),
  };
}

export const firestoreService = {
  async addEntry(userId: string, entryData: Entry): Promise<string> {
    try {
      const now = new Date();
      const docRef = await addDoc(collection(db, "users", userId, "entries"), {
        ...entryData,
        createdAt: now,
        updatedAt: now,
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding entry", error);
      throw error;
    }
  },

  async getEntries(userId: string): Promise<FirestoreEntry[]> {
    try {
      const q = query(
        collection(db, "users", userId, "entries"),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(q);

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
