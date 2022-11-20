import React, { useState } from "react";
import ReactDOM from "react-dom";
import Card from "@material-ui/core/Card";
import Navbar from '../Navabar/Navbar';
import {Link} from 'react-router-dom';
import { AuthProvider } from "react-auth-kit";

import "./Styles.css";

function Login() {
  // React States
  const [InputEmail, setEmail] = useState("");
  const [InputPassword, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  var details = {
      email: InputEmail,
      password: InputPassword,
  };

  var formBody = [];
  for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const handleSubmit = async (e) => {
      e.preventDefault();
      const requestOptions = {
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "/",
              "Accept-Encoding": "gzip, deflate, br",
          },
          body: formBody,
      };
      fetch("http://localhost:700/user/login", requestOptions)
          .then((response) => response.json())
          .then((data) => {
              if (data.exist === true) {
                  setSuccess(true);
                  //setIsLogged(true);
              } else {
                  alert("Your email or password is not valid");
                  //setIsLogged(false);
              }
          });
  };
  return (
      <>
          {success ? (
              <div className="panel">
                 
                  <br></br>
                  
                 <Navbar />
                 {/* <h1 id='success'>Login Success</h1> */}
                  <div className='panel2'>
                      <br></br>
                      <Card color="Your Login has been successful." />
                      <br></br>

                      {/* <Link to={"/jobs"}>
                          <button type="submit" className="btn btn-primary">
                              Go to Jobs Page
                          </button>
                      </Link> */}

                      <br></br>
                      <br></br>
                  </div>

              </div>
          ) : (
              <div className="panel4">
                  <form onSubmit={handleSubmit}>
                      <br></br>
                      <br></br>
                      <div className='panel3'>
                          <br></br>
                          <Card color="This is the login page. Please login with your credentials" />
                          <br></br>
                      </div>

                      <br></br>
                      <div className='contactdetails4'>

                        <h1>User Login </h1>
                          <br></br>
                          <br></br>
                          <br></br>
                          <div className="mb-3">
                              <label htmlFor="InputEmail" className="form-label">
                                  Email address: 
                              </label>
                              <input
                                  type="email"
                                  className="form-control"
                                  aria-describedby="emailHelp"
                                  id="InputEmail"
                                  onChange={(e) => setEmail(e.target.value)}
                              ></input>
                          </div>
                          <br></br><br></br>
                          <div className="mb-3">
                              <label htmlFor="InputPassword" className="form-label">
                                  Password: 
                              </label>
                              <input
                                  type="password"
                                  className="form-control"
                                  id="InputPassword"
                                  onChange={(e) => setPassword(e.target.value)}
                              ></input>
                          </div>
                          <br></br>
                          <br></br>
                          <button type="submit" className="btn btn-primary">
                              Submit
                          </button>


                          <br></br>
                          <br></br>
                          <br></br>

                      </div>
                  </form>
              </div>
          )}
      </>
  );

}

export default Login;