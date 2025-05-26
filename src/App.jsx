import { useState } from "react";
import AuthButtons from "../components/AuthButtons";
import Header from "../components/Header";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 font-sans text-white">
      <AuthButtons />
      <Header />
    </div>
  );
}
