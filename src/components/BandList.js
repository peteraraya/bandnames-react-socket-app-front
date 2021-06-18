import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      // console.log(bands);
      setBands(bands);
    });
    // destruir listener, similar a dismount
    return () => socket.off("current-bands");
  }, [socket]);

  const cambioNombre = (event, id) => {
    const nuevoNombre = event.target.value;

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }
        return band;
      })
    );
  };

  const onPerdioFoco = (id, nombre) => {
    // Dispara el evento del sockets
    socket.emit("cambiar-nombre-banda", { id, nombre });
  };
  // // Votar banda
  const votar = (id) => {
    socket.emit("votar-banda", id);
  };

  // descontar votos
  const descontar = (id) => {
    socket.emit("descontar-banda", id);
  };
  // Borrar banda
  const borrar = (id) => {
    socket.emit("borrar-banda", id);
  };

  const crearRows = () => {
    return bands.map((band, i) => (
      <tr key={band.id} className="align-middle shadow-lg">
        <td className="m-0 p-0">
          <h6 className="text-light">{i + 1}</h6>
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
          <button onClick={() => borrar(band.id)} className="btn btn-danger">
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-striped  text-center shadow border border-light table-sm">
        <thead className="bg-indigo text-uppercase">
          <tr className=" text-center text-light shadow">
            <th>N°</th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};
