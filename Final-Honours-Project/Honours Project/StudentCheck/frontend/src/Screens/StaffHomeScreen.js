/**
 * Home screen for staff, displays simple message
 */

import React from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card"
import { FaGraduationCap } from "react-icons/fa";

export default function HomeScreen() {
  const staffSignIn = useSelector((state) => state.staffSignIn);
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { loading, staffInfo, error } = staffSignIn;
  const { studentLoading, studentInfo, studentError } = studentSignIn;

  return (
      <div className ="home-container">
        <div className = "home-message">
        <h1>Welcome!</h1>
        <h2>You are logged in as university staff.</h2>
        <FaGraduationCap style={{fontSize : "xx-large"}} />
      </div>
      </div>
      )
}
