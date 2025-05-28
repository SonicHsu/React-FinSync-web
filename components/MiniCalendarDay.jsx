export default function MiniCalendarDay({day, currentDate, onClick, isToday, isSelected}) {
    const currentMonth = currentDate.getMonth();    

    return (
        <li className={`mini-calendar-item cursor-pointer ${day.getMonth() !== currentMonth ? "opacity-25" : ""} 
        ${isToday ? "mini-calendar-date-today" : "" } ${isSelected ? "mini-calendar-date-selected" : "" }
        `} onClick={onClick}>{day.getDate()}</li>
    )
}