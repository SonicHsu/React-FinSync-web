import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { db } from "../src/firebase";

export const firestoreService = {
    async addEntry(userId, entryData){
        try{
            const docRef = await addDoc(
                collection(db,"users", userId, "entries"),
                {
                    ...entryData,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            );
            return docRef.id;
        } catch(error) {
            console.error("Error adding entry", error);
            throw error;
        }
    },
    
    async getEntries(userId) {
        try{
            const q = query(
                collection(db, "users", userId, "entries"),
                orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                firebaseId: doc.id,
                ...doc.data(),
                date: doc.data().date.toDate()
            }));
        } catch (error) {
            console.error("Error getting Entries", error);
            throw error;
        }
    },

    async editEntry(userId, firebaseId, entryData) {
        try{
            const docRef = doc(db, "users", userId, "entries", firebaseId);
            await updateDoc(docRef, {
                ...entryData,
                updatedAt: new Date()
            });
        } catch(error) {
            console.error("Error editing entry", error);
            throw error;
        }
    },

    async deleteEntry(userId, firebaseId){
        try{
            const docRef = doc(db, "users", userId, "entries", firebaseId);
            await deleteDoc(docRef);
        } catch(error) {
            console.error("Error deleting entry", error);
            throw error;
        }
    }
}