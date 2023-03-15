import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import WestIcon from '@mui/icons-material/West';

export default function Login() {
  const navigate=useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const userDetails = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:4000/api/loginusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        alert("Enter your valid information");
      } else {
        localStorage.setItem('useremail',userDetails.email);
        localStorage.setItem('authToken',json.authToken);
         navigate('/') 
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again later.");
    }
    setEmail('')
    setPassword('')
  };
  return (
    <div className="container mt-5">
      <Link to={'/'}><Button sx={{mb:5}} ><WestIcon/></Button></Link>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            className="form-control"
            id="exampleInputEmail1"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <button type="submit" className=" m-3 btn btn-primary">
          Submit
        </button>
        <Link to={"/signup"} className="m-3 btn btn-danger">
          If you are new user
        </Link>
      </form>
    </div>
  );
}
