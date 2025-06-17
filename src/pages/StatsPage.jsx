import { useState } from "react";
import StatsDisplay from "../components/stats/StatsContent";
import Header from "../components/ui/Header";

export default function StatsPage({  currentDate, setCurrentDate, entries }) {

  

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