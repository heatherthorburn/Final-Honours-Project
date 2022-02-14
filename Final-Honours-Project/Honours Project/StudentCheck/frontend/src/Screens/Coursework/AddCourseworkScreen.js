/**
 * Screen for adding a coursework to the db.
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { addCoursework, getClassCoursework } from "../../Actions/courseworkActions";
import { Link } from "react-router-dom";
import { ADD_COURSEWORK_RESET } from "../../Constants/courseworkConstants";
import { CSSTransition } from "react-transition-group";

export default function AddCourseworkScreen() {
  let { class_code } = useParams();

  const addCW = useSelector((state) => state.addCourseworkToDB);
  const dispatch = useDispatch();
  const { session, error } = addCW;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");

  const [submit, setSubmit] = useState(false);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [weightError, setWeightError] = useState("");

  const allCW = useSelector((state) => state.classCoursework);
  const { totalWeight } = allCW;

  const [validated, setValidated] = useState(false);


  useEffect(() => {
    dispatch(getClassCoursework(class_code));
    if (validated) {
      dispatch(addCoursework(title, description, class_code, weight));
    }

    return function cleanup() {
      dispatch({ type: ADD_COURSEWORK_RESET });
    };
  }, [dispatch, validated]);

  function validateInputs() {
    var titleOK = false;
    var descriptionOK = false;
    var weightOK = false;

    /* VALIDATE TITLE */

    if (title === "" || title == null) {
      setTitleError("Please enter a title.");
    } else {
      setTitleError("");
      titleOK = true;
    }

    /* VALIDATE DESCRIPTION */

    if (description === "" || description == null) {
      setDescriptionError("Please enter a description");
    } else {
      setDescriptionError("");
      descriptionOK = true;
    }

    /* VALIDATE WEIGHT */

    if (weight === "" || weight == null) {
      setWeightError("Please enter a weight");
    } else if (weight < 0 || weight > 100) {
      setWeightError("Your weight must be between 0 and 100.");
    } else if (isNaN(weight)) {
      setWeightError("Please enter a valid number.");
    } else if (Number(totalWeight) + Number(weight) > 100) {
      setWeightError("Current coursework adds up to " + totalWeight + "%. This needs to be " + (100 - totalWeight) + "% or lower.")
    } else {
      setWeightError("");
      weightOK = true;
    }

    /* EITHER TRUE IF ALL ARE VALIDATED OR FALSE */

    if (titleOK === true && descriptionOK === true && weightOK === true) {
      setValidated(true);
      setSubmit(true);
    } else {
      setValidated(false);
    }
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleWeightChange(e) {
    setWeight(e.target.value);
  }

  function reset() {
    setWeight("");
    setTitle("");
    setDescription("");
    setValidated(false);
    setSubmit(false);
  }

  return (
    <CSSTransition appear={true} in={true} timeout={300} classNames="fade">
      <div className="default-padding">
        <Card style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Card.Header>
            Adding Coursework for {class_code.toUpperCase()}
          </Card.Header>
          {error ? <Alert variant = "danger">{error.message}</Alert> : null}
          <Card.Body>
            <Form className="add-coursework-form">
              Coursework Title:
              <Form.Control
                value={title}
                disabled={submit}
                className={
                  titleError === "" ? "search-bar" : "search-bar error"
                }
                onChange={handleTitleChange}
                type="text"
              ></Form.Control>
              <span className="error-message">{titleError}</span> <br />
              Description:
              <Form.Control
                value={description}
                disabled={submit}
                as="textarea"
                className={
                  descriptionError === "" ? "search-bar" : "search-bar error"
                }
                rows="4"
                onChange={handleDescriptionChange}
                type="textarea"
              ></Form.Control>
              <span className="error-message">{descriptionError}</span>
              <br />
              Percentage of Grade:
              <InputGroup className="mb-2">
                <Form.Control
                  value={weight}
                  disabled={submit}
                  className={
                    weightError === "" ? "search-bar" : "search-bar error"
                  }
                  onChange={handleWeightChange}
                  type="text"
                ></Form.Control>
                <InputGroup.Append>
                  <InputGroup.Text className="percentage-prepend">
                    %
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              <span className="error-message">{weightError}</span> <br />
              {session ? null : (
                <Button className="button" onClick={() => validateInputs()}>
                  Add Coursework
                </Button>
              )}
              {session ? (
                <div>
                  <Alert variant="success">
                    Coursework added with ID #{session.data.id}
                  </Alert>
                  <div className="add-coursework-button-container">
                    <Button
                      style={{ justifyContent: "center" }}
                      className="profile-button"
                      onClick={() => reset()}
                    >
                      Add Another
                    </Button>
                    <Link
                      style={{ padding: "0rem" }}
                      to={
                        "/coursework/" +
                        class_code +
                        "/grades/" +
                        session.data.id
                      }
                    >
                      <Button
                        style={{ justifyContent: "center", width: "100%" }}
                        className="profile-button"
                      >
                        Add Grades
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : null}
              <Link
                style={{ padding: "0", marginTop: "1rem" }}
                to={"/coursework/" + class_code}
              >
                <Button className="button ">Return to Coursework Page</Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </CSSTransition>
  );
}
