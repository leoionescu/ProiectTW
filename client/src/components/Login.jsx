import React from "react";

import { useNavigate } from "react-router-dom";

export const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('email: ', e.target.email.value);
    console.log('password: ', e.target.password.value);
    console.log('select: ', e.target.select.value);
    const email = e.target.email.value;
    const title = e.target.select.value;

    if (e.target.email.value.length > 0 && e.target.password.value.length > 0) {
      if (e.target.select.value === 'student') {
        const req = 'http://localhost:8081/api/authenticateStudent/' + e.target.email.value + '/' + e.target.password.value
        fetch(req).then(response => {
          if (response.status === 200) {
            response.json().then(json => {
              navigate('home', { state: { studentId: json.id, title: title, email: email, lastName: json.lastName, firstName: json.firstName } })
            })
          } else if (response.status === 404) {
            alert('Email not found')
          } else if (response.status === 401) {
            alert('Email or password incorrect')
          }
        })
      } else if (e.target.select.value === 'professor') {
          const req = 'http://localhost:8081/api/authenticateProfessor/' + e.target.email.value + '/' + e.target.password.value
          fetch(req).then(response => {
            if (response.status === 200) {
              response.json().then(json => {
                navigate('/professor', { state: { title: title, email: email, lastName: json.lastName, firstName: json.firstName } })
              })
            } else if (response.status === 404) {
              alert('Email not found')
            } else if (response.status === 401) {
              alert('Email or password incorrect')
            }
          })
      }
    } else {
      alert('You must complete all fields.')
    }
  }

  const handleClick = (e) => {
    navigate("/create-account");
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
        <div className="input-group">
        <label htmlFor="password">Choose Title</label>
          <select name="select">
            <option value="professor">Professor</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className="primary">Log in</button>
      </form>
      <button className="secondary" onClick={handleClick}>
        Create a new account
      </button>
    </div>
  );
};
