export default function DateBox({ value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex h-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-blue-400/50 bg-white/10 px-2 text-3xl hover:bg-blue-400/50"
    >
      {value}
    </div>
  );
}