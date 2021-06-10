import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Button, Input } from '@material-ui/core';
import { serviceUsers } from '../service/useService';
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

  const classes = useStyles();

  const [value, setValue] = useState({
    nombre: '',
    date: ' '
  });

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e?.preventDefault();
    try{
      await serviceUsers.addCita(value)
    }catch{
      
      console.log(value.nombre + ' ' + value.date);
    }
    e.target.reset()
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          name="nombre"
          onChange={handleOnChange}
          id="standard-basic"
          label="Nombre"
          color="secondary"
          margin="normal"
         
        />
        <TextField
          name="date"
          onChange={handleOnChange}
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
        <Button color="secondary" type="submit">
          Registrar
        </Button>
      </form>
    </>
  );
};
