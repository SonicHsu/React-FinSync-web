import { isTheSameMonth } from "../utils/dateUtils"
import { calculateCategoryStats } from "../utils/calculator"

export default function StatsDisplay({entries, currentDate}) {
    const { expenseStats, incomeStats } = calculateCategoryStats(entries, currentDate, isTheSameMonth)

    console.log(expenseStats)
    console.log(incomeStats)

    return(
        <div className="mx-auto mt-8 flex w-[981px] flex-col bg-white/20 items-center justify-between">
            <h1>{expenseStats[0].amount}</h1>
            <h1>{expenseStats[1].amount}</h1>
            <h1>{expenseStats[2].amount}</h1>
            <h1>{expenseStats[3].amount}</h1>
            <h1>{expenseStats[4].amount}</h1>
            <h1>{expenseStats[5].amount}</h1>
        </div>
    )
}