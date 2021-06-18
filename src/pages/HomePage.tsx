import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { BandAdd } from "../components/BandAdd";
import { BandList } from "../components/BandList";
import { BandChart } from "../components/BandChart";
function HomePage() {

  const { online } = useContext(SocketContext);

  return (
    <div className="container-fluid bg-dark text-light">
      <div className="alert">
        <p>
          Services Status
          {online ? (
            <span className="text-success"> Online</span>
          ) : (
            <span className="text-danger"> Offline</span>
          )}
        </p>
      </div>
      <div className="row">
         <div className="col-8">
          <h1>Bandnames</h1>
         </div>
          <div className="col-4">
            <BandAdd />
          </div> 
      </div>

      <div className="row">

        <div className="col-6">
          <BandList />
        </div>
        <div className="col-6">
         <BandChart />
        </div>
      </div>      



   
    </div>
  );
}

export default HomePage;
