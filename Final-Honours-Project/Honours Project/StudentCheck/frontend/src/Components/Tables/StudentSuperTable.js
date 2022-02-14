/**
 * Component for displaying the table for departmental staff/advisees
 * Offers abilty for multiple filters
 * Displays a warning if student has any departmental notifications
 */

import React from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "./tableStyle";
import { useState, useMemo } from "react";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import { CgProfile } from "react-icons/cg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import {AiFillWarning} from "react-icons/ai";

export default function StudentSuperTable(props) {
  //define filters
  const [filterVal, setFilterVal] = useState("");
  const [filterYear, setFilterYear] = useState(false);
  const [filterCourse, setFilterCourse] = useState("");

  const data = props.data;
  var temprows = [];

  //convert to readable format for react-data-table-component
  data.forEach((element) => {
    temprows.push({
      id: element.matric,
      matric: element.matric,
      forename: element.forename,
      surname: element.surname,
      year: element.year,
      course: element.course.course_title,
      department_notifications : element.department_notifications
    });
  });
  //apply filters
  var filtered = temprows.filter(
    (item) =>
      item.matric.includes(filterVal) ||
      item.forename.toLowerCase().includes(filterVal.toLowerCase()) ||
      item.surname.toLowerCase().includes(filterVal.toLowerCase())
  );
  filtered = filtered.filter((item) => item.course.toLowerCase().includes(filterCourse.toLowerCase()));
  if (filterYear) {
    filtered = filtered.filter((item) => item.year == filterYear);
  }

  const filterBox = useMemo(() => {
    return (
      <>
        <FormLabel>Filter by Name/Matriculation Number:</FormLabel>
        <FormControl
          className = "search-bar"
          value={filterVal}
          onChange={(e) => setFilterVal(e.target.value)}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Search Students"
        />
        <FormLabel>Filter by Course: </FormLabel>
        <FormControl
          className = "search-bar"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Search Courses"
        />
        <div className = "align-toggle-button">
        <div className = "filter-toggle-button-container">
        <FormLabel>Filter by Year: </FormLabel>
        <ToggleButtonGroup
          className="filter-button-group"
          value={filterYear}
          type="radio"
          name="year"
          onChange={(e) => setFilterYear(e)}
        >
          <ToggleButton value="1"> 1 </ToggleButton>
          <ToggleButton value="2"> 2 </ToggleButton>
          <ToggleButton value="3"> 3 </ToggleButton>
          <ToggleButton value="4"> 4 </ToggleButton>
          <ToggleButton value="5"> 5 </ToggleButton>
        </ToggleButtonGroup>
        </div>
        </div>
        <Button onClick={() => clearFilters()} className="button">
          Clear Filters
        </Button>
      </>
    );
  });

  //destroy all filters
  function clearFilters() {
    setFilterCourse("");
    setFilterVal("");
    setFilterYear(false);
  }

  //defines columns for react-data-table-component.
  const columns = [
    { name: "Matric", selector: "matric", hide: "md", sortable: true },
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
      name: "Course",
      hide: "sm",
      selector: "course",
      sortable: true,
    },
    {
      name: "Year",
      width: "80px",
      hide: "sm",
      selector: "year",
      sortable: true,
    },
    {
      name: "",
      width: "80px",
      hide: "md",
      selector: "",
      cell : (row) => {
      if (row.department_notifications.length > 0) { return <AiFillWarning style = {{fontSize : "xx-large"}} className = "warning" /> } else { return null }
      }
    },
    {
      name: "",
      selector: "",
      style: {
        justifyContent: "flex-end",
      },
      sortable: false,
      cell: (row) => (
        <Link
          className="profile-button-link"
          to={"/profile/advisor/" + row.matric}
        >
          <Button className="profile-button">
            <span className="sm-label">Profile</span>
            <CgProfile />
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="table-screen-layout">
      <Card className="default-padding">{filterBox}</Card>

      <Card>
        <Card.Header>{props.table_header}</Card.Header>
        <Card.Body>
          <DataTable
            noHeader={true}
            className="super-data-table"
            columns={columns}
            data={filtered}
            customStyles={customStyles}
            noContextMenu="true"
          />
        </Card.Body>
      </Card>
    </div>
  );
}
