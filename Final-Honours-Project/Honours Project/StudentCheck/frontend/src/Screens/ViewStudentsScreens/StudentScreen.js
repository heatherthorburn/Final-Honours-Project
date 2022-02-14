/**
 * A component that displays students by class. This is for teachers viewing students
 * in their class. This offers the ability to filter students by name or matriculation number
 * and offers indicators regarding a students attendance and coursework.
 * It also provides links to students class profiles.
 */

import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { listStudentsInClass } from "../../Actions/classActions";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
import DataTable from "react-data-table-component";
import { customStyles } from "../../Components/Tables/tableStyle";
import { CgProfile } from "react-icons/cg";
import { CSSTransition } from "react-transition-group";
import { useParams } from "react-router";
import { STUDENT_CLASS_CLEANUP } from "../../Constants/classConstants";

import StatsIndicator from "../../Components/Indicators/StatsIndicator";
import Spinner from 'react-bootstrap/Spinner'

export default function StudentScreen() {
  let { class_code } = useParams();

  const dispatch = useDispatch();
  const classList = useSelector((state) => state.studentClassList);
  const staffSignIn = useSelector((state) => state.staffSignIn);

  const { loading, students, error } = classList;

  const [filterVal, setFilterVal] = useState("");
  const [inProp, setInProp] = useState(false);
  const [noStudentsEnrolled, setNoStudentsEnrolled] = useState(false);

  var filtered = [];

  useEffect(() => {
    dispatch(listStudentsInClass(class_code)).then(
      setInProp(true)
    );

    return function cleanup() {
      dispatch({ type: STUDENT_CLASS_CLEANUP });
    };
  }, [dispatch, class_code]);

  const filterBox = useMemo(() => {
    return (
      <>
        <label>Search by Name/Matriculation Number : </label>
        <FormControl
          aria-label="filter-students-input"
          value={filterVal}
          onChange={(e) => setFilterVal(e.target.value)}
          className="search-bar"
          placeholder="Search Students"
        />
      </>
    );
  });

  /**
   * convert the class list into readable format for datatable, and to apply set filters
   */


  if (students) {
    var temprows = [];
    classList.students.data.students.forEach((element) => {
      var grade = null;
      var attendance = null;
      if (element.attendance_stats.length > 0) {
        attendance = element.attendance_stats[0].attendance_stat
      }
      temprows.push({
        id: element.matric,
        matric: element.matric,
        forename: element.forename,
        surname: element.surname,
        attendance: attendance,
        grade: grade,
      });
    });
    filtered = classList.students.data.students.filter(
      (item) =>
        item.matric.includes(filterVal) ||
        item.forename.toLowerCase().includes(filterVal.toLowerCase()) ||
        item.surname.toLowerCase().includes(filterVal.toLowerCase())
    );
  }

  const columns = useMemo(() => [
    { name: "Matric", selector: "matric", sortable: true, hide: "md" },
    {
      name: "Forename",
      selector: "forename",
      sortable: true,
    },
    {
      name: "Surname",
      selector: "surname",
      sortable: true,
    },
    {
      name: "Attendance",
      selector: row => row.attendance_stats[0].attendance_stat,
      hide: "sm",
      width: "130px",
      sortable: true,
      style: {
        justifyContent: "center",
      },
      cell: (row) => (
        <>
          {row.attendance_stats.length > 0 ? (
            <StatsIndicator stat={row.attendance_stats[0].attendance_stat} />
          ) : (
              "-"
            )}
        </>
      ),
    },
    {
      name: "Coursework",
      selector: row => row.weighted_grades.length > 0 ? row.weighted_grades[0].coursework_average : 0,
      hide: "sm",
      sortable: true,
      width: "130px",
      style: {
        justifyContent: "center",
      },
      sortable: false,
      cell: (row) => (
        <>
          {row.weighted_grades.length > 0 ? (
            <StatsIndicator stat={row.weighted_grades[0].coursework_average} />
          ) : (
              "-"
            )}
        </>
      ),
    },
    {
      name: "",
      selector: "",
      sortable: false,
      cell: (row) => (
        <div className="cell-container">
          <Link
            className="profile-button-link"
            to={"/profile/" + class_code + "/" + row.matric}
          >
            <Button
              aria-label={row.matric + "-profile-button"}
              className="profile-button"
            >
              <span className="sm-label">Profile</span>
              <CgProfile />
            </Button>
          </Link>
        </div>
      ),
    },
  ]);

  return (
    <div>
      <CSSTransition
        appear={true}
        in={students}
        timeout={300}
        classNames="fade"
      >
        <div>
          {loading ? <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> : error ? (
            <div className="center-alert-container">
              <Alert className="center-alert" variant="danger">
                {error}
              </Alert>
            </div>
          ) : noStudentsEnrolled ? (
            <Alert variant="danger">
              There are no students currently enrolled in this class.
            </Alert>
          ) : students ? (
            <>
              <div className="table-screen-layout">
                <Card className="default-padding">{filterBox}</Card>
                <Card>
                  <Card.Header>
                    {students.data.class_code.toUpperCase() +
                      " - " +
                      students.data.class_title}
                  </Card.Header>
                  <Card.Body>
                    {filtered.length == 0 ? (
                      <div style = {{padding: "1rem"}}>
                      <Alert style = {{margin: "auto"}} variant="danger">No students found!</Alert>
                      </div>
                    ) : (
                        <DataTable
                          noHeader={true}
                          className="data-table"
                          columns={columns}
                          data={filtered}
                          customStyles={customStyles}
                          noContextMenu="true"
                          noDataComponent={null}
                        />
                      )}
                  </Card.Body>
                </Card>
              </div>
            </>
          ) : null}
        </div>
      </CSSTransition>
    </div>
  );
}
