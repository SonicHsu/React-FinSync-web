// 回傳今天的日期（時間為午夜00:00:00）
export function today(): Date {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

// 對指定日期加上指定月份數，並處理跨月天數問題
export function addMonths(date: Date, months: number): Date {
  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + months,
    1,
    date.getHours(),
  );
  const lastDayOfMonth = getLastDayOfMonthDate(firstDayOfMonth);

  // 避免回傳日期超出目標月的最大天數
  const dayOfMonth = Math.min(date.getDate(), lastDayOfMonth.getDate());

  return new Date(
    date.getFullYear(),
    date.getMonth() + months,
    dayOfMonth,
    date.getHours(),
  );
}

// 對指定日期減去指定月份數，透過 addMonths 實現
export function subtractMonths(date: Date, months: number): Date {
  return addMonths(date, -months);
}

// 對指定日期加上指定天數
export function addDays(date: Date, days: number): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + days,
    date.getHours(),
  );
}

// 對指定日期減去指定天數，透過 addDays 實現
export function subtractDays(date: Date, days: number): Date {
  return addDays(date, -days);
}

// 產生月曆中要顯示的所有日期（包含上個月尾端的天數及下個月起始的天數，補滿整週）
export function generateMonthCalendarDays(currentDate: Date): Date[] {
  const calendarDays: Date[] = [];

  // 取得上個月最後一天日期
  const lastDayOfPreviousMonthDate = getLastDayOfMonthDate(
    subtractMonths(currentDate, 1),
  );

  // 取得上個月最後一天是星期幾 (0-6)
  const lastDayOfPreviousMonthWeekDay = lastDayOfPreviousMonthDate.getDay();

  // 若上個月最後一天不是星期六，補上該週前面幾天的日期
  if (lastDayOfPreviousMonthWeekDay !== 6) {
    for (let i = lastDayOfPreviousMonthWeekDay; i >= 0; i -= 1) {
      const calendarDay = subtractDays(lastDayOfPreviousMonthDate, i);
      calendarDays.push(calendarDay);
    }
  }

  // 取得本月最後一天日期
  const lastDayOfCurrentMonthDate = getLastDayOfMonthDate(currentDate);

   // 將本月所有日期加入月曆陣列
  for (let i = 1; i <= lastDayOfCurrentMonthDate.getDate(); i += 1) {
    const calendarDay = addDays(lastDayOfPreviousMonthDate, i);
    calendarDays.push(calendarDay);
  }

  // 補足最後一週剩餘的天數 (保持月曆行數整數倍)
  const totalWeeks = Math.ceil(calendarDays.length / 7);
  const totalDays = totalWeeks * 7;
  const missingDayAmount = totalDays - calendarDays.length;
  for (let i = 1; i <= missingDayAmount; i += 1) {
    const calendarDay = addDays(lastDayOfCurrentMonthDate, i);
    calendarDays.push(calendarDay);
  }

  return calendarDays;
}

// 判斷兩日期是否為同一天（年、月、日均相同）
export function isTheSameDay(dateA: Date, dateB: Date): boolean {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

// 判斷兩日期是否為同一月份（年、月相同）
export function isTheSameMonth(dateA: Date, dateB: Date): boolean {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth()
  );
}

// 取得該日期月份最後一天的日期物件
function getLastDayOfMonthDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// 將日期格式化為 yyyy/mm/dd，符合繁體中文台灣格式
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return date.toLocaleString("zh-TW", options);
}


// 將日期格式化為 yyyy/mm，常用於月份顯示
export function formatMonth(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
  };
  return date.toLocaleString("zh-TW", options);
}

// 格式化為 "2025 年 06 月" 這種中文完整格式，方便 UI 顯示
export function formatMonthZh(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year} 年 ${month} 月`;
}

// 格式化為 "yyyy-mm-dd"，適合報表或統計資料儲存
export function formatDateForStats(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// 格式化為 "yyyy -mm" 格式（中間有空格），用於月份報表顯示
export function formatMonthForStats(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${yyyy} -${mm}`;
}
