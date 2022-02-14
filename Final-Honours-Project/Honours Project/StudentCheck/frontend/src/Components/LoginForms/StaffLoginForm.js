/**
 * Displays and handles user input for log in (staff)
 */

import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { staffLogin } from "./../../Actions/staffUserActions";
import { useEffect } from "react";
import StaffRegister from "./StaffRegister"

export default function StaffLoginForm() {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [idError, setIDError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const staffSignIn = useSelector((state) => state.staffSignIn);
  const { staffInfo, error } = staffSignIn;
  const [registerToggle, setRegisterToggle] = useState(false);

  useEffect(() => {
    // redirect if successful login
    if (staffInfo) {
      history.push({
        pathname: "/",
      });
    }
  }, [staffInfo, history]);

  /**
   * Verifies input, no empty fields etc
   */
  function handleStaffLoginSubmit() {
    setIDError(false);
    setPasswordError(false);
    if (id == null || id === "") {
      setIDError("Please enter a valid staff ID.");
    }
    if (password == null || password === "") {
      setPasswordError("Please enter a valid password.");
    }
    if (password !== null && password !== "" && id !== null && id !== "") {
      dispatch(staffLogin(id, password));
    }
  }

  return (
    registerToggle ? <> <StaffRegister role = "staff" /> <Button style = {{marginTop: "1rem"}} onClick={() => setRegisterToggle(false)} className = "button">Back to Login</Button> </> :
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
          <Form.Label>Staff ID</Form.Label>
          <Form.Control type="text" onChange={(e) => setID(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button style={{marginTop: "1rem"}} onClick={() => handleStaffLoginSubmit()} className="button">
          Log In
        </Button>
        <Button onClick = {() => setRegisterToggle(true)} style = {{marginTop: "1rem"}} className="button">
          Register
        </Button>
      </Form>
    </div>
  );
}
