// ---------------------------This page is made for registration purpose---------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

// ----------Defining a function for Registration-----------------
export default function Register() {
  const navigate = useNavigate();

  // -------------Setting for error msg-----------------
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ------------Checking that if there is already login user or not if already login the redirect it to main chat page ------------------
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, );


  // ---------Setting all the values from user input----------------
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // ---------------Defining validations for differnt fields and according to that error msg will display--------------
  const handleValidation = () => {
    const { password, confirmPassword, username, email,} = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };


  // ---------Defining a function for submit option---------------------------------------------------------------------
  const handleSubmit = async (event) => {

    // ------------Calling for validation---------------------------------------------------------------------
    event.preventDefault();
    if (handleValidation()) {


      // -----------------------Getting values of email,username and all from user input---------------------------------
      const { email, username, password,} = values;


      // --------------------Verify all data from our backends using api 
      // (checking if user is genuin or not if is alredy present in our database and all)
      //  after that save these data in our database------------------------------------------------------------------------------
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      // ----------------If the data is fullfill all the steps the redirect user to chat page------------------
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };


  // ---------------------Defining all the inputs and submit option with the function define above------------------
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
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>

          {/* -----------Setup a options for login---------------------------------------------- */}
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}


// -------------------------------------Defining styles of differnt fields--------------------------------
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #45B8AC;

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
    gap: 2rem;
    background-color: #955251;
    border-radius: 2rem;
    padding: 3rem 5rem;
    @media only screen and (max-width: 600px) {
      gap:1rem;
      padding:0;
      height:90%;
      width:93%;
      // border-radius: 2rem;
      align-items: center;
      justify-content: center;
    }
  }
  input {
    background-color: cyan;
    padding: 1rem;
    border: 0.1rem solid cyan;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    @media only screen and (max-width: 600px) {
      padding:1rem;
      width:80%;
      margin:0 1.3rem;
      align-items: center;
      justify-content: center;
    }
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
      margin:0 20%;
      font-size: 0.9rem;
      padding:1rem;
      }
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    @media only screen and (max-width: 600px) {
      margin:1rem 2rem;
      }
    a {
      color: blue;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
