import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./index.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, showSubmitError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onSubmitSuccess = () => {
    navigate("/home");
  };

  const onSubmitFailure = () => {
    showSubmitError(true);
  };

  const onChangingEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangingPassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeEmailBlur = () => {
    if (email.trim() === "") {
      setEmailError("*Required");
    } else {
      setEmailError("");
    }
  };

  const onChangePasswordBlur = () => {
    if (password.trim() === "") {
      setPasswordError("*Required");
    } else {
      setPasswordError("");
    }
  };

  const renderEmailField = () => (
    <>
      <label htmlFor="email" className="input-label">
        EMAIL
      </label>
      <input
        id="email"
        className="input-field"
        type="password"
        value={email}
        onChange={onChangingEmail}
        onBlur={onChangeEmailBlur}
      />
      {emailError && (
        <p style={{ color: "red", marginTop: "5px" }}>{emailError}</p>
      )}
    </>
  );

  const renderPasswordField = () => (
    <>
      <label htmlFor="password" className="input-label">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onChangingPassword}
        className="input-field"
        onBlur={onChangePasswordBlur}
      />
      {passwordError && (
        <p style={{ color: "red", marginTop: "5px" }}>{passwordError}</p>
      )}
    </>
  );

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const userDetails = { email, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const url = "https://revisit-backend-jp04.onrender.com/api/auth/login";
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      onSubmitSuccess();
      localStorage.setItem("jwt_token_backend", data.token);
    } else {
      onSubmitFailure();
    }
  };

  return (
    <div className="background-container">
      <form className="card-container" onSubmit={onSubmitForm}>
        <h1 className="heading">Login</h1>
        <div className="input-container">{renderEmailField()}</div>
        <br />
        <div className="input-container">{renderPasswordField()}</div>
        <br />
        <button type="submit" className="signup-btn">
          Login
        </button>
        {submitError && <p style={{ color: "red" }}>*Bad Request</p>}
        <p>Don't have an account?</p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button type="button" className="login-btn">
            SignUp
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
