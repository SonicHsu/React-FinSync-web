export default function AuthButtons() {
  return (
    <div className="mx-auto mt-8 flex h-[30px] w-[981px] items-center justify-end space-x-2">
      <div className="text-xl"></div>
      <button className="flex cursor-pointer items-center justify-center rounded-xl bg-gray-800 px-5 text-xl font-semibold hover:bg-gray-700">
        登入
      </button>
      <button className="flex cursor-pointer items-center justify-center rounded-xl bg-gray-800 px-5 text-xl font-semibold hover:bg-gray-700">
        登出
      </button>
    </div>
  );
}
