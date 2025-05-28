import { useState } from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/entryCategories";

export default function EntryFormDialog({ open, onClose }) {
  if (!open) return null;

  const [type, setType] = useState("expense");
  const [category, setCategory] = useState('飲食');


  return (
    <div>
      <div
        className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
        data-dialog-backdrop
      ></div>

      <div
        className="fixed z-50 w-[420px] rounded-[10px] border border-blue-400/50 bg-slate-950/80"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        data-dialog="entry-form"
      >
        <div
          className="flex h-full w-full flex-col items-center text-white"
          data-entry-form
        >
          <div className="mt-7 text-4xl font-bold">新增交易紀錄</div>

          <div className="dialog-entry-divider"></div>

          <div className="flex h-[30px] w-[250px] items-center justify-center rounded-[90px] bg-gray-400/50">
            <button
              className="button-option-selected font-bold"
              data-entry-type-button="expense"
            >
              支出
            </button>
            <button
              className="button-option font-bold"
              data-entry-type-button="income"
            >
              收入
            </button>
          </div>

          <div className="dialog-entry-divider"></div>

          <div className="min-h-[80px]">
            <ul
              className="grid grid-cols-4 gap-4"
              data-entry-category-list-expense
            >
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div
                  className="category-button-selected"
                  data-entry-category="food"
                >
                  飲食
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-orange-400"></div>
              </li>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div
                  className="category-button"
                  data-entry-category="transport"
                >
                  交通
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-sky-400"></div>
              </li>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div className="category-button" data-entry-category="housing">
                  住房
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-emerald-400"></div>
              </li>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div
                  className="category-button"
                  data-entry-category="entertainment"
                >
                  娛樂
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-pink-400"></div>
              </li>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div className="category-button" data-entry-category="life">
                  生活
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-purple-400"></div>
              </li>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div
                  className="category-button"
                  data-entry-category="expenseOther"
                >
                  其他
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-400"></div>
              </li>
            </ul>
            <ul
              className="grid grid-cols-4 gap-4"
              data-entry-category-list-income
            >
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div
                  className="category-button-selected"
                  data-entry-category="salary"
                >
                  薪資
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-green-400"></div>
              </li>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div className="category-button" data-entry-category="bonus">
                  獎金
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-yellow-400"></div>
              </li>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div
                  className="category-button"
                  data-entry-category="investment"
                >
                  投資
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-indigo-400"></div>
              </li>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div
                  className="category-button"
                  data-entry-category="incomeOther"
                >
                  其他
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-400"></div>
              </li>
            </ul>
          </div>

          <div className="dialog-entry-divider"></div>

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

          <div className="dialog-entry-divider"></div>

          <div>
            <ul className="grid grid-cols-4 gap-4" data-entry-mode-list>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div
                  className="category-button-selected"
                  data-entry-mode="once"
                >
                  單次
                </div>
              </li>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div className="category-button" data-entry-mode="recurring">
                  週期
                </div>
              </li>
            </ul>
          </div>

          <div className="dialog-entry-divider"></div>

          <div className="mb-5 flex w-[368px] justify-between">
            <button
              className="flex h-[40px] w-[174px] items-center justify-center rounded-xl bg-gray-800 text-2xl text-white/50 hover:bg-gray-600"
              data-dialog-cancel-button
            >
              取消
            </button>
            <button
              className="flex h-[40px] w-[174px] items-center justify-center rounded-xl bg-blue-600 text-2xl text-white hover:bg-blue-400"
              data-dialog-confirm-button
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
