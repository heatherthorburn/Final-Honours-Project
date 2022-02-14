import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getClassCoursework,
  getCourseworkByID,
  deleteCoursework,
  updateCoursework,
} from "../../Actions/courseworkActions";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {
  GET_COURSEWORK_BY_ID_RESET,
  DELETE_COURSEWORK_RESET,
  UPDATE_COURSEWORK_RESET,
} from "../../Constants/courseworkConstants";
import { CSSTransition } from "react-transition-group";

export default function EditCourseworkScreen(props) {
  const dispatch = useDispatch();

  const cw = useSelector((state) => state.coursework);
  const { classes: currentCoursework, error: courseworkError } = cw;
  const update = useSelector((state) => state.updateCoursework);
  const { success: updateSuccess } = update;
  const deleteCW = useSelector((state) => state.courseworkDelete);
  const { success: deleteSuccess } = deleteCW;
  const allCW = useSelector((state) => state.classCoursework);
  const { totalWeight } = allCW;

  const { class_code, id } = useParams();

  const [doubleCheckDelete, setDoubleCheckDelete] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [weight, setWeight] = useState("");
  const [weightError, setWeightError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (
      deleteSuccess ||
      updateSuccess ||
      !currentCoursework ||
      id != currentCoursework.data.id
    ) {
      dispatch(getCourseworkByID(id, class_code));
      dispatch(getClassCoursework(class_code));
      dispatch({ type: DELETE_COURSEWORK_RESET });
      dispatch({ type: UPDATE_COURSEWORK_RESET });
    } else {
      setWeight(currentCoursework.data.weight);
      setDescription(currentCoursework.data.coursework_description);
      setTitle(currentCoursework.data.title);
    }

    return function cleanup() {
      //dispatch({ type: GET_COURSEWORK_BY_ID_RESET });
      //dispatch({ type: DELETE_COURSEWORK_RESET });
      //dispatch({ type: UPDATE_COURSEWORK_RESET });
    }
  }, [dispatch, id, class_code, currentCoursework]);



  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleWeightChange(e) {
    setWeight(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function validateInputs(e) {
    var titleOK = false;
    var descriptionOK = false;
    var weightOK = false;

    /* VALIDATE TITLE */

    if (title == "" || title == null) {
      setTitleError("Please enter a title.");
    } else {
      setTitleError("");
      titleOK = true;
    }

    /* VALIDATE DESCRIPTION */

    if (description == "" || description == null) {
      setDescriptionError("Please enter a description");
    } else {
      setDescriptionError("");
      descriptionOK = true;
    }

    /* VALIDATE WEIGHT */

    if (weight == "" || weight == null) {
      setWeightError("Please enter a weight");
    } else if (weight < 0 || weight > 100) {
      setWeightError("Your weight must be between 0 and 100.");
    } else if (isNaN(weight)) {
      setWeightError("Please enter a valid number.");
    } else if (Number(totalWeight) + Number(weight) - Number(currentCoursework.data.weight) > 100) {
      setWeightError("Current coursework adds up to " + totalWeight + "%. This needs to be " + (100 - totalWeight + currentCoursework.data.weight) + "% or lower.")
    }
    else {
      setWeightError("");
      weightOK = true;
    }

    /* EITHER TRUE IF ALL ARE VALIDATED OR FALSE */

    if (titleOK == true && descriptionOK == true && weightOK == true) {
      dispatch(updateCoursework(id, title, description, weight));
      dispatch(getClassCoursework(class_code));
    }
  }

  function handleDeleteCoursework() {
    if (doubleCheckDelete) {
      dispatch(deleteCoursework(id));
    } else {
      setDoubleCheckDelete(true);
    }
  }

  return (
    <CSSTransition appear={true} in={true} timeout={300} classNames="fade">
      <div className="default-padding">
        {courseworkError ? (
          <Card style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Alert variant="danger">Coursework not found!</Alert>
            <Button className="button">Return to Coursework Page</Button>
          </Card>
        ) : deleteSuccess ? (
          <Card style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Alert variant="danger">Coursework successfully deleted</Alert>
            <Link style={{ padding: "0" }} to={"/coursework/" + class_code}>
              <Button className="button">Return to Coursework</Button>
            </Link>
          </Card>
        ) : currentCoursework ? (
          <Card style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Card.Header>Editing Coursework #{id}</Card.Header>
            <Form className="add-coursework-form">
              Coursework Title:
              <Form.Control
                value={title}
                disabled={updateSuccess}
                className={titleError == "" ? "search-bar" : "search-bar error"}
                onChange={handleTitleChange}
                type="text"
              ></Form.Control>
              <span className="error-message">{titleError}</span> <br />
              Description:
              <Form.Control
                value={description}
                disabled={updateSuccess}
                as="textarea"
                className={
                  descriptionError == "" ? "search-bar" : "search-bar error"
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
                  disabled={updateSuccess}
                  className={
                    weightError == "" ? "search-bar" : "search-bar error"
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
              {updateSuccess ? (
                <div>
                  <Alert variant="success">Coursework updated</Alert>
                  <Link
                    style={{ padding: "0" }}
                    to={"/coursework/" + class_code}
                  >
                    <Button className="button">Return to Coursework</Button>
                  </Link>
                </div>
              ) : (
                  <div>
                    {doubleCheckDelete ? (
                      <div className="delete-cw-button-group">
                        <Alert className="span-all-cols" variant="warning">
                          Are you sure you want to delete? This will delete any
                        assosciated student marks as well. <br />
                        </Alert>
                        <Button
                          onClick={() => handleDeleteCoursework()}
                          className="confirm-delete-cw"
                        >
                          Yes, delete
                      </Button>
                        <Button
                          onClick={() => setDoubleCheckDelete(false)}
                          className="donot-delete-cw"
                        >
                          No
                      </Button>
                      </div>
                    ) : (
                        <>
                          <Button
                            style={{ marginBottom: "1rem" }}
                            onClick={() => validateInputs()}
                            className="button"
                          >
                            Update Coursework
                      </Button>

                          <Button
                            style={{ marginBottom: "1rem" }}
                            onClick={() => handleDeleteCoursework()}
                            className="button"
                          >
                            Delete Coursework
                      </Button>
                          <Link
                            style={{ padding: "0" }}
                            to={"/coursework/" + class_code}
                          >
                            <Button className="button">Return to Coursework</Button>
                          </Link>
                        </>
                      )}
                  </div>
                )}
            </Form>
          </Card>
        ) : null}
      </div>
    </CSSTransition>
  );
}
