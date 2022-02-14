/**
 * Notification for department or advisors
 * As they are notified for 2+ classes with unsatisfactory attendances/grades, they will receive a 
 * difference notication card than the class notification.
 * The amount of classes they have concerning statistics in will be displayed instead of the stats.
 */

import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function NotificationCard(props) {
    const data = props.data;
    var low_grades = 0;
    var low_attendance = 0;
    if (data.cumulative_attendance > 1) {
        low_attendance = data.cumulative_attendance
    }
    if (data.cumulative_grades > 1) {
        low_grades = data.cumulative_grades
    }

    return (
        <div style={{ marginBottom: "1rem" }} className="notification-holder">
            <p style={{ marginTop: "auto", marginBottom: "auto" }}>{data.student.forename} {data.student.surname} {low_grades > 0 && low_attendance > 0 ? <> has poor grades in <span style={{ fontWeight: "bolder", color: "red" }}>{low_grades}</span> classes and low attendance in <span style={{ fontWeight: "bolder", color: "red" }}>{low_attendance}</span> classes.</> :
                low_grades > 0 && low_attendance == 0 ? <> has poor grades in <span style={{ fontWeight: "bolder", color: "red" }}>{low_grades}</span> classes. </> :
                    low_grades == 0 && low_attendance > 0 ? <> has poor grades in <span style={{ fontWeight: "bolder", color: "red" }}>{low_grades}</span> classes and low attendance in " + <span style={{ fontWeight: "bolder", color: "red" }}>{low_attendance}</span> classes. </> : null}
            </p>
            <Link style={{ height: "100%" }}
                className="profile-button-link"
                to={"/profile/advisor/" + data.matric}
            >
                <Button style={{ height: "100%" }} className="profile-button">Go to Profile</Button>
            </Link>
        </div>
    );
}
