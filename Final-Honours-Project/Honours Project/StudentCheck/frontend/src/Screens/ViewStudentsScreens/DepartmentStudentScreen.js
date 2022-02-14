/**
 * Action dispatched to get all students in a department before
 * being passed into supertable component
 */

import React, { useEffect, useState } from "react";
import { getDepartmentStudents } from "../../Actions/studentActions";
import { useDispatch, useSelector } from "react-redux";
import StudentSuperTable from "../../Components/Tables/StudentSuperTable";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"

export default function DepartmentScreen() {
  let { id } = useParams();

  const dispatch = useDispatch();
  const students = useSelector((state) => state.departmentStudents);
  const staffSignIn = useSelector((state) => state.staffSignIn);
  const { loading, details, error } = students

  useEffect(() => {
    dispatch(getDepartmentStudents(id))
  }, [id, dispatch])

  return (
    <>
      {loading ? <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> : error ?
          <div className="center-alert-container">
            <Alert className="center-alert" variant="danger">{error}</Alert>
          </div>
          : details ? (
            <CSSTransition appear={true} in={true} timeout={300} classNames="fade">
              <StudentSuperTable table_header={"Department - " + id.toUpperCase()} data={details.data} />
            </CSSTransition>
          ) : null}
    </>
  );
}
