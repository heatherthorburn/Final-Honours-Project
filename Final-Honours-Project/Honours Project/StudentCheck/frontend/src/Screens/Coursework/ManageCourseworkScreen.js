/**
 * Screen for displaying all grades for for a given coursework
 */

import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseworkByID,
  getCourseworkMarks,
} from "../../Actions/courseworkActions";
import { customStyles } from "../../Components/Tables/tableStyle";
import { Link } from "react-router-dom";

import MarksIndicator from "../../Components/Indicators/MarksIndicator";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
import { CSSTransition } from "react-transition-group";
import { AiOutlineEdit } from "react-icons/ai";
import Alert from 'react-bootstrap/Alert';

export default function ManageCourseworkScreen() {
  const dispatch = useDispatch();
  const cwMarks = useSelector((state) => state.courseworkMarks);
  let { class_code, id } = useParams();
  var flattened = [];


  useEffect(() => {
    dispatch(getCourseworkMarks(id, class_code));
  }, [dispatch, id, class_code]);

  if (cwMarks.marks && cwMarks.marks.data !== "" && cwMarks.marks.data.coursework_grades.length > 0) {
    var temp = [];
    cwMarks.marks.data.coursework_grades.forEach((s) => {
      temp.push({
        matric: s.student.matric,
        forename: s.student.forename,
        surname: s.student.surname,
        grade: s.grade,
      });
    });
    flattened = temp;
  }

  const columns = [
    { name: "Matric", selector: "matric", hide: "sm", sortable: true },
    {
      name: "Forename",
      selector: (row) => row.forename,
      hide: "sm",
      sortable: true,
    },
    {
      name: "Surname",
      selector: "surname",
      sortable: true,
    },
    {
      name: "",
      cell: (row) => <MarksIndicator row={row} />,
    },
    {
      name: "",
      cell: (row) => (
        <Link style={{width: "100%"}}
          to={{pathname : "/coursework/" + class_code + "/grades/" + id + "/" + row.matric, state : { name : row.forename + " " + row.surname}}}
        >
          <Button style={{float:"right"}} className="profile-button"><span className="hidden-sm">Edit Grade</span><AiOutlineEdit /></Button>
        </Link>
      ),
    },
  ];

  return (
    <CSSTransition appear={true} in={true} timeout={300} classNames="fade">
      <div className="default-padding">
        {cwMarks.loading ? null : cwMarks.error ? <Alert variant = "danger">{cwMarks.error}</Alert> : (
          <Card style = {{marginLeft: "auto", marginRight: "auto"}}>
            <Card.Header>
              {class_code.toUpperCase()} - {cwMarks.marks.data.title}
            </Card.Header>
            <Card.Body>

              {cwMarks.marks.data == "" ? 
              <Alert style={{margin: "1rem"}} variant = "warning">There are no students enrolled in this class!</Alert>
              : (
                <div>
                  <Link className = "hide-mobile" style={{padding: "0"}}
                    to={"/coursework/" + class_code + "/grades/" + id + "/csv"}
                  >
                    <Button style = {{padding: "1rem", marginTop: "1rem", marginBottom: "1rem"}} className="button">Upload via CSV</Button>
                  </Link>
                  
                  <DataTable
                    noHeader={true}
                    className="data-table"
                    columns={columns}
                    data={flattened}
                    customStyles={customStyles}
                    noContextMenu="true"
                    noDataComponent={null}
                  />
                </div>
              )}
            </Card.Body>
          </Card>
        )}
      </div>
    </CSSTransition>
  );
}
