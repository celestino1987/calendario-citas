import {useEffect,useState} from 'react'
import {serviceUsers} from '../service/useService'


export const useHookCite = () => {
  const [cita,setCita] = useState([]);
  useEffect(()=>{
    serviceUsers.getCita().then((data)=>{
        setCita(data.data)
    })

  },[])
  return cita
}
