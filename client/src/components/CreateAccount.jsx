import React from "react";
import Switch from "react-switch";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('firstName: ' + e.target.firstName.value);
    console.log('lastName: ' + e.target.lastName.value);
    console.log('email: ', e.target.email.value);
    console.log('password: ', e.target.password.value);
    console.log('select: ', e.target.select.value); 

    const email = e.target.email.value;
    const title = e.target.select.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const id = uuidv4()

    if (e.target.email.value.length > 0 && e.target.password.value.length > 0 && e.target.firstName.value.length > 0 && e.target.lastName.value.length > 0) {
      if (e.target.select.value === 'student') {
        const req = 'http://localhost:8081/api/students'
        fetch(req, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value
          })
        }).then(response => {
          if (response.status === 201) {
            navigate('/home', { state: { studentId: id,  title, email, lastName, firstName } })
          } else if (response.status === 400) {
            alert('model invalid')
          } else if (response.status === 500) {
            alert('Email already in use')
          }
        })
      } else if (e.target.select.value === 'professor') {
          const req = 'http://localhost:8081/api/professors'
          fetch(req, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: uuidv4(),
              firstName: e.target.firstName.value,
              lastName: e.target.lastName.value,
              email: e.target.email.value,
              password: e.target.password.value
            })
          }).then(response => {
            if (response.status === 201) {
              navigate('/home', { state: { title, email, lastName, firstName } })
            } else if (response.status === 400) {
              alert('model invalid')
            } else if (response.status === 500) {
              alert('Email already in use')
            }
          })
      }
    } else {
      alert('You must complete all fields.')
    }
  };

  const navigate = useNavigate();

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
          <label htmlFor="text">FirstName</label>
          <input type="text" name="firstName" placeholder="First Name" />
        </div>
        <div className="input-group">
          <label htmlFor="text">LastName</label>
          <input type="text" name="lastName" placeholder="Last Name" />
        </div>
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
        <button className="primary">Create Account</button>
      </form>
    </div>
  );
};
