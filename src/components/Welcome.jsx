// ------------This page will shown until the user click on any chat---------------------
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";


// ----------Getting user name from localStorage---------------------
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);

  // -----------Defining content for welcome---------------
  return (
    <Container>
      <div className="logout">
      <Logout />
      </div>
      
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}


// ---------Styling our components-----------------
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  span {
    color: red;
  }
  .logout{
    position: absolute;
    margin-top:-35rem;
    margin-left:60rem;
    @media only screen and (max-width: 600px) {
      margin-top:-30rem;
    margin-left:7rem;
  }
  h1,h3{
    @media only screen and (max-width: 600px) {
      margin:0 2rem;
    }
  }
`;
