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
import { calculateAverageGrade } from "../../Functions/calculateAverageGrade";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import DataTable from "react-data-table-component";
import { customStyles } from "./tableStyle";
import { CgProfile } from "react-icons/cg";
import { CSSTransition } from "react-transition-group";

import StatsIndicator from "../Indicators/StatsIndicator";

export default function StudentClassTable(props) {
  const dispatch = useDispatch();
  const classList = useSelector((state) => state.studentClassList);
  const { loading, students, error } = classList;
  const [filterVal, setFilterVal] = useState("");
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    dispatch(listStudentsInClass(props.class_code));
    if (students) {
      setInProp(true);
    }
  }, [dispatch, props.class_code]);

  const filterBox = useMemo(() => {
    return (
      <>
        <label>Search by Name/Matriculation Number : </label>
        <FormControl
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
    var attendance_stat = null;
    classList.students.data.students.forEach((element) => {
      if (element.attendance_stats) {
        attendance_stat = element.attendance_stat[0].attendance_stat
      }
      temprows.push({
        id: element.matric,
        matric: element.matric,
        forename: element.forename,
        surname: element.surname,
        attendance: attendance_stat
      });
    });
    var filtered = classList.students.data.students.filter(
      (item) =>
        item.matric.includes(filterVal) ||
        item.forename.toLowerCase().includes(filterVal.toLowerCase()) ||
        item.surname.toLowerCase().includes(filterVal.toLowerCase())
    );
  }

  const columns = [
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
      hide: "sm",
      selector: "attendance",
      width: "130px",
      sortable: true,
      style: {
        justifyContent: "center",
      },
      cell: (row) => (
        <StatsIndicator stat={row.attendance} />
      ),
    },
    {
      name: "Coursework",
      hide: "sm",
      width: "130px",
      style: {
        justifyContent: "center",
      },
      sortable: false,
      cell: (row) => (
        <StatsIndicator stat={calculateAverageGrade(row.coursework_grades)} />
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
            to={"/profile/" + props.class_code + "/" + row.matric}
          >
            <Button className="profile-button">
              <span className="sm-label">Profile</span>
              <CgProfile />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="table-screen-layout">
      <Card className="default-padding">{filterBox}</Card>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">Error occurred.</Alert>
      ) : students && filtered ? (
        <CSSTransition
          appear={true}
          in={inProp}
          timeout={300}
          classNames="fade"
        >
          <Card>
            <Card.Header>
              {students.data.class_code.toUpperCase() +
                " - " +
                students.data.class_title}
            </Card.Header>
            <Card.Body>
              <DataTable
                noHeader={true}
                className="data-table"
                columns={columns}
                data={filtered}
                selectableRowSelected={(row) => row.selected}
                customStyles={customStyles}
                noContextMenu="true"
                noDataComponent={null}
              />
            </Card.Body>
          </Card>
        </CSSTransition>
      ) : null}
    </div>
  );
}
