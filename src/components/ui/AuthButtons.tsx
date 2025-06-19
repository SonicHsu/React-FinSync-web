import { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";


export default function AuthButtons() {
 const {user , login, logout} = useAuth();

 // 每次 user 變更時，印出目前使用者名稱（debug用）
  useEffect(() => {
    if (user) {
      console.log("目前使用者:", user.displayName);
    }
  }, [user]);

   if (!user) {
    return null; // 或者你可以返回一個空的 React.Fragment: <> </>
  }

  return (
     // 只有 sm（手機以上）尺寸才顯示這個區塊（sm 以下是 hidden）
    <div className="mx-auto mt-2 sm:mt-5 lg:mt-8 hidden sm:flex h-[30px] w-[90%] lg:w-[981px] items-center justify-end space-x-2">
      
      {/* 顯示使用者名稱，如果是匿名就顯示 "Guest" */}
      <div className="text-xl">{user.isAnonymous ? "Guest" : user.displayName}</div>
      {user.isAnonymous && (
        <button
          className="flex cursor-pointer items-center justify-center rounded-xl bg-gray-800 px-5 text-xl font-semibold hover:bg-gray-700"
          onClick={login}
        >
          登入
        </button>
      )}
      {!user.isAnonymous && (
        <button
          className="flex cursor-pointer items-center justify-center rounded-xl bg-gray-800 px-5 text-xl font-semibold hover:bg-gray-700"
          onClick={logout}
        >
          登出
        </button>
      )}
    </div>
  );
}
