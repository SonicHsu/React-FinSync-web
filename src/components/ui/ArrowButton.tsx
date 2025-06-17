type ArrowButtonProps = {
  direction?: "left" | "right";
  onClick: () => void;
};

export default function ArrowButton({ direction = "left", onClick }: ArrowButtonProps) {
  const isLeft = direction === "left";
  const path = isLeft
    ? "M15 10L10 15M10 15L15 20M10 15H20M27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15Z"
    : "M15 20L20 15M20 15L15 10M20 15H10M27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15Z";

  return (
    <button className="group cursor-pointer" onClick={onClick}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="opacity-70 transition duration-150 ease-in-out group-hover:opacity-100">
          <path
            d={path}
            className="stroke-white transition duration-150 ease-in-out group-hover:stroke-gray-200"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </button>
  );
}
