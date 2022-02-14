/**
 * Component for displaying the general information about a student such as name, email...
 */

import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import moment from "moment";

export default function GeneralInfo(props) {
  const data = props.data.data;
  console.log(data)
  return (
    <div className="general-info-container">
      {!data ? null : (
        <>
          <Card className="margin-bottom">
            <Card.Header>Student Info</Card.Header>
            <Card.Body>
              <Table bordered responsive>
                <thead></thead>
                <tbody>
                  <tr>
                    <td className="table-title-cell">Name</td>
                    <td>
                      {data.forename} {data.surname}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-title-cell">Course</td>
                    <td>
                      {data.course == null
                        ? "No course listed"
                        : data.course.course_title}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-title-cell">Academic Year</td>
                    <td>{data.year}</td>
                  </tr>
                  <tr>
                    <td className="table-title-cell">Department</td>
                    <td>
                      {data.course == null
                        ? "No department listed"
                        : data.course.department.dept_title}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-title-cell">Advisor</td>
                    <td>
                      {data.staff == null ? (
                        "No advisor listed"
                      ) : (
                        <>
                          {data.staff.forename} {data.staff.surname}{" "}
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Enrolments</Card.Header>
            <Card.Body>
              {data.classes == null || data.classes.length === 0 ? (
                "No classes listed"
              ) : (
                <Table responsive bordered>
                  <tbody>
                    {data.classes.map((element, index) => (
                      <tr key={index}>
                        <td className="table-title-cell">
                          {element.class_code.toUpperCase()}
                        </td>
                        <td>{element.class_title}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
          {/* No need to display if there's no extenuating circumstances logged. */}
          {data.extenuating_circumstances == null ||
          data.extenuating_circumstances.length === 0 ? null : (
            <Card>
              <Card.Header>Notifications</Card.Header>
              <Card.Body className="attendance-card-body">
                <Card.Text>
                  The below circumstances have been logged that may be affecting{" "}
                  {data.forename}'s studies. <br />
                  The details of these are only available to advisors and
                  departmental staff.
                </Card.Text>
                <Table bordered responsive>
                  <tbody>
                    {data.extenuating_circumstances.map((element) => (
                      <>
                        {!element.circumstances_type ||
                        element.circumstances_type == null ? null : (
                          <tr>
                            <td className="table-title-cell">
                              {element.circumstances_type.name}
                            </td>
                            <td>
                              {moment(element.date).format("MMMM Do YYYY")}
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
