import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { serviceUsers } from '../service/useService';
import { serviceSwal } from '../service/serviceSwal';
import { DaysContext } from "./context/DaysContext";
import '../style/AppointmentMenu.css';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const AppointmentMenu = () => {
  const hour = moment().format('D');
  console.log(hour)
  
  const { days} = useContext(DaysContext);
  const classes = useStyles();
  
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const YEAR = date.slice(0,4)
  const MONTH =date.slice(5,7)
  const NEWDAY = date.slice(8)
  console.log(" =====>" + date.slice(8))
  const [surname, setSurname] = useState('');
  const cita = {
    name: name,
    surname: surname,
    date: date,
    YEAR:YEAR,
    MONTH:MONTH,
    NEWDAY:NEWDAY

  };
  const x = days?.map((name) => name.NEWDAY).filter((NEWDAY) => NEWDAY);
 
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!isValidForm()) {
      console.log(' Soy !isValid');
    } else {
      try {
        await serviceUsers.addCita(cita);
        serviceSwal(
          'success',
          'Cita cogida correctamente',
          '',
          false,
          false,
          1500
        );
        setDate('');
        setName('');
        setSurname('')
      } catch {
        console.log('error del catch ');
      }
    }
  };
  const isValidForm = () => {
    for (let i = 0; i < x?.length; i++) {
      console.log("bucle for");
      if (x[i] == cita.NEWDAY) {
        serviceSwal(
          "error",
          "Oops..",
          "Esta día  ya tiene cita, coja otro día",
          true
        );
        return false;
      }
    }

  
    if (name?.length <= 0) {
      serviceSwal('error', 'Oops..', 'El campo nombre debe rellenarse', true);
      return false;
    }
    if (cita.NEWDAY < hour) {
      serviceSwal('error', 'Oops..', 'la fecha tiene que ser posterior', true);
      return false;
    }
    return true;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="standard-basic"
          label="Nombre"
          color="secondary"
          margin="normal"
        />
           <TextField
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          id="standard-basic"
          label="Apellido"
          color="secondary"
          margin="normal"
        />
        <TextField
          value={date}
          onChange={(e) => setDate(e.target.value)}
          
          margin="normal"
          color="secondary"
          id="date"
          label="Fecha cita"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button className="btnSubmit" color="secondary" type="submit">
          Registrar
        </Button>
      </form>
    </>
  );
  
};
