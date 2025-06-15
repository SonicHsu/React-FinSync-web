export function validAmount(amountValue: string | number): number  {
  const amountStr = String(amountValue).trim();

  if (amountStr === "") {
    throw new Error("請輸入金額");
  }

    if (!/^\d+$/.test(amountStr)) {
    throw new Error("請輸入有效金額");
  }

  const parsedAmount = parseInt(amountStr, 10);

  if (parsedAmount <= 0) {
    throw new Error("請輸入有效金額");
  }

  return parsedAmount;
}

export function validDate(dateValue: string | number | Date | null | undefined): Date  {
  if (dateValue == null) {
    throw new Error("請選擇日期");
  }

  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

  if (isNaN(date.getTime())) {
    throw new Error("請選擇有效日期");
  }

  return date;
}

export function validNote(noteValue: string | number): string {
  const noteStr = String(noteValue).trim();

  if (/[<>]/.test(noteStr)) {
    throw new Error("備註不可包含特殊符號");
  }

  return noteStr;
}
