import React from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import NotificationCard from "../Components/Feedback/NoticationCard";
import DepartmentNotificationCard from "../Components/Feedback/DepartmentNotificationCard"
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Alert from 'react-bootstrap/Alert'

/*
A screen component to display staff notifications
Notifications are split into different tabs for advisors, teachers and departmental staff
*/

export default function StaffNoticationScreen() {

  /* As notifications are gathered on load, we can get these from the state */

  const notes = useSelector((state) => state.notifications);
  const { notifications, error } = notes;
  console.log(notifications);

  return (
    <>
      {error ? <Alert variant="danger">Error retrieving notifications!</Alert> : null}

      {!notifications ? <Alert variant="warning">No notifications!</Alert> : (
        <div style={{ textAlign: "-webkit-center" }}>
          <div style={{ padding: "2rem", justifyContent: "center", maxWidth: "900px" }}>

            <Tabs style={{ marginBottom: "1rem" }} id="notification-type-tabs">

              {!notifications.classes ? null :
                <Tab key="class-notifications"
                  eventKey="class-notifications"
                  title="Classes">

                  <Card>
                    <Card.Header>Class Notifications</Card.Header>
                    <Card.Body style={{ padding: "1rem" }}>
                      <Tabs style={{ marginBottom: "1rem" }} id="class-notification-tabs">
                        {notifications.classes.map((element, index) => (
                          (!element.low_attendances || element.low_attendances.length == 0) && (!element.low_grades || element.low_grades.length == 0) ? null :
                            <Tab
                              key={element.class_code}
                              eventKey={element.class_code + "-tab"}
                              title={element.class_code.toUpperCase()}
                            >
                              {element.low_attendances.map((e, i) =>
                                <NotificationCard type="attendance" key={i} data={e} />
                              )}
                              {element.low_grades.map((e, i) =>
                                <NotificationCard type="average grade" key={i} data={e} />
                              )}
                            </Tab>
                        ))}
                      </Tabs>
                    </Card.Body>
                  </Card>

                </Tab>
              }

              {!notifications.departments || notifications.departments.length == 0 ? null :

                <Tab key="department-notifications"
                  eventKey="department-notifications"
                  title="Departments">

                  <Card>
                    <Card.Header>Department Notifications</Card.Header>
                    <Card.Body style={{ padding: "1rem" }}>
                      {notifications.departments.map((element, index) => (
                        element.department_notifications.length == 0 ?
                          <Alert style={{ margin: "0rem", textAlign: "center" }} variant="warning">No notifications for this department!</Alert>
                          : element.department_notifications.map((e, i) =>
                            <DepartmentNotificationCard data={e} />
                          )
                      ))}
                    </Card.Body>
                  </Card>

                </Tab>
              }

              {!notifications.students || notifications.students.length == 0 ? null :

                <Tab key="advisee-notifications"
                  eventKey="advisee-notifications"
                  title="Advisees">

                  <Card>
                    <Card.Header>Advisees Notifications</Card.Header>
                    <Card.Body style={{ padding: "1rem" }}>
                      {notifications.students.length == 0 ?
                        <Alert style={{ margin: "0rem", textAlign: "center" }} variant="warning">No notifications from your advisees!</Alert> :
                        <>
                          {notifications.students.map((element, index) => (
                            <DepartmentNotificationCard key={index} data={element.department_notifications[0]} />

                          )
                          )}
                        </>
                      }
                    </Card.Body>
                  </Card>

                </Tab>
              }
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
}
