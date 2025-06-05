import DayCalendarSidebar from "./DayCalendarSidebar"
import DayEntryList from "./DayEntryList"

export default function DayCalendar({date, onDateChange, handleOpenEntryForm, handleOpenEntryDetail, entries, setSelectedEntry}) {
    return(
         <div className="w-[981px] h-[670px] flex justify-between mx-auto mt-8">
            <DayCalendarSidebar date={date} onDateChange={onDateChange} handleOpenEntryForm={handleOpenEntryForm} />
            
            <DayEntryList
            selectedDate={date}
            entries={entries}
            handleOpenEntryDetail={handleOpenEntryDetail}
            setSelectedEntry={setSelectedEntry} />
        </div>
    )
}