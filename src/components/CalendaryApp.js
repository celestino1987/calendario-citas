import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import '../style/CalendaryApp.css';

export const CalendaryApp = () => {
  moment.locale('es');
  const hour = moment()// todo => variable solo para la  hora  => ARREGLAR
  const [calendar, setCalendar] = useState([]);
  const [val, setVal] = useState(moment());
  
  const startDay = val.clone().startOf('month').startOf('week');
  const endDay = val.clone().endOf('month').endOf('week');
  useEffect(() => {
    const day = startDay.clone().subtract(1, 'day');
    const a = [];
    while (day.isBefore(endDay, 'day')) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, 'day').clone())
      );
    }
    setCalendar(a);
  }, [val]);
 
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

  const isSelected  = (day) => {
    return val.isSame(day , "day")
  }
  const beforeToday = (day) => {
    return day.isBefore(new Date(),"day")
  }
  const isToday = (day) => {
    return day.isSame(new Date(), "day")
  }
  const dayStyles = (day) => {
    if(beforeToday(day)) return "before"
    if(isSelected(day)) return "selected"
    if(isToday(day)) return "today"
    return ""
  }
  return (
    <>
    
      <h1 className="tittle">Calendario 2021</h1>
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
          {calendar.map((week) => (
            <div>
              {week.map((day) => (
                <div className="day" onClick={() => setVal(day)}>
                  <div className={dayStyles(day)}>
                    {day.format('D').toString()}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="hour">{hour.format('LTS')}</div>
             
      </div>
    </>
  );
};
