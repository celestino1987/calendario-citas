
import {useEffect,useState} from 'react'
import moment from "moment";



export const useHookTime = () => {
    const [time, setTime] = useState();
    useEffect(() => {
        const interval = setInterval(function () {
          setTime(moment().format("LTS"));
        }, 1000);
        return clearInterval(interval);
      }, [])
    return time
}
