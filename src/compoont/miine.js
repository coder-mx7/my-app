import React from "react";
import { Link } from "react-router-dom";

const Miine = () => {
  return (
    <div style={{height:'100vh',width:'20%'}}>
      <div className="content">
        <Link to={"/dashboard/users"}>user</Link><br />
        <Link to={"/dashboard/users/create"}>names</Link>
      </div>
    </div>
  );
};

export default Miine;
