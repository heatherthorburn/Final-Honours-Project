/**
 * Responsible for displaying the number of notifications in the header.
 * Dispatches action to get notifications every 5 minutes to keep notifications up to date
 * This is for students. Due to the nature of the JSON objects returned from server side the 
 * two functions to get notifications had to be separate.
 */

import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import { useEffect, useState } from "react";
import { studentNotifications } from "../../Actions/studentUserActions";
import { useDispatch, useSelector } from "react-redux";

export default function NotficationBell() {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const studentID = studentSignIn.studentInfo.data.matric;
  const [numberNotifications, setNumberNotifications] = useState(0);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.studentNotifications);
  const { notifications } = notes;


  useEffect(() => {
    if (!notifications && studentID) {
      dispatch(studentNotifications(studentID));
    } else {
      var count = 0;
      if (notifications && notifications.low_attendances && notifications.low_attendances.length > 0) {
        count = count + notifications.low_attendances.length;
      }
      if (notifications && notifications.low_grades && notifications.low_grades.length > 0) {
        count = count + notifications.low_grades.length;
      }
      setNumberNotifications(count);
    }
    /** Dispatch every 5 mins to keep up to date */
    const interval = setInterval(() => {
      dispatch(studentNotifications(studentID));
    }, 600000);
    return () => clearInterval(interval);
  }, [dispatch, notifications, studentID]);

  return (
    <>
      <div className="flex">
        <AiOutlineBell />
        <div className="num-notif">{numberNotifications}</div>
      </div>
    </>
  );
}