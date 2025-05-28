import DayCalendarSidebar from "./DayCalendarSidebar"
import DayTransactions from "./DayTransactions"

export default function DayCalendar({date, onDateChange, setDialogState}) {
    return(
         <div className="w-[981px] h-[670px] flex justify-between mx-auto mt-8">
            <DayCalendarSidebar date={date} onDateChange={onDateChange} setDialogState={setDialogState} />
            <DayTransactions />
        </div>
    )
}