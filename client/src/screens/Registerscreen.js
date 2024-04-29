import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  async function register() {
    if (password == cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };

      // for connecting to backend
      try {
        setloading(true);
        const result = await axios.post("/api/users/register", user).data;
        setloading(false);
        setsuccess(true);

        //sfter getting sucess in registeratoin we have to empty the fields
        setname("");
        setemail("");
        setpassword("");
        setcpassword("");
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }

      // console.log(user);
    } else {
      alert("Password not matched");
    }
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <Error message="not registered" />}

      <div className="row justify-content-center mt-5 ">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registeration Success" />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              style={{ margin: "5px" }}
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
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
            <input
              type="password"
              style={{ margin: "5px" }}
              className="form-control"
              placeholder="cpassword"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />
            <button
              className="btn btn-primary mt-3 align-item-center"
              onClick={register}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
