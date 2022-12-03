// -------------------------This page is made for user login ------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


    // -------------------------Checkimg for login credentials from local storage----------------------
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);


  // --------------Defining a function for gather values of user input when it is call-----------------------------
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };


  // ---------------------------------------Set up validations for user inputs and error msg shown according to that-------------------------------------
  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };


  // ------------------------Defining a function that will run when submit will call
  // in this option at first validation is called then send data for authentication to backends using api routes
  //  after verification of data it will navigate to the chat page----------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };


  // ---------------------------Desining UI for login ----------------------------------------------
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>brother</h1>
          </div>
          <input
            type="text"
            placeholder="Username:"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password:"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Sign Up.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}


// ----------------------------------Style the UI components-------------------------------------------
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #45B8AC ;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    @media only screen and (max-width: 600px) {
    gap:0;
    }
    justify-content: center;
    img {
      @media only screen and (max-width: 600px) {
      height:3.7rem;
      }
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;

    flex-direction: column;
    @media only screen and (max-width: 600px) {
      gap:1rem;
      padding:0rem;
      height:70%;
      width:90%;
      align-items: center;
      justify-content: center;
    }
    gap: 2rem;
    background-color: #955251;
    border-radius: 1rem;
    padding: 5rem;
  }
  input {
    background-color: cyan;
    padding: 1rem;
    border: 0.1rem solid cyan;
    @media only screen and (max-width: 600px) {
      padding:1rem;
      width:80%;
      margin:0 1.3rem;
      
    }
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    @media only screen and (max-width: 600px) {
    margin:0 30%;
    font-size: 0.7rem;
    padding:1rem;
    }
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    @media only screen and (max-width: 600px) {
    margin:1rem 2rem;
    }
    color: white;
    text-transform: uppercase;
    a {
      color: #F7CAC9;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
