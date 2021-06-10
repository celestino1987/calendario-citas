import axios from 'axios';


const URL = 'http://localhost:4200';
const  CITAS = 'citas';

export const serviceUsers = {
  addCita:(formCita)=> axios.post(`${URL}/${CITAS} `, formCita),
  getCita: () => axios.get(`${URL}/${CITAS}`),
 

}