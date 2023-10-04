import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Dashbord.css";
import { User } from "./Context/contex";

const Names = () => {
   const [firstName, setFirst] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordR, setPasswordR] = useState("");
   const [accept, setAccept] = useState(false);
   const [flag, setflag] = useState(true);
   const [megsg, setMegsg] = useState(""); // تعريف المتغير
   
  const contex = useContext(User);
  const token = contex.Auth.token;
   console.log(token)
   const nav = useNavigate();

   function handleSubmit(e) {
      e.preventDefault();
      setAccept(true);
      if (firstName === "" || passwordR !== password || password.length < 8) {
        setflag(false);
        console.log("false");
      } else {
        setflag(true);
      }
      if (flag) {
        axios
          .post(`http://127.0.0.1:8000/api/user/create`, {
            email: email,
            name: firstName,
            password: password,
            password_confirmation: passwordR,
          }, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            }})
          .then((response) => {
            console.log(response);
            if(response.status===200){
              //window.location.pathname = `/${props.navigate}`
              const token = response.data.data.token
              const user = response.data.data.user
              console.log(user,token)
              nav(`/dashboard/users`)

            }
          })
          .catch((err) => {
            console.log(err.response.data.message);
            if (err.response.data.message) {
              setMegsg(err.response.data.message); // تحديث المتغير
              console.log(megsg);
            } else {
              setMegsg(""); // تحديث المتغير
            }
          });
      }
   }

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex">
        <form className="flex" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            onChange={(e) => setFirst(e.target.value)}
            id="firstName"
            placeholder="Enter your first name"
            type="text"
            value={firstName}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            required
          />
          {password.length < 8 && accept && (
            <p className="eror">كلمة السر قصيرة جداً</p>
          )}

          <label htmlFor="passwordR">Repeat Password</label>
          <input
            onChange={(e) => setPasswordR(e.target.value)}
            id="passwordR"
            placeholder="Repeat your password"
            type="password"
            value={passwordR}
            required
          />
          {passwordR !== password && accept && (
            <p className="eror">كلمة السر غير متطابقة</p>
          )}

          <p id="mesgid"> {megsg} </p>
          <button type="submit">Create New user</button>
        </form>
      </div>
    </div>
  );
};

export default Names;
