import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

export const AppForm = ({
  classes,
  name,
  setName,
  surname,
  setSurname,
  date,
  setDate,
  handleSubmit,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Nombre"
          color="secondary"
          margin="normal"
        />
        <TextField
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
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
    </div>
  );
};
