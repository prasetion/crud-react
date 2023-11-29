import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSucces, setLoginSucces] = useState("");
  const [loginFail, setLoginFail] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setLoginSucces("");
    setLoginFail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setLoginSucces("");
    setLoginFail("");
  };

  const handleLogin = () => {
    if (password === "" || username === "") {
      setIsEmpty(true);
      return;
    } else {
      setIsEmpty(false);
    }

    setIsLoading(true);

    const bodyPayload = {
      username: username,
      password: password,
    };

    axios
      .post(`https://api.mudoapi.tech/login`, bodyPayload)
      .then((res) => {
        setLoginSucces(res.data.message);
        setLoginFail("");
        console.log(res.data.token);
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
        setIsLoading(false);
      })
      .catch((err) => {
        setLoginFail(err.response.data.message);
        setLoginSucces("");
        setIsLoading(false);
      });
  };

  console.log(isLoading);

  return (
    <div>
      <Navbar></Navbar>
      {loginSucces.length ? <p>Login success</p> : <div></div>}
      {loginFail.length ? <p>Login Fail {loginFail}</p> : <div></div>}
      {isEmpty && <p>Username or Password should not empty</p>}
      {isLoading && <p>loading, please wait</p>}
      <div>
        <label>Username:</label>
        <input type="text" onChange={handleUsername} />
        <br />
        <label>Password:</label>
        <input type="password" onChange={handlePassword} />
        <br />
        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
