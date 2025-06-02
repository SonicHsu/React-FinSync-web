export function calculateDateTotals(entries) {
   return entries.reduce(
    (acc, entry) => {
      if (entry.type === "expense") {
        acc.expenseTotal += entry.amount;
      } else if (entry.type === "income") {
        acc.incomeTotal += entry.amount;
      }
      return acc;
    },
    { expenseTotal: 0, incomeTotal: 0 }
  );  
}