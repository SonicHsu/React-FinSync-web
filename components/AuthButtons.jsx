import { useState, useEffect } from "react";
import { auth, provider } from "../src/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export default function AuthButtons({user, setUser}) {


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("登入失敗", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log(user);
    } catch (error) {
      console.error("登出失敗", error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("目前使用者:", user.displayName);
    }
  }, [user]);

  return (
    <div className="mx-auto mt-8 flex h-[30px] w-[981px] items-center justify-end space-x-2">
      <div className="text-xl">{user ? user.displayName : ""}</div>
      {!user && (
        <button
          className="flex cursor-pointer items-center justify-center rounded-xl bg-gray-800 px-5 text-xl font-semibold hover:bg-gray-700"
          onClick={login}
        >
          登入
        </button>
      )}
      {user && (
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
