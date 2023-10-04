import {Outlet } from "react-router-dom";
import Miine from "./compoont/miine";
import Topbar from "./compoont/topBar";

function Dashboard() {
  return (
    <div className="contianer">
      <Topbar />
      <div className="df">
        <Miine />
        <div style={{ width: "80%" }}>
         <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
