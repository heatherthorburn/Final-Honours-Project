/**
 * Super profile for department heads, students and advisors.
 */

import React from "react";
import { useParams } from "react-router";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDetailedProfile } from "../../Actions/studentActions";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { superGeneratePDF } from "../../Functions/generatePDF";
import { FaFilePdf } from "react-icons/fa";
import Overview from "../../Components/SuperProfileComponents/Overview";
import ClassOverview from "../../Components/SuperProfileComponents/ClassOverview";
import { CSSTransition } from "react-transition-group";
import Spinner from "react-bootstrap/Spinner"
import {Link} from "react-router-dom"
import Alert from 'react-bootstrap/Alert'

export default function SuperProfileScreen(props) {
  let { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.superProfile);

  const { loading, details, error } = data;

  useEffect(() => {
      dispatch(getStudentDetailedProfile(id));
  }, [dispatch, id]);

  return (
    <div className="page-margin">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant = "danger">{error}</Alert>
      ) : (
        <CSSTransition appear={true} in={true} timeout={300} classNames="fade">
          <Card>
            <div className="button-container">
              <Button
                onClick={() => superGeneratePDF(details.data)}
                className="hide-mobile profile-button margin-right"
              >
                Export Report to PDF <FaFilePdf />
              </Button>

              {props.student ? null :              
              <Link to={"/staff/circumstances/" + id}>
                <Button
                  aria-label="submit-circumstance-button"
                  className="profile-button circumstance-button margin-right"
                >
                  Submit a Circumstance Form
                </Button>
              </Link>
              }
            </div>

            <Tabs id="class-profile-tabs" defaultActiveKey="overview-tab">
              <Tab eventKey="overview-tab" title="Overview">
                <Overview student = {props.student ? true : false} data={details.data} />
              </Tab>
              {details.data.classes.map((currentClass) => (
                <Tab
                  key={currentClass.class_code}
                  eventKey={currentClass.class_code + "-tab"}
                  title={currentClass.class_code.toUpperCase()}
                >
                  <ClassOverview
                    student = {props.student ? true : false}
                    forename={details.data.forename}
                    data={currentClass}
                  />
                </Tab>
              ))}
            </Tabs>
          </Card>
        </CSSTransition>
      )}
    </div>
  );
}
