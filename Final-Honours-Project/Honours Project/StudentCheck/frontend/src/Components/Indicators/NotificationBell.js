/**
 * Responsible for displaying the number of notifications in the header.
 * Dispatches action to get notifications every 5 minutes to keep notifications up to date.
 */


import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import { useEffect, useState } from "react";
import { staffNotifications } from "../../Actions/staffUserActions";
import { useDispatch, useSelector } from "react-redux";

export default function NotficationBell() {
  const staffSignIn = useSelector((state) => state.staffSignIn);
  const staffID = staffSignIn.staffInfo.data.staff_id;
  const [numberNotifications, setNumberNotifications] = useState(0);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notifications);
  const { notifications } = notes;


  useEffect(() => {
    if (!notifications && staffID) {
      dispatch(staffNotifications(staffID));
     } else {
      var count = 0;
      if (notifications && notifications.classes && notifications.classes.length > 0) {
        notifications.classes.forEach((element) => {
          if (element.low_attendances && element.low_attendances.length > 0) {
            count = count + element.low_attendances.length;
          }
          if (element.low_grades && element.low_grades.length > 0) {
            count = count + element.low_grades.length;
          }
        })
      }
      if (notifications && notifications.departments && notifications.departments.length > 0) {
        notifications.departments.forEach((element) => {
          if (element.department_notifications && element.department_notifications.length > 0) {
            count = count + element.department_notifications.length;
          }
        })
      }
      if (notifications && notifications.students && notifications.students.length > 0) {
        count = count + notifications.students.length
      }
      setNumberNotifications(count)
    } 
    /** Dispatch every 5 mins */
    const interval = setInterval(() => {
      dispatch(staffNotifications(staffID));
    }, 600000); 
    return () => clearInterval(interval);
  }, [dispatch, notifications, /*staffID, error */]);

  return (
    <>
      <div className="flex">
        <AiOutlineBell />
        <div className="num-notif">{numberNotifications}</div>
      </div>
    </>
  );
}
