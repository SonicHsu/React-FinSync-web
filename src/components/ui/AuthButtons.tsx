import { useAuth } from "../../contexts/authContext";

import toast from "react-hot-toast";


export default function AuthButtons() {
 const {user , login, logout} = useAuth();

   if (!user) {
    return null; 
  }

  const handleLogin = async () => {
   const {success, errorMsg} =  await login();
   if(success){
    toast.success("登入成功")
   } else {
    toast.error(errorMsg || "登入失敗，請稍後再試！");
   }
  }

  const handleLoginout = async () => {
   const {success, errorMsg} =  await logout();
   if(success){
    toast.success("登出成功")
   } else {
    toast.error(errorMsg || "登出失敗，請稍後再試！");
   }
  }

  return (
     // 只有 sm（手機以上）尺寸才顯示這個區塊（sm 以下是 hidden）
    <div className="mx-auto mt-2 sm:mt-5 lg:mt-8 hidden sm:flex h-[30px] w-[90%] lg:w-[981px] items-center justify-end space-x-2">
      
      {/* 顯示使用者名稱，如果是匿名就顯示 "Guest" */}
      <div className="text-xl">{user.isAnonymous ? "Guest" : user.displayName}</div>
      {user.isAnonymous && (
        <button
          className="flex cursor-pointer items-center justify-center rounded-xl bg-gray-800 px-5 text-xl font-semibold hover:bg-gray-700"
          onClick={handleLogin}
        >
          登入
        </button>
      )}
      {!user.isAnonymous && (
        <button
          className="flex cursor-pointer items-center justify-center rounded-xl bg-gray-800 px-5 text-xl font-semibold hover:bg-gray-700"
          onClick={handleLoginout}
        >
          登出
        </button>
      )}
    </div>
  );
}
