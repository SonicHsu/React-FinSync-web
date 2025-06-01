import { useMemo } from "react";

export const useDayTotals =(entries) => {
    return useMemo(() => {
        return entries.reduce((acc, entry) => {
            if(entry.type === "expense"){
                acc.dayExpenseTotal += entry.amount;
            }
            else if(entry.type === "income"){
                acc.dayIncomeTotal += entry.amount;
            }
            return acc;
        },{dayExpenseTotal:0,dayIncomeTotal:0})
    },[entries])
}