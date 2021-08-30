import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import "moment/locale/es";
import "../style/CalendaryApp.css";

import { useHookCite } from "../hooks/useHookCite";
import { DaysContext } from "./context/DaysContext";
import { RenderCalendary } from "./RenderCalendary";

export const CalendaryApp = () => {
  moment.locale("es");
  const { days, setDays } = useContext(DaysContext);

  const [calendar, setCalendar] = useState([]);
  const [val, setVal] = useState(moment());
  
  const listUsers = useHookCite();
  
  const startDay = val.clone().startOf("month").startOf("week");
  const endDay = val.clone().endOf("month").endOf("week");
  ///////
  
  
  ///////////Funciones//////////


  const currentMonthName = () => {
    return val.format("MMMM");
  };
  const currentYear = () => {
    return val.format("YYYY");
  };

  const prevMhont = () => {
    return val.clone().subtract(1, "month");
  };
  const nextMhont = () => {
    return val.clone().add(1, "month");
  };

  const isSelected = (day) => {
    return val.isSame(day, "day");
  };
  const beforeToday = (day) => {
    return day.isBefore(new Date(), "day");
  };
  const isToday = (day) => {
    return day.isSame(new Date(), "day");
  };
  const dayStyles = (day) => {
    if (beforeToday(day)) return "before"
    if (isSelected(day)) return "selected";
    if (isToday(day)) return "today";
    return "";
  };

 ;

  ////////////////
  useEffect(() => {
    const day = startDay.clone().subtract(1, "day");
    //console.log(day.format('DD MM YYYY'))
    const arr = [];
    while (day.isBefore(endDay, "day")) {
      arr.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }
    setCalendar(arr);
    const daysWithDates = days.map((day, index) => {
      return (
        listUsers.find((user) => user.NEWDAY === (index + 0).toString()) || day
      );
    });

    setDays(daysWithDates);
  }, [listUsers, val]);
  return (
    <>
      <RenderCalendary
        calendar={calendar}
        val={val}
        setVal={setVal}
        currentMonthName={currentMonthName}
        currentYear={currentYear}
        prevMhont={prevMhont}
        nextMhont={nextMhont}
        dayStyles={dayStyles}
      
        listUsers={listUsers}
       
      />
    </>
  );
};
