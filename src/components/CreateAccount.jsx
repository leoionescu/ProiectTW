import React from "react";
import Switch from "react-switch";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
  const handleSubmit = () => {};

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
          <select>
            <option value="profesor">Profesor</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className="primary">Submit</button>
      </form>
    </div>
  );
};
