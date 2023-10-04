import React, { useEffect, useState } from "react";
import "./Dashbord.css";
import axios from "axios";
import { Link } from "react-router-dom";

// url delte = `http://127.0.0.1:8000/api/user/delete/${id}`
//



const Users = () => {
  async function delatuser(id) {
    await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`);
    setrun((pre) => pre + 1);
  }

  const [runusers, setrun] = useState(0);

  const [users, setusers] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show")
      .then((res) => setusers(res.data))
      .catch((error) => console.log(error));
  }, [runusers]); //# laste update

  

  const showusers = users.map((el, index) => (
    <tr key={index}>
      <td>{el.id}</td>
      <td>{el.name}</td>
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
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Eamil</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showusers}</tbody>
      </table>
    </div>
  );
};

export default Users;
