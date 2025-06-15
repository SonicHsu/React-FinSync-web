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
import { db } from "./firebase";

import { Entry, FirestoreEntry } from "./types";

export const firestoreService = {
  async addEntry(userId: string, entryData: Entry): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "users", userId, "entries"), {
        ...entryData,
        createdAt: new Date(),
        updatedAt: new Date(),
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

      return querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    firebaseId: doc.id,
                    ...data,
                    // 安全地處理日期轉換
                    date: data.date instanceof Timestamp ? data.date.toDate() : data.date,
                } as FirestoreEntry;
            });
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
