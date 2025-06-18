import { firestoreService } from "../../firestoreService.js";
import { useAuth } from "../../contexts/authContext.js";
import { useEntryContext } from "../../contexts/entryContext";
import { useEntryDialog } from "../../hooks/useEntryDialog";


export default function EntryDeleteDialog() {
const {user} = useAuth();
const { selectedEntry, loadEntries }  = useEntryContext();
const {dialogState, closeDelete} = useEntryDialog();



  if (!dialogState.entryDelete || !user || !selectedEntry) return null;

 const handleDeleteButton = async () => {
  try {
    await firestoreService.deleteEntry(user.uid, selectedEntry.firebaseId);
    await loadEntries();
    closeDelete();
  } catch (error) {
    console.error('刪除失敗:', error);
    alert('刪除失敗，請稍後再試');
  }
};

  return (
    <div>
      <div
        className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
        onClick={closeDelete}
      ></div>

      <div
        className="fixed z-50 w-[300px] rounded-[10px] border border-blue-400/50 bg-slate-950/80 lg:w-[420px]"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div className="flex h-full w-full flex-col items-center text-white">
          <div
            className="mt-5 text-center text-xl font-bold lg:text-3xl"
            data-entry-delete-title
          >
            是否確認刪除這筆紀錄？
          </div>

          <div className="m-5 flex w-full justify-between space-x-2 px-6">
            <button
              className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-gray-800 py-0.5 text-lg text-white/50 outline-none hover:bg-gray-600 lg:text-2xl"
              onClick={closeDelete}
            >
              取消
            </button>
            <button
              className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-blue-600 py-0.5 text-lg text-white outline-none hover:bg-blue-400 lg:text-2xl"
              onClick={handleDeleteButton}
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
