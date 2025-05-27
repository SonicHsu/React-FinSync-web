import DayCalendarSidebar from "./DayCalendarSidebar"
import DayTransactions from "./DayTransactions"

export default function DayCalendar() {
    return(
         <div className="w-[981px] h-[670px] flex justify-between mx-auto mt-8 " data-day-calendar>
            <DayCalendarSidebar />
            <DayTransactions />
        </div>
    )
}