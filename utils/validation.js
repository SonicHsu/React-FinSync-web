export function validAmount(amountValue) {
  const amountStr = String(amountValue).trim();
  
  if (amountStr === "") {
    throw new Error("請輸入金額");
  }
  
  const parsedAmount = parseInt(amountStr, 10);
  
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error("請輸入有效金額");
  }
  
  return parsedAmount;
}

export function validDate(dateValue) {
  if (!dateValue) {
    throw new Error("請選擇日期");
  }
  
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  
  if (isNaN(date.getTime())) {
    throw new Error("請選擇有效日期");
  }
  
  return date;
}

export function validNote(noteValue) {
  const noteStr = String(noteValue).trim();
  
  // 簡單的安全檢查，展示安全意識
  if (noteStr.includes('<') || noteStr.includes('>')) {
    throw new Error("備註不可包含特殊符號");
  }
  
  return noteStr;
}