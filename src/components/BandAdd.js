import React, { useState } from 'react';

export const BandAdd = ({ crearBanda }) => {

  const [valor, setValor] = useState('');

  const onSubmit = (ev) =>{
    ev.preventDefault();

    if (valor.trim().length > 0 ) {
       // TODO: llamar la función para emitir el evento

      console.log(valor);
      crearBanda(valor);
      setValor('');
    }else{
      return;
    }
  }





  return (
    <>
      <h4 className="pb-3">Agregar Banda</h4>
      <form onSubmit={onSubmit}>
        <input 
              className="form-control mt-2" 
              placeholder="Nuevo nombre de banda"
              value={ valor }
              onChange={(ev) => setValor(ev.target.value) }
            />
      </form>
    </>
  )
}
