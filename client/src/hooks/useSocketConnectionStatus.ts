import  { useEffect, useState } from 'react'
import { socket } from '../config/socket';



const useSocketConnectionStatus = () => {

    const [status, setstatus] = useState<boolean>(socket.connected);
    useEffect(() => {
        const socketConnectionChecker=setInterval(() => {
            // setstatus(socket.connected)
            setstatus(true)
        }, 1000);
        return () => {
            clearInterval(socketConnectionChecker);
        };
    }, []);
  return (
    status
  )
}

export default useSocketConnectionStatus