export function validAmount(amountValue: string | number): number  {
  // 轉換為字串並去除前後空白
  const amountStr = String(amountValue).trim();

  // 檢查空值
  if (amountStr === "") {
    throw new Error("請輸入金額");
  }

  // 檢查是否只包含數字
    if (!/^\d+$/.test(amountStr)) {
    throw new Error("請輸入有效金額");
  }

  // 轉換為整數
  const parsedAmount = parseInt(amountStr, 10);

  // 檢查是否為正數
  if (parsedAmount <= 0) {
    throw new Error("請輸入有效金額");
  }

  return parsedAmount;
}

export function validDate(dateValue: string | number | Date | null | undefined): Date  {
  // 檢查空值
  if (dateValue == null) {
    throw new Error("請選擇日期");
  }

  // 如果已經是Date對象則直接使用，否則創建新的Date對象
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

  // 檢查是否為有效日期
  if (isNaN(date.getTime())) {
    throw new Error("請選擇有效日期");
  }

  return date;
}

export function validNote(noteValue: string | number): string {
  // 轉換為字串並去除前後空白
  const noteStr = String(noteValue).trim();

  // 檢查是否包含HTML標籤符號（< 或 >）
  if (/[<>]/.test(noteStr)) {
    throw new Error("備註不可包含特殊符號");
  }

  return noteStr;
}
