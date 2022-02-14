import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router";
import DataTable from "react-data-table-component";
import { customStyles } from "../../Components/Tables/tableStyle";
import { useDispatch, useSelector } from "react-redux";
import { getClassCoursework } from "../../Actions/courseworkActions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { GET_CLASS_COURSEWORK_RESET } from "../../Constants/courseworkConstants";
import { CSSTransition } from "react-transition-group";
import Alert from "react-bootstrap/Alert"

export default function CourseworkScreen() {
  let { class_code } = useParams();
  const dispatch = useDispatch();

  const staffSignIn = useSelector((state) => state.staffSignIn);
  const cw = useSelector((state) => state.classCoursework);
  const { classes, error } = cw;


  useEffect(() => {
    dispatch(getClassCoursework(class_code, staffSignIn.staffInfo.token));

    return function cleanup() {
      dispatch({ type: GET_CLASS_COURSEWORK_RESET });
    };
  }, [class_code, dispatch]);

  const columns = [
    { name: "Title", selector: "title", sortable: true },
    {
      name: "",
      selector: "id",
      sortable: false,
      cell: (row) => (
        <div className="button-container margin-left-auto">
          <Link
            to={{pathname : "/coursework/" + class_code.toLowerCase() + "/grades/" + row.id}}
          >
            <Button style={{marginLeft : "1rem"}} className="profile-button">
              Manage Grades <CgFileDocument />
            </Button>
          </Link>

          <Link
            to={{pathname : "/coursework/" + class_code.toLowerCase() + "/edit/" + row.id}}
          >
            <Button className="profile-button edit hidden-xs">
              <span className="hidden-sm">Edit</span>
              <AiOutlineEdit />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    error ? <Alert style = {{marginTop: "1rem"}} variant = "danger">{error}</Alert> : !classes ? null : 
    <CSSTransition appear={true} in={classes} timeout={300} classNames="fade">
      <div className="coursework-screen-layout">
        <Card className="fit-height">
          <Link to={{pathname : "/coursework/" + class_code.toLowerCase() + "/addcw"}}>
            <Button className="button">Add Coursework + </Button>
          </Link>
        </Card>

        <Card>
          <Card.Header>Coursework for {class_code.toUpperCase()}</Card.Header>

          <Card.Body>
            {!classes.data || classes.data.length == 0 ? (
              <Alert style={{margin: "1rem", textAlign: "center"}} variant="warning">
                No coursework has been added for this class yet!
              </Alert>
            ) : (
              <DataTable
                noHeader={true}
                className="data-table"
                columns={columns}
                data={cw.classes.data}
                customStyles={customStyles}
                noContextMenu="true"
                noDataComponent={null}
              />
            )}
          </Card.Body>
        </Card>
      </div>
    </CSSTransition>
  );
}
