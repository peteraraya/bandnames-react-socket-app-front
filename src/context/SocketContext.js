import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';

// creación de context
export const SocketContext = createContext();

// Provider : en donde lo voy a colocar
export const SocketProvider = ({ children }) => {

  // utilizaremos nuestro custom hooks
  const { socket, online } = useSocket('http://localhost:8080');

  return (
    <SocketContext.Provider value={{ socket, online }}>
      { children }
    </SocketContext.Provider>
  )
}


