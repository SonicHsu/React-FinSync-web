export interface Entry {
  id: string;
  type: "expense" | "income";
  category: string;
  amount: number;
  date: Date;
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

export interface Category {
  category: string; // 分類代號
  label: string; // 顯示用標籤（中文）
  color: TailwindColor; // Tailwind 顏色 class
  chartColor: HexColor; // 圖表用的 HEX 色碼
}

type TailwindColor = `bg-${string}`;
type HexColor = `#${string}`;

export type CategoryStat = Category & { amount: number };
