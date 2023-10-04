import Header from "../../compoont/header";
import axios from "axios";
import { useContext, useState } from "react";
import React from "react";
import { User } from "../../Context/contex";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const Regester = () => {
  const megsg = "";
  const nav = useNavigate();
  const userNow = useContext(User);

  const token = userNow.Auth.token;
  console.log(userNow);
  const cookie = new Cookies()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [flag, setflag] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    setAccept(true);
    if (password.length < 8) {
      setflag(false);
      console.log("false");
    } else {
      setflag(true);
    }
    if (flag) {
      axios
        .post(
          `http://127.0.0.1:8000/api/login`,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            nav(`/dashboard/users`);
            const token = response.data.data.token;
            const user = response.data.data.user;
            cookie.set('Bearer',token,{
               path:'/'
            })
            console.log(user, token);
            userNow.setAuth({ user, token });
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          if (err.response.data.message) {
            let megsg = err.response.data.message;
            console.log(megsg);
            document.getElementById("mesgid").innerHTML = megsg;
          } else {
            document.getElementById("mesgid").innerHTML = "";
          }
        });
    }
  }

  return (
    <div className="flex-container">
      <Header />
      <div className="flex">
        <form className="flex" onSubmit={handleSubmit}>
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

          <p id="mesgid"> {megsg} </p>
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
};

export default Regester;
