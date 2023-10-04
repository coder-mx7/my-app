import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./compoont/header";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('email'));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setAccept(true);

    axios
      .post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if(response.status===200){
          window.location.pathname = '/dashboard'
          localStorage.setItem('email',email)
          localStorage.setItem('password',password)
          setIsLoggedIn(true);
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

  return (
    <div className="flex-container">
      <Header isLoggedIn={isLoggedIn} />
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

          
      

          <p id="mesgid"> { } </p>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
