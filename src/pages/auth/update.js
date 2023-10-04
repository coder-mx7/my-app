import axios from "axios";
import { useState, useEffect, useContext  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../Context/contex";
// .post(`http://127.0.0.1:8000/api/user/update/${id}`, {

   
   const Update = () => {
   const nav = useNavigate()
  const { id } = useParams();
  const megsg =''
  const userNow = useContext(User)
  console.log(userNow)
  const [firstName, setFirst] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [flag, setflag] = useState(true);
  
  


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
       .post(`http://127.0.0.1:8000/api/user/update/${id}`, {
         email: email,
         name: firstName,
         password: password,
         password_confirmation: passwordR,
       })
       .then((response) => {
         console.log(response);
         if(response.status===200){
           window.location.pathname = `/dashboard/users`
           nav(`/dashboard/users`)
           localStorage.setItem('email',email)
           const token = response.data.data.token
           const user = response.data.data.user
           console.log(user,token)
           
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

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/user/showbyid/${id}`).then((res) => {
      console.log(res.data[0]);
      setEmail(res.data[0].email);
      setFirst(res.data[0].name);
      console.log(res.data[0].name);
      console.log(email);
      console.log("done");
    });
  }, []);

  return (
    <div className="flex-container">


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
          <button type="submit">update</button>
        </form>
      </div>


    </div>
  );
};

export default Update;
