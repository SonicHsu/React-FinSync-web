import { useNavigate } from "react-router-dom";

export default function CalendarActionButtons({ handleOpenEntryForm }) {
  const navigate = useNavigate();


  const handleStatsButton = () => {
    navigate("/stats");
  };
  

  return (
    <div className="space-x-2">
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
      <button className="group cursor-pointer transition duration-150 ease-in-out hover:scale-105"
      onClick={handleStatsButton}>
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
