/**
 * Container for the two log in forms, creates the toggle between student and staff
 */

import React from "react";
import StaffLoginForm from "../Components/LoginForms/StaffLoginForm";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import StudentLoginForm from "../Components/LoginForms/StudentLoginForm";

export default function LoginScreen() {
  return (
    <div className = "login-container" style={{marginTop: "2rem", display: "flex", justifyContent: "center"}} >
    <Card style={{padding: "1rem", width: "60%", minWidth: "320px", display: "flex", alignItems: "center"}}>
      <Tabs defaultActiveKey="staff" transition={false}>
        <Tab eventKey="staff" title="Staff">
          <StaffLoginForm />
        </Tab>
        <Tab eventKey="students" title="Students">
          <StudentLoginForm />
        </Tab>
      </Tabs>
    </Card>
    </div>
  );
}
