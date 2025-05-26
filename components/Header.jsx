export default function Header() {
  return (
    <header className="mx-auto mt-1 flex h-[62px] w-[981px] items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold">簡單記帳</h1>
      </div>

      <nav className="flex items-center space-x-10">
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center space-x-1">
            <button
              className="flex h-[38px] items-center justify-center rounded-[10px] bg-gray-400/20 px-4 text-2xl text-gray-400/60 hover:bg-blue-400/60 hover:text-white"
            >
              Today
            </button>
            <button className="flex space-x-1">
              <div
                className="flex h-[38px] items-center justify-center rounded-[10px] border border-blue-400/50 bg-white/10 px-2 text-3xl hover:bg-blue-400/50"
              ></div>

              <div
                className="flex h-[38px] items-center justify-center rounded-[10px] border border-blue-400/50 bg-white/10 px-2 text-3xl hover:bg-blue-400/50"
              ></div>

              <div
                className="flex h-[38px] items-center justify-center rounded-[10px] border border-blue-400/50 bg-white/10 px-2 text-3xl hover:bg-blue-400/50"
              ></div>
            </button>

            <input
              type="date"
              className="absolute inset-0 -z-10 h-full w-full opacity-0"
            />

            <span
              className="w-12 text-center text-2xl font-medium text-white/50"
            ></span>
          </div>

          <button className="group">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="opacity-70 transition duration-150 ease-in-out group-hover:opacity-100">
                <path
                  d="M15 10L10 15M10 15L15 20M10 15H20M27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15Z"
                  className="transtition stroke-white duration-150 ease-in-out group-hover:stroke-gray-200"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </button>
          <button className="group">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="opacity-70 transition duration-150 ease-in-out group-hover:opacity-100">
                <path
                  d="M15 20L20 15M20 15L15 10M20 15H10M27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15Z"
                  className="stroke-white transition duration-150 ease-in-out group-hover:stroke-gray-200"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </button>
        </div>
        <div className="flex h-[30px] w-[250px] items-center justify-center rounded-[90px] bg-gray-400/50">
          <button className="button-option-selected">
            Day
          </button>
          <button className="button-option">
            Month
          </button>
        </div>
      </nav>
    </header>
  );
}
