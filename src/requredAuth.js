

import React, { useContext } from 'react';
import { User } from './Context/contex';
import { Navigate, Outlet , useLocation } from 'react-router-dom';

const RequriedAuth = () => {

   const Usern = useContext(User);
   const location = useLocation();
   
   return (
      Usern.Auth.user ? <Outlet /> : <Navigate state={{from:location}} replace to="login" />
   );
}

export default RequriedAuth;
