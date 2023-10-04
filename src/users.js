import React, { useContext, useEffect, useState } from "react";
import "./Dashbord.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "./Context/contex";

// url delte = `http://127.0.0.1:8000/api/user/delete/${id}`
// url show users = .get("http://127.0.0.1:8000/api/user/show") use =< useeffect for api

const Users = () => {
  const [runuser, setrun] = useState(0);
  const [user, setuser] = useState([]);

  const contex = useContext(User);
  const token = contex.Auth.token;
  console.log(token);

  

  useEffect(() => {
    return () => {
      axios
        .get("http://127.0.0.1:8000/api/user/show", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setuser(res.data));
    };
  }, [runuser]);

  async function delatuser(id) {
    await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setrun((per) => per + 1);
  }

  const showUser = user.map((el, index) => (
    <tr key={index}>
      <td>{el.id}</td>
      <td> {el.name} </td>
      <td>{el.email}</td>
      <td className="sp">
        <i
          onClick={() => delatuser(el.id)}
          style={{ fontSize: "23px", color: "red" }}
          className="fa-sharp fa-solid fa-trash cur"
        ></i>
        <Link
          to={`/dashboard/update/${el.id}`}
          style={{ fontSize: "23px", color: "green" }}
          className="fa-sharp fa-solid fa-pen-to-square cur"
        ></Link>
      </td>
    </tr>
  ));

  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <tr style={{ background: "#a0cbcf" }}>
            <td>Id</td>
            <td>User</td>
            <td>Email</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>{showUser}</tbody>
      </table>
    </div>
  );
};

export default Users;
