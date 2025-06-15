import { useState } from "react";
import StatsDisplay from "../components/StatsDisplay";
import Header from "../components/Header";

export default function StatsPage({  currentDate, setCurrentDate, entries }) {

  const [statType, setStatType] = useState("expense")


  return (
    <>
    <Header
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            statType={statType}
            setStatType={setStatType}
          />

    <StatsDisplay entries={entries} currentDate={currentDate} statType={statType} />
    </>
  );
}