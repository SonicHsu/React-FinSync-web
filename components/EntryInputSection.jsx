export default function EntryInputSection() {
    return (
        <div>
            <div className="flex w-[368px] justify-between">
            <div className="flex h-[30px] w-[174px] items-center justify-between rounded-xl bg-gray-800 px-3">
              <span className="text-sm text-gray-400">金額</span>
              <input
                className="w-24 appearance-none border-none bg-transparent text-right text-xl font-medium text-white outline-none focus:ring-0"
                type="text"
                inputmode="numeric"
                data-entry-amount-input
              />
            </div>

            <div className="relative flex h-[30px] w-[174px] items-center justify-between rounded-xl bg-gray-800 px-3">
              <span className="text-sm text-gray-400">日期</span>
              <span
                className="z-10 cursor-pointer text-xl font-medium"
                data-entry-date
              ></span>
              <input
                type="date"
                className="absolute inset-0 h-full w-full opacity-0"
                data-entry-date-picker
              />
            </div>
          </div>

          <div className="mt-2">
            <div className="flex w-[368px] items-center justify-between rounded-xl bg-gray-800 px-3">
              <span className="text-sm text-gray-400">備註</span>
              <input
                className="w-[300px] appearance-none border-none bg-transparent text-left text-xl font-medium text-white outline-none focus:ring-0"
                type="text"
                inputmode="numeric"
                data-entry-note-input
              />
            </div>
          </div>
        </div>
    )
}