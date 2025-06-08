import { useState, useEffect } from "react";
import { auth, provider } from "../src/firebase";
import { onAuthStateChanged, signInWithPopup, signOut, signInAnonymously } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("登入失敗", err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("登出失敗", err);
    }
  };

const loginAsGuest = async () => {
  try {
    await signInAnonymously(auth);
  } catch (err) {
    console.error("訪客登入失敗", err);
  }
};

  return { user, login, logout, loginAsGuest };
}