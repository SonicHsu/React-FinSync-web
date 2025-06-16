import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";


export default function AuthButtons() {
 const {user , login, logout} = useAuth();
  useEffect(() => {
    if (user) {
      console.log("目前使用者:", user.displayName);
    }
  }, [user]);

   if (!user) {
    return null; // 或者你可以返回一個空的 React.Fragment: <> </>
  }

  return (
    <div className="mx-auto mt-2 sm:mt-5 lg:mt-8 hidden sm:flex h-[30px] w-[90%] lg:w-[981px] items-center justify-end space-x-2">
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
