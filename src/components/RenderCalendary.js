import React from "react";
import { useHookTime } from "../hooks/useHookTime";


export const RenderCalendary = ({
  calendar,
  val,
  setVal,
  currentMonthName,
  currentYear,
  prevMhont,
  nextMhont,
  dayStyles,
  listUsers,
 
}) => {
  const times = useHookTime()

  return (
    <div>
      <div className="calendar">
        <div className="  letters_header">
          <div className="prev" onClick={() => setVal(prevMhont())}>
            &#9664;
          </div>
          <div>
            {currentMonthName()} {currentYear()}{" "}
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
                <div
                  className="day"
                  key={1 + indexParent}
                  onClick={() => setVal(day)}
                >
                  <div className={dayStyles(day)}>
                    <p>{day.format("D").toString()}</p>
                    <p>
                      {(listUsers.find(
                        (user) => user.MONTH == val.format("MM")
                      ) &&
                        listUsers.find(
                          (user) => user.NEWDAY === day.format("DD").toString()
                        )?.name) ||
                        ""}
                        
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="hour">{times}</div>
      </div>
    </div>
  );
};
