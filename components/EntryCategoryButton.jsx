export default function EntryCategoryButton() {
  return (
    <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
      <div className="category-button-selected" data-entry-category="food">
        飲食
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-orange-400"></div>
    </li>
  );
}
