import React from "react";

import { useNavigate } from "react-router-dom";

export const Login = () => {
  const handleSubmit = () => {};

  const handleClick = (e) => {
    navigate("create-account");
  };

  const navigate = useNavigate();
  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="name@email.com" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <button className="primary">Log in</button>
      </form>
      <button className="secondary" onClick={handleClick}>
        Create a new account
      </button>
    </div>
  );
};
