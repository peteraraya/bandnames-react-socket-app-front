import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';


export const useSocket = ( serverPath ) =>{

  const socket = useMemo(
    () =>
      io.connect(serverPath, {
        transports: ["websocket"], // mantener este transport
        secure: true,
        rejectUnauthorized: false,
      }),
    [serverPath]);

  const [online, setOnline] = useState(false);

  // Socket - cuando nos conectamos
  useEffect(() => {
    // console.log(socket);
    setOnline(socket.connected)
  }, [socket]);

  // Online = connected - cuando se recupera la información
  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);


  // Offline = disconnected - cuando perdemos la conexión
  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);




  return {
    // Exponemos
    socket,
    online
  }
}