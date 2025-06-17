export default function EntryCategoryButton({
  category,
  label,
  color,
  selected,
  onClick,
}) {
  return (
    <li className="relative h-[30px] w-[60px] overflow-hidden rounded-full lg:w-[80px]">
      <div
        className={`${selected ? "category-button-selected" : "category-button"}`}
        onClick={() => onClick(category)}
      >
        {label}
      </div>
      <div className={`absolute bottom-0 left-0 h-1 w-full ${color}`}></div>
    </li>
  );
}
