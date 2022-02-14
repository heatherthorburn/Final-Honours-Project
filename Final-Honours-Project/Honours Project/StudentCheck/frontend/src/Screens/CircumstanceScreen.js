/**
 * Screen for the circumstance form
 * The form is split into three parts, page1, page2 and page3
 * Status of the form is stored in state and used over the three stages.
 */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { getStudentCircumstancesResources } from "../Actions/studentUserActions";
import { submitCircumstanceForm } from "../Actions/studentUserActions";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import AdviceBox from "../Components/Utilities/AdviceBox";
import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useParams } from "react-router";
import Alert from "react-bootstrap/Alert";
import { SUBMIT_CIRCUMSTANCE_RESET } from "../Constants/studentUserConstants";
import { CSSTransition } from "react-transition-group";

export default function CircumstanceScreen() {
  const staffSignIn = useSelector((state) => state.staffSignIn);
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { staffInfo } = staffSignIn;
  const { studentInfo } = studentSignIn;

  let { id } = useParams();

  const dispatch = useDispatch();
  const circumstanceList = useSelector((state) => state.resources);
  const circumstanceSubmit = useSelector((state) => state.submitCircumstance);
  const { resources } = circumstanceList;
  const { resources: submit } = circumstanceSubmit;
  const [selectedCircumstances, setSelectedCircumstances] = useState();
  const [details, setDetails] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [circumstanceError, setCircumstanceError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [displayUpdate, setDisplayUpdate] = useState(false);


  useEffect(() => {
    if (!resources) {
      dispatch(getStudentCircumstancesResources());
    }

    return function cleanup() {
      dispatch({ type: SUBMIT_CIRCUMSTANCE_RESET });
    };
  }, [dispatch, resources]);


  /**
   * Validates input for first page
   */
  function validatePage1() {
    if (!selectedCircumstances) {
      setCircumstanceError(true);
    }
    if (!details || details === "") {
      setDetailsError(true);
    }
    if (!startDate) {
      setDateError(true);
    }
    if (startDate && selectedCircumstances && details && !details == "") {
      setCircumstanceError(false);
      setDetailsError(false);
      setDateError(false);
      setPage(2);
    }
  }

  function handleSubmitClick() {
    dispatch(
      submitCircumstanceForm(selectedCircumstances.id, startDate, details, id)
    );
  }

  function Page2() {
    return (
      <Card page={page}>
        <div className="grid-gap">
          <h1>Services</h1>
          {!selectedCircumstances ? null : (
            <AdviceBox circumstance={selectedCircumstances} />
          )}
          <div className="flex">
            <Button
              className="profile-button prev-button"
              onClick={() => setPage(1)}
            >
              Previous
            </Button>
            <Button
              className="profile-button next-button"
              onClick={() => setPage(3)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <CSSTransition appear={true} in={true} timeout={300} classNames="fade">
      <div style = {{display: "flex", justifyContent: "center"}} className="default-padding">
        {page === 1 ? (
          <Card className="default-padding">
            {!resources ? null : (
              <>
                <p>
                  Select an option that most describes
                  {staffInfo ? " the student's" : "your"} circumstances.
                </p>
                {!circumstanceError ? null : (
                  <div className="error"> * Please select an option</div>
                )}
                <ToggleButtonGroup
                  className="button-group"
                  name="type"
                  defaultValue={selectedCircumstances}
                  vertical="true"
                  type="radio"
                  onChange={(e) => setSelectedCircumstances(e)}
                >
                  {resources.data.map((resource, index) => (
                    <ToggleButton
                      value={resource}
                      variant="secondary"
                      key={index}
                    >
                      {resource.name}
                    </ToggleButton>
                  ))}
                  <ToggleButton value="other" variant="secondary">
                    Other
                  </ToggleButton>
                </ToggleButtonGroup>
              </>
            )}
            <div>
              <p>Select the date these circumstances began: </p>
              {!dateError ? null : (
                <div className="error"> * Please select a date</div>
              )}
              <DatePicker
                selected={startDate}
                minDate = {moment().subtract(1, "year").toDate()}
                maxDate = {moment().toDate()}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <p>
              Please provide some details
              {staffInfo ? "." : " (these will be available to your advisor)."}
            </p>
            {!detailsError ? null : (
              <div className="error">* Please enter some details</div>
            )}
            <InputGroup>
              <Form.Control
                className={
                  detailsError == "" ? "search-bar" : "search-bar error"
                }
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                as="textarea"
                rows={4}
              />
            </InputGroup>
            <Button
              className="profile-button next-button default-margin-top"
              onClick={() => validatePage1()}
            >
              Next
            </Button>
          </Card>
        ) : page === 2 ? (
          <Page2 />
        ) : (
          <Card className="margin-1rem">
            <h1 className="default-padding">Review</h1>
            <Table bordered responsive>
              <thead></thead>
              <tbody>
                <tr>
                  <td className="table-title-cell">Type</td>
                  <td>{selectedCircumstances.name}</td>
                </tr>
                <tr>
                  <td className="table-title-cell">Date Started</td>
                  <td>{moment(startDate).format("MMMM do YYYY")}</td>
                </tr>
                <tr>
                  <td className="table-title-cell">Details</td>
                  <td>{details}</td>
                </tr>
              </tbody>
            </Table>
            <p className="default-padding">
              Submitting this form will let teachers and staff within{" "}
              {staffInfo ? "the student's department" : "your department"} know
              that {staffInfo ? "the student is " : "you are"} experiencing
              circumstances that may affect your studies.
            </p>
            <p className="default-padding">
              The details will only be available to{" "}
              {staffInfo ? "the students" : "your"} personal advisor and the departmental head.
            </p>
            {submit ? (
                <Alert style={{marginBottom: "0"}} variant="success">Successfully submitted</Alert>
            ) : (
              <>
                <Button
                  className="profile-button prev-button"
                  onClick={() => setPage(2)}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => handleSubmitClick()}
                  className="button default-margin-top"
                >
                  Submit
                </Button>
              </>
            )}
          </Card>
        )}
      </div>
    </CSSTransition>
  );
}
