import React, { useEffect, useState } from 'react';

export const BandList = ({ data, votar, descontar, borrar, cambiarNombre }) => {

  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);


  const cambioNombre = (event, id) => {

    const nuevoNombre = event.target.value;

    setBands(bands => bands.map(band => {
      if (band.id === id) {
        band.name = nuevoNombre;
      }
      return band;
    }));

    // console.log(event.target.value);
    // console.log(id);
  }

  const onPerdioFoco = (id, nombre) => {
    console.log(id, nombre)
    // Dispara el evento del sockets
    cambiarNombre(id, nombre);

  }



  const crearRows = () => {
    return (
      bands.map((band,i) => (

        <tr key={band.id}
          className="align-middle shadow-lg">
          <td className="m-0 p-0">
            <h6 className="text-light">{ i + 1}</h6>
          </td>
          <td>
            <div className="row">
              <div className="col-8 p-0">
                <input
                  className="form-control"
                  value={band.name}
                  onChange={(event) => cambioNombre(event, band.id)}
                  onBlur={() => onPerdioFoco(band.id, band.name)}
                />
              </div>
              <div className="col-2 p-0 mt-1">
                <button
                  onClick={() => votar(band.id)}
                  className="btn btn-success btn-sm"
                >
                + 1
                </button>
              </div>
              <div className="col-2 p-0 mt-1">
                <button
                  onClick={() => descontar(band.id)}
                  className="btn btn-danger btn-sm"
                >
                  - 1
                </button>
              </div>
            </div>


          </td>
          <td>
            <h3 className="text-light"> {band.votes} </h3>
          </td>
          <td>
            <button
              onClick={() => borrar(band.id)}
              className="btn btn-danger">
              Borrar
            </button>
          </td>
        </tr>
      ))

    )
  }



  return (
    <>
      <table className="table table-striped text-center shadow border border-dark">
        <thead className="bg-primary">
          <tr className=" text-center text-light shadow">
            <th>N°</th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {crearRows()}
        </tbody>
      </table>
    </>
  )
}
