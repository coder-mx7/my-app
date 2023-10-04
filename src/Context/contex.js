import {  createContext, useState } from "react";

export const User = createContext({})


const UserProvider = ({children}) => {
const [Auth,setAuth] = useState({})
   return (

<User.Provider value={{Auth,setAuth}}>{children}</User.Provider>
   );
}

export default UserProvider;
