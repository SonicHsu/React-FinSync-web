import { Entry } from "../../types";

interface ModeSelectionProps {
  mode: Entry["mode"];
  setMode: (mode: Entry["mode"]) => void;
}
//施工中
export default function ModeSelection({ mode, setMode }: ModeSelectionProps) {
  return (
    <div className="w-full px-6">
      <ul className="grid grid-cols-4 gap-2 lg:gap-4">
        <li className="relative h-[30px] w-[60px] overflow-hidden rounded-full lg:w-[80px]">
          <div
            className={`${mode === "once" ? "category-button-selected" : "category-button"}`}
            onClick={() => setMode("once")}
          >
            單次
          </div>
        </li>
        {/* <li className="relative h-[30px] w-[60px] overflow-hidden rounded-full lg:w-[80px]">
          <div
            className={`${mode === "recurring" ? "category-button-selected" : "category-button"}`}
            onClick={() => setMode("recurring")}
          >
            週期     
          </div>
        </li>  */} 
      </ul>
    </div>
  );
}
