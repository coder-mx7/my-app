import React from "react";
import { Link } from "react-router-dom";



const Header = () => {
  return (
    <div className="flex- hedaer">
      <nav className="-flex">
        <ul className="-flex">
          <Link to="/">Store</Link>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="">about</Link>
          </li>
          <li>
            <Link to="/dashboard">dashbord</Link>
          </li>
        </ul>
        <div className="-flex">
          
            
              
              <Link to={"/dashboard"} className="btn-a">
                go to dashbored
              </Link>
{              /*<Link  to={"/"} className="btn-a">
                logaut
              </Link>*/}

              <Link to={"/Register"} className="btn-a">
                regester
              </Link>
              <Link to={"/login"} className="btn-a">
                login
              </Link>
         
        </div>
      </nav>
    </div>
  );
};

export default Header;
