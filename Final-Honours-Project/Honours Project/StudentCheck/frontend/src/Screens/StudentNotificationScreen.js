import React from 'react'
import { useSelector } from 'react-redux'
import NotificationCard from "../Components/Feedback/NoticationCard";
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

/* A component that makes up the screen to display student notifications */

export default function StudentNotificationScreen() {

    /* As notifications will have been gathered on login, get notifications from state */

    const notes = useSelector((state) => state.studentNotifications);
    const { notifications, error } = notes;

    console.log(notifications)

    return (
        <div style={{ margin: "1rem" }}>
            {error ? <Alert variant="danger">Error getting notifications.</Alert>
                : notifications ?
                    <div>
                        <Card style={{ padding: "1rem" }}>
                            {notifications.low_grades && notifications.low_grades.length == 0 && notifications.low_attendances && notifications.low_attendances.length == 0 ?
                            <Alert variant="info" style = {{margin: "0"}}>You don't have any notifications!</Alert> : null    
                        }
                            {notifications.low_grades ? notifications.low_grades.map((element, index) =>
                                <NotificationCard type="average grade" key={index} student={true} data={element} />
                            ) : null}
                            {notifications.low_attendances ? notifications.low_attendances.map((element, index) =>
                                <NotificationCard type="attendance" key={index} student={true} key={index} data={element} />
                            ) : null}
                        </Card>
                    </div>
                    : null}
        </div>
    )
}