import React, { useContext, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import { serviceUsers } from "../service/useService";
import { serviceSwal } from "../service/serviceSwal";
import { DaysContext } from "./context/DaysContext";
import "../style/AppointmentMenu.css";
import { AppForm } from "./AppForm";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const AppointmentMenu = () => {
  const classes = useStyles();
  const allDate = moment().format("DDMMYYYY");
  const momentDay = allDate.slice(0, 2);
  const momentMonth = allDate.slice(2, 4);
  const momentYear = allDate.slice(4);

  const { days } = useContext(DaysContext);
  const selectDay = days?.map((name) => name.NEWDAY).filter((NEWDAY) => NEWDAY);
  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState("");
  const YEAR = date.slice(0, 4);
  const MONTH = date.slice(5, 7);
  const NEWDAY = date.slice(8);

  const cita = {
    name: name,
    surname: surname,
    date: date,
    YEAR: YEAR,
    MONTH: MONTH,
    NEWDAY: NEWDAY,
  };

  
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!isValidForm()) {
      console.log(" Soy !isValid");
    } else {
      try {
        await serviceUsers.addCita(cita);
        serviceSwal(
          "success",
          "Cita cogida correctamente",
          "",
          false,
          false,
          1500
          );
          setDate("");
          setName("");
          setSurname("");
        } catch {
          console.log("error del catch ");
        }
      }
    };
    const isValidForm = () => {
      if (name?.length <= 0) {
        serviceSwal("error", "Oops..", "El campo nombre debe rellenarse", true);
      return false;
    }
    //validacion  para verificar que la sita es posterio a dia , mes y año
    if (
      cita.YEAR < momentYear ||
      (cita.NEWDAY < momentDay && cita.MONTH < momentMonth)
    ) {
      serviceSwal("error", "Oops..", "La fecha tiene que ser posterior", true);
      return false;
    } else if (cita.MONTH == momentMonth) {
      if (cita.NEWDAY < momentDay) {
        serviceSwal("error", "Oops..", "el dia tiene que ser posterior", true);
        return false;
      }
    } else if (cita.MONTH > momentMonth) {
      serviceSwal(
        "error",
        "Oops..",
        "Tienes que  coger cita este mes !Lo sentimos...",
        true
      );
      return false;
    }
    //borrar cita si ya paso el dia

    // validacion para verificar que ese dia hay o no cita
    for (let i = 0; i < selectDay?.length; i++) {
      if (selectDay[i] == cita.NEWDAY) {
        serviceSwal(
          "error",
          "Oops..",
          "Esta día  ya tiene cita, coja otro día",
          true
        );
        return false;
      }
    }
    return true;
  };
  
  useEffect(() => {
    let backDay = days.find((num) => num);

    console.log(backDay);

    const delDay = async () => {
      if (backDay) {
        try {
          if (backDay.NEWDAY < momentDay) {
            await serviceUsers.deleteCita(backDay.id);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    delDay();
  }, [allDate]);
  return (
    <>
      <AppForm
        classes={classes}
        name={name}
        setName={setName}
        surname={surname}
        setSurname={setSurname}
        date={date}
        setDate={setDate}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
