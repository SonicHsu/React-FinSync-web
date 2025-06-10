import { useNavigate } from "react-router-dom";

export default function CalendarActionButtons({ handleOpenEntryForm }) {
  const navigate = useNavigate();

  const handleStatsButton = () => {
    navigate("/stats");
  };

  return (
    <div className="space-x-2 flex">
      <button
        className="bg-white/10 w-[62px] h-[62px] rounded-full group cursor-pointer transition  duration-150 ease-in-out hover:scale-105 lg:hidden flex justify-center items-center"
        onClick={handleOpenEntryForm}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-round-icon lucide-user-round "
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 0 0-16 0" />
        </svg>
      </button>
      <button
        className="group cursor-pointer transition duration-150 ease-in-out hover:scale-105"
        onClick={handleOpenEntryForm}
      >
        <svg
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="31"
            cy="31"
            r="31"
            className="fill-blue-600 transition duration-150 ease-in-out group-hover:fill-blue-700"
          />
          <path
            d="M31 17V45M17 31H45"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        className="group cursor-pointer transition duration-150 ease-in-out hover:scale-105"
        onClick={handleStatsButton}
      >
        <svg
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="31"
            cy="31"
            r="31"
            className="fill-white/10 transition duration-150 ease-in-out group-hover:fill-white/20"
          />
          <path
            d="M43 47V27M31 47V15M19 47V35"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
