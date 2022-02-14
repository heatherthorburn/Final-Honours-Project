/**
 * Screen to display a list of students a teacher is an advisor to
 * Action is dispatched and then passed as prop to supertable component.
 */

import React, { useEffect } from "react";
import { getAdvisees } from "../../Actions/studentActions";
import { useDispatch, useSelector } from "react-redux";
import StudentSuperTable from "../../Components/Tables/StudentSuperTable";
import { CSSTransition } from "react-transition-group";

export default function AdviseesScreen() {
  const dispatch = useDispatch();
  const adviseeList = useSelector((state) => state.advisees);
  const { loading, details, error } = adviseeList;
  const staffSignIn = useSelector((state) => state.staffSignIn);
  const staff_id = staffSignIn.staffInfo.data.staff_id;

  useEffect(() => {
    if (staff_id !== null) dispatch(getAdvisees(staff_id));
  }, [dispatch, staff_id]);


  return (
    <>
      {details ? (
        <CSSTransition appear={true} in={true} timeout={300} classNames="fade">
          <StudentSuperTable
            table_header={"Advisees"}
            data={adviseeList.details.data}
          />
        </CSSTransition>
      ) : null}
    </>
  );
}
