import { useEffect, useState } from 'react';
import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';
import { io } from 'socket.io-client';

const connectSocketServer = () =>{

  const socket = io.connect('http://localhost:8080/',{
    transports:['websocket']
  });
  return socket;
}

function App() {

  const [socket] = useState( connectSocketServer() );
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  // Socket
  useEffect(() => {
    console.log(socket);
    setOnline(socket.connected )
  }, [socket]);

  // Online = connected
  useEffect(() => {   
    socket.on('connect',()=>{
        setOnline( true );
    });
  }, [socket]);


  // Offline = disconnected
  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);


  useEffect(() => {
    
    socket.on('current-bands', (bands)=>{
        console.log(bands);
        setBands(bands);
    })

  }, [socket]);

 // Votar
 const votar = (id) =>{
  socket.emit('votar-banda', id );
 }
 // descontar votos
 const descontar = (id) =>{
  socket.emit('descontar-banda', id );
 }

 // Borrar banda
 const borrar = ( id ) =>{
   socket.emit('borrar-banda', id);
 }

 // Cambiar Nombre
 const cambiarNombre = ( id, nombre ) => {
    socket.emit('cambiar-nombre-banda', { id, nombre });
 }

 // Crear Banda
 const crearBanda = (nombre) =>{
  socket.emit('agregar-banda', { nombre });
 }



  return (
    <div className="container bg-dark text-light">

      <div className="alert">
        <p>
          Services Status
          {
            online
              ? <span className="text-success"> Online</span>
              : <span className="text-danger"> Offline</span>
          }
        
        
        </p>
      </div>


      <h1>Bandnames</h1>
      <hr />

      <div className="row mb-3">
        <div className="col-8">
          <BandList 
            data={bands}
            votar={votar}
            descontar={descontar}
            borrar={borrar}
            cambiarNombre={cambiarNombre}
          />
          </div>
        <div className="col-4">
          <BandAdd 
            crearBanda={crearBanda}
          />
        </div>
      </div>

    </div>
  );
}

export default App;
