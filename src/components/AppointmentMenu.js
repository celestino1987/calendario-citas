import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Button } from '@material-ui/core';
import { serviceUsers } from '../service/useService';
import { serviceSwal } from '../service/serviceSwal';
import '../style/AppointmentMenu.css'
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
  const hour = moment()
  hour.format()
  const classes = useStyles();

  const [name, setName] = useState("")
  const [date,setDate] = useState("")
  const cita = {
    name : name,
    date :date
  }
  

  
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if(!isValidForm()){
      console.log(" Soy !isValid")
    }else{
      
      try{
        await serviceUsers.addCita(cita)
        serviceSwal(
          'success',
          'Cita cogida correctamente',
          "",
          false,
          false,
          1500
          );
         setDate("")
         setName("")
        }catch{
          
          console.log("error ");
        }
      }
      
    };
    const isValidForm = () =>{
      if (name?.length <= 0){
        serviceSwal(
          'error',
          'Oops..',
          'El campo nombre debe rellenarse',
          true
        );
        return false;
        
      }
     if (date <= hour.format('YYYY MM DD')){
       serviceSwal(
         'error',
         'Oops..',
         'la fecha tiene que ser posterior',
         true
       );
       return false;
     }
      return true
  
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          
          value={name}
          onChange={(e)=> setName(e.target.value)}
          id="standard-basic"
          label="Nombre"
          color="secondary"
          margin="normal"
        
         
        />
        <TextField
          
          value={date}
          onChange={(e)=> setDate(e.target.value)}
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
