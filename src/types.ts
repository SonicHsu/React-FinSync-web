export interface Entry {
  id: string;
  type: "expense" | "income";
  category: string;
  amount: number;
  date: Date | string;
  note: string;
  mode: "once" | "recurring";
}

export interface DialogState {
  entryForm: boolean;
  entryDetail: boolean;
  entryDelete: boolean;
  viewStats: boolean;
}

export interface FirestoreEntry extends Entry {
  firebaseId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type View = "Day" | "Month" | "Year";


export type statType = "expense" | "income";