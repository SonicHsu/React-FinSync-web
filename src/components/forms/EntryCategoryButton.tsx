import { Category } from "../../types";

interface EntryCategoryButtonProps {
  category: Category["category"];
  label: Category["label"];
  color: Category["color"];
  selected: boolean;
  onClick: (category: Category["category"]) => void;
}

export default function EntryCategoryButton({
  category,
  label,
  color,
  selected,
  onClick,
}: EntryCategoryButtonProps) {
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
