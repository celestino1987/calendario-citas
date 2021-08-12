import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import '../style/CalendaryApp.css';

import { useHookCite } from '../hooks/useHookCite';
import { DaysContext } from "./context/DaysContext";

export const CalendaryApp = () => {

  const { days, setDays } = useContext(DaysContext);
  moment.locale("es");
  const [time , setTime] = useState()

  
  const [calendar, setCalendar] = useState([]);
  const [val, setVal] = useState(moment());
  
  const listUsers = useHookCite()
  // console.log(listUsers)
  const startDay = val.clone().startOf('month').startOf('week');
  const endDay = val.clone().endOf('month').endOf('week');
useEffect(() => {
 setTime(moment().calendar())
 console.log(time)
 
}, [time])
   

 
  ////////////////
  useEffect(() => {
    const day = startDay.clone().subtract(1, 'day');
    //console.log(day.format('DD MM YYYY'))
    const a = [];
    while (day.isBefore(endDay, 'day')) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, 'day').clone())
      );
    }
    setCalendar(a);
    const daysWithDates = days.map((day,index) => {
      return listUsers.find((user) => user.NEWDAY === (index+1).toString()) || day
    })
    setDays(daysWithDates);
  }, [listUsers,val]);

  ///////////Funciones//////////

  const currentMonthName = () => {
    return val.format('MMMM');
  };
  const currentYear = () => {
    return val.format('YYYY');
  };

  const prevMhont = () => {
    return val.clone().subtract(1, 'month');
  };
  const nextMhont = () => {
    return val.clone().add(1, 'month');
  };

  const isSelected = (day) => {
    return val.isSame(day, 'day');
  };
  const beforeToday = (day) => {
    return day.isBefore(new Date(), 'day');
  };
  const isToday = (day) => {
    return day.isSame(new Date(), 'day');
  };
  const dayStyles = (day) => {
    if (beforeToday(day)) return 'before';
    if (isSelected(day)) return 'selected';
    if (isToday(day)) return 'today';
    return '';
  };
  return (
    <>
    
      <div className="calendar">
        <div className="  letters_header">
          <div className="prev" onClick={() => setVal(prevMhont())}>
            &#9664;
          </div>
          <div>
            {currentMonthName()} {currentYear()}{' '}
          </div>

          <div className="next" onClick={() => setVal(nextMhont())}>
            &#9654;
          </div>
        </div>
        <div className="calendarWeek">
          <div>Lunes</div>
          <div>Martes</div>
          <div>Miercoles</div>
          <div>Jueves</div>
          <div>Viernes</div>
          <div>Sabado</div>
          <div>Domingo</div>
        </div>
        <div className="calendarDays">
          {calendar.map((week, indexWeek) => (
            <div className="dayName" key={(1 + indexWeek).toString()}>
              {week.map((day, indexParent) => (
                <div className="day" onClick={() => setVal(day)}>
                 
                  <div className={dayStyles(day)}>
                      <p>{day.format('D').toString()}</p>
                      <p>{(listUsers.find((user) => user.NEWDAY === day.format('D').toString()))?.name || ''}</p>
                  </div>
                  
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="hour">{time}</div>
      </div>
    </>
  );
};
