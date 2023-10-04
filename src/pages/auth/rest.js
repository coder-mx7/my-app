import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../../Context/contex";
import Spiner from "../../compoont/spiner";
import Cookies from "universal-cookie";

const Rest = () => {
  const contex = useContext(User);
  const token = contex.Auth.token;
  const [londing, setloding] = useState(true);

  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");
  console.log(getToken);

  useEffect(() => {
    async function refrsh() {
      try {
        await axios
          .post("http://127.0.0.1:8000/api/refresh", null, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${getToken}`,
            },
          })
          .then((data) => {
            console.log(data.data.token);
            cookie.set("Bearer", data.data.token, {
              path: "/",
            });

            contex.setAuth((pre) => {
              return { ...pre, token: data.data.token };
            });
          });
      } catch (err) {
        console.error(err);
        console.log(getToken);
      } finally {
        setloding(false);
      }
    }

    if (!token) {
      refrsh();
    } else {
      setloding(false);
    }
  }, []);

  return londing ? <Spiner /> : <Outlet />;
};
export default Rest;
