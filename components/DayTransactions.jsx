export default function DayTransactions() {
    return(
                    <div className="w-[685px] h-[668px] flex flex-col items-center rounded-[10px] bg-gray-800/30">
                <div className="w-[645px] h-[50px] flex justify-between mt-5">
                    <div className="w-[310px] rounded-[10px] flex items-center justify-between bg-gray-400/50 px-3">
                        <span className="font-semibold text-2xl">當日支出</span>
                        <span className="text-4xl" data-today-expense>0</span>
                    </div>
                    <div className="w-[310px] rounded-[10px] flex items-center justify-between bg-blue-400/50 px-3">
                        <span className="font-semibold text-2xl">當日收入</span>
                        <span className="text-4xl" data-today-income>0</span>
                    </div>
                </div>

                <div className="w-[645px] mt-3 h-[550px] overflow-y-auto custom-scrollbar">
                    <ul className="flex flex-col px-4" data-entry-list>
                    </ul>
                </div>
            </div>
    )
}