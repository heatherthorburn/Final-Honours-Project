import React, { useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaFilePdf } from "react-icons/fa";
import GeneralInfo from "../../Components/ClassProfileComponents/GeneralInfo";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDetails } from "../../Actions/studentActions";
import { classPDFGenerator } from "../../Functions/generatePDF";
import AttendanceInfo from "../../Components/ClassProfileComponents/AttendanceInfo";
import { STUDENT_DETAILS_CLEANUP } from "../../Constants/studentConstants";
import Spinner from "react-bootstrap/Spinner";
import { CSSTransition } from "react-transition-group";
import { Link } from 'react-router-dom'
import Alert from "react-bootstrap/esm/Alert";

/* A component that fetches the data about a student from a certain class, this is used for teaching staff */

export default function StudentClassProfile() {
  var { class_code, student_id } = useParams();

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.studentDetails);
  const { loading, details, error } = profile;

  useEffect(() => {
    dispatch(getStudentDetails(class_code, student_id));

    return function cleanup() {
      dispatch({ type: STUDENT_DETAILS_CLEANUP });
    };
  }, [dispatch, class_code, student_id]);

  return (
    <div className="page-margin">
      {details ? (
        <CSSTransition appear={true} in={true} timeout={300} classNames="fade">
          <Card>
            <div className="button-container">
              <Button
                aria-label="export-pdf-button"
                onClick={() => classPDFGenerator(profile, class_code)}
                className="hide-mobile profile-button margin-right"
              >
                Export Report to PDF <FaFilePdf />
              </Button>

              <Link to={"/staff/circumstances/" + student_id}>
                <Button
                  aria-label="submit-circumstance-button"
                  className="profile-button circumstance-button margin-right"
                >
                  Submit a Circumstance Form
                </Button>
              </Link>
            </div>

            <Tabs id="class-profile-tabs" defaultActiveKey="general-tab">
              <Tab eventKey="general-tab" title="Student Info">
                <GeneralInfo data={profile.details} />
              </Tab>
              <Tab
                eventKey="stats-tab"
                title={"Academic Info for " + class_code.toUpperCase()}
              >
                <AttendanceInfo data={profile.details.data} />
              </Tab>
            </Tabs>
          </Card>
        </CSSTransition>
      ) : loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : error ? error.message ? <Alert variant = "danger">{error.message}</Alert> : <Alert variant = "danger">{error}</Alert> : null}
    </div>
  );
}
