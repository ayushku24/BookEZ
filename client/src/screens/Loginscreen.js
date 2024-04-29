import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function Login() {
    const user = {
      email,
      password,
    };
    // for connecting to backend
    try {
      setloading(true);
      const result = await axios.post("/api/users/login", user);
      setloading(false);
      console.log(result);
      // store user in local storage in order to access anywhere in the application
      // Note : we cant store va;ues of object and arrays so we have to convert in string

      localStorage.setItem("currentUser", JSON.stringify(result));
      const resultString = localStorage.getItem("currentUser");
      console.log(resultString);

      // now navigate to home screen
      window.location.href = "/home";
    } catch (error) {
      setloading(false);
      // console.log(error);

      seterror(true);
    }
    // console.log(user);
  }
  return (
    <div>
      {loading && <Loading />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Invalid credentials!!" />}
          <div className="bs">
            <h2>Login</h2>

            <input
              type="text"
              style={{ margin: "5px" }}
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              style={{ margin: "5px" }}
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={Login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
