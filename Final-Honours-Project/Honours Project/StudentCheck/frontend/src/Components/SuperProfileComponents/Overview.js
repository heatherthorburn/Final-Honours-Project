 /**
 * Overview for superprofile,
 * displays information such as student name, email etc
 * Due to structure of JSON objects returned from serverside this couldn't be
 * merged with the class overview for class profile
 * This could be investigated further in further developments.
 */

import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import moment from "moment";
import Alert from 'react-bootstrap/Alert';

export default function Overview(props) {

  return (
    <div className="table-container-grid">
      <Card>
        <Card.Header>Student Info</Card.Header>
        <Card.Body>
          <Table bordered responsive>
            <thead></thead>
            <tbody>
              <tr>
                <td className="table-title-cell">Name</td>
                <td>
                  {props.data.forename} {props.data.surname}
                </td>
              </tr>
              <tr>
                <td className="table-title-cell">Course</td>
                <td>{props.data.course.course_title}</td>
              </tr>
              <tr>
                <td className="table-title-cell">Academic Year</td>
                <td>{props.data.year}</td>
              </tr>
              <tr>
                <td className="table-title-cell">Department</td>
                <td>{props.data.course.department.dept_title}</td>
              </tr>
              <tr>
                <td className="table-title-cell">Advisor</td>
                <td>
                  {props.data.staff.forename} {props.data.staff.surname}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Enrolment</Card.Header>
        <Card.Body>
          {props.data.classes.length === 0 ? (
            <Alert style={{marginTop: "1rem", textAlign: "center"}} variant="warning">Not enrolled in any classes</Alert>
          ) : (
            <Table bordered responsive>
              <thead></thead>
              <tbody>
                {props.data.classes.map((currentClass, index) => (
                  <tr key={index}>
                    <td className="table-title-cell">
                      {currentClass.class_code}
                    </td>
                    <td>{currentClass.class_title}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      {props.data.extenuating_circumstances.length == 0 ? null : 
      <Card>
        <Card.Header>Notifications</Card.Header>
        <Card.Body>
          <Card.Text>
            The below circumstances have been logged that may be affecting{" "}
            {props.student ? "your" : props.data.forename + "'s"} studies. <br />
            The details of these are only available to advisors and departmental
            staff.
          </Card.Text>
          <Table bordered responsive>
            <tbody>
              {props.data.extenuating_circumstances.map((element, index) => (
                <>
                  {!element.circumstances_type ||
                  element.circumstances_type == null ? null : (
                    <tr key = {index}>
                      <td className="table-title-cell">
                        {element.circumstances_type.name}
                      </td>
                      <td>{moment(element.date).format("MMMM Do YYYY")}</td>
                      <td>
                        {element.details}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      }
    </div>
  );
}
