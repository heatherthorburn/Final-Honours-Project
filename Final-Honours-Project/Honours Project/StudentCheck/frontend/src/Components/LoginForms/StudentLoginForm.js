/**
 * Displays and handles user input for log in (student)
 */

import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentLogin } from "./../../Actions/studentUserActions";
import { useEffect } from "react";
import StaffRegister from "./StaffRegister";

export default function StaffLoginForm() {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [idError, setIDError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo, error } = studentSignIn;

  const [registerToggle, setRegisterToggle] = useState(false);

  useEffect(() => {
    //redirect if succesful login
    if (studentInfo) {
      history.push({
        pathname: "/",
      });
    }
  }, [studentInfo, history]);

  //handles input validation, no empty fields, dispatches event if passes input validation
  function handleStudentLoginSubmit() {
    setIDError(false);
    setPasswordError(false);
    if (id == null || id === "") {
      setIDError("Please enter a valid student ID.");
    }
    if (password == null || password === "") {
      setPasswordError("Please enter a valid password.");
    }
    if (password !== null && password !== "" && id !== null && id !== "") {
      dispatch(studentLogin(id, password));
    }
  }

  return (
    registerToggle ? <> <StaffRegister role = "student" /> <Button style = {{marginTop: "1rem"}} onClick={() => setRegisterToggle(false)} className = "button">Back to Login</Button> </> :
    <div>
      {!idError && !passwordError && !error ? null : (
        <Alert variant="danger">
          {!idError ? null : (
            <div>
              {idError}
              <br />
            </div>
          )}
          {!passwordError ? null : passwordError}
          {!error ? null : error}
        </Alert>
      )}

      <Form>
        <Form.Group>
          <Form.Label>Student ID</Form.Label>
          <Form.Control type="text" onChange={(e) => setID(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button style={{marginTop: "1rem"}} onClick={() => handleStudentLoginSubmit()} className="button">
          Log In
        </Button>
        <Button onClick = {() => setRegisterToggle(true)} style = {{marginTop: "1rem"}} className="button">
          Register
        </Button>
      </Form>
    </div>
  );
}
