import { firestoreService } from "../src/firestoreService";

export default function EntryDeleteDialog({ open, onClose, selectedEntry, user, loadEntries }) {
  if (!open) return null;

  const handleDeleteButton = async () => {
     await firestoreService.deleteEntry(user?.uid, selectedEntry.firebaseId)
     await loadEntries();
     onClose();   
  }

  return (
    <div>
      <div
        className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className="fixed z-50 w-[420px] rounded-[10px] border border-blue-400/50 bg-slate-950/80"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div
          className="flex h-full w-full flex-col items-center text-white"
        >
          <div
            className="mt-5 text-center text-3xl font-bold"
            data-entry-delete-title
          >
            是否確認刪除這筆紀錄？
          </div>

          <div className="m-5 flex w-[368px] justify-between">
            <button
              className="flex h-[40px] w-[174px] items-center justify-center rounded-xl bg-gray-800 text-2xl text-white/50 outline-none hover:bg-gray-600 cursor-pointer"
              data-dialog-cancel-button
            >
              取消
            </button>
            <button
              className="flex h-[40px] w-[174px] items-center justify-center rounded-xl bg-blue-600 text-2xl text-white outline-none hover:bg-blue-400 cursor-pointer"
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
