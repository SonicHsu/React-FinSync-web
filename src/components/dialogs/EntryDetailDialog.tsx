import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../../constants/entryCategories";
import { formatDate } from "../../utils/dateUtils";

export default function EntryDetailDialog({
  open,
  onClose,
  selectedEntry,
  handleOpenEntryEdit,
  handleOpenEntryDelete,
}) {
  if (!open) return null;

  const categoryList =
    selectedEntry.type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const matchedCategory = categoryList.find(
    (item) => item.category === selectedEntry.category,
  );

  return (
    <div>
      <div
        className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className="fixed z-50 w-[300px] rounded-[10px] border border-blue-400/50 bg-slate-950/80 lg:w-[420px]"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div className="flex h-full w-full flex-col items-center px-6 text-white">
          <div className="mt-4 flex w-full items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <div className="hidden lg:flex"></div>

            <div className="text-center text-2xl font-bold lg:text-3xl">
              交易明細
            </div>
            <div className="flex justify-end space-x-2">
              <span className="cursor-pointer" onClick={handleOpenEntryEdit}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.7">
                    <path
                      d="M10 16.6667H17.5M13.75 2.91669C14.0815 2.58517 14.5312 2.39893 15 2.39893C15.2321 2.39893 15.462 2.44465 15.6765 2.53349C15.891 2.62233 16.0858 2.75254 16.25 2.91669C16.4142 3.08085 16.5444 3.27572 16.6332 3.4902C16.722 3.70467 16.7678 3.93455 16.7678 4.16669C16.7678 4.39884 16.722 4.62871 16.6332 4.84319C16.5444 5.05766 16.4142 5.25254 16.25 5.41669L5.83333 15.8334L2.5 16.6667L3.33333 13.3334L13.75 2.91669Z"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>

              <span className="cursor-pointer" onClick={handleOpenEntryDelete}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.7">
                    <path
                      d="M2.5 4.99984H4.16667M4.16667 4.99984H17.5M4.16667 4.99984V16.6665C4.16667 17.1085 4.34226 17.5325 4.65482 17.845C4.96738 18.1576 5.39131 18.3332 5.83333 18.3332H14.1667C14.6087 18.3332 15.0326 18.1576 15.3452 17.845C15.6577 17.5325 15.8333 17.1085 15.8333 16.6665V4.99984M6.66667 4.99984V3.33317C6.66667 2.89114 6.84226 2.46722 7.15482 2.15466C7.46738 1.8421 7.89131 1.6665 8.33333 1.6665H11.6667C12.1087 1.6665 12.5326 1.8421 12.8452 2.15466C13.1577 2.46722 13.3333 2.89114 13.3333 3.33317V4.99984M8.33333 9.1665V14.1665M11.6667 9.1665V14.1665"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>

              <span className="cursor-pointer" onClick={onClose}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.7">
                    <path
                      d="M15 5L5 15M5 5L15 15"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>

          <div className="mt-4 flex w-full items-center justify-between">
            <div className="flex items-center space-x-1">
              <span
                className={`inline-block h-3 w-3 rounded-full lg:h-4 lg:w-4 ${matchedCategory.color}`}
              ></span>
              <span className="text-lg lg:text-2xl">
                {matchedCategory.label}
              </span>
            </div>

            <div
              className={`flex rounded-full px-3 text-xl lg:px-4 lg:text-2xl ${selectedEntry.type === "expense" ? "bg-gray-400/50" : "bg-blue-400/50"}`}
            >
              {selectedEntry.amount}
            </div>
          </div>

          <div className="mt-4 w-full">
            <div className="w-full items-center rounded-xl bg-gray-800/50 px-2 py-1 text-xl text-white/50 lg:text-2xl">
              {selectedEntry.note}
            </div>
          </div>

          <div className="m-4 text-xl lg:text-2xl">
            {formatDate(selectedEntry.date)}
          </div>
        </div>
      </div>
    </div>
  );
}
