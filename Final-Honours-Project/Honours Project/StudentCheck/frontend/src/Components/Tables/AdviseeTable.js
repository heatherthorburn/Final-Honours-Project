/**
 * This component ended up being replaced by the super table
 */

import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStudentsInClass } from "../../Actions/classActions";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ClassStudentIndicator from "../Indicators/ClassStudentIndicator";
import { customStyles } from "./tableStyle";
import { Link } from "react-router-dom";

export default function StudentClassTable(props) {
  const dispatch = useDispatch();
  const classList = useSelector((state) => state.studentClassList);
  const log = useSelector((state) => state.logLectureAttendance);

  useEffect(() => {
    dispatch(listStudentsInClass(props.class_code));
  }, [dispatch, props.class_code]);

  const [filterVal, setFilterVal] = useState("");

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div className="filter-container">
        <InputGroup className="mb-3">
          <FormControl
            value={filterVal}
            onChange={(e) => setFilterVal(e.target.value)}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Search Students"
          />
        </InputGroup>
      </div>
    );
  });

  if (!classList.loading) {
    var temprows = [];

    classList.students.data.students.forEach((element) => {
      temprows.push({
        id: element.matric,
        matric: element.matric,
        forename: element.forename,
        surname: element.surname,
      });
    });
    var filtered = temprows.filter(
      (item) =>
        item.matric.includes(filterVal) ||
        item.forename.toLowerCase().includes(filterVal.toLowerCase()) ||
        item.surname.toLowerCase().includes(filterVal.toLowerCase())
    );
  }

  const columns = [
    {
      name: "",
      selector: "",
      grow: 1,
      sortable: false,
      cell: (row) => <ClassStudentIndicator student_id={row.matric} />,
    },
    { name: "Matric", grow: 4, selector: "matric", sortable: true },
    {
      name: "Forename",
      grow: 4,
      selector: "forename",
      sortable: true,
    },
    {
      name: "Surname",
      grow: 4,
      selector: "surname",
      sortable: true,
    },
    {
      name: "",
      grow: 4,
      selector: "",
      sortable: false,
      cell: (row) => (
        <Link to={"/profile/" + props.class_code + "/" + row.matric}>
          <Button onClick={() => alert(row.matric)}>Click</Button>
        </Link>
      ),
    },
  ];

  return classList.loading ? (
    <div>Loading...</div>
  ) : (
    <div className="tab-content">
      <DataTable
        noHeader={true}
        className="data-table"
        columns={columns}
        data={filtered}
        selectableRowSelected={(row) => row.selected}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        customStyles={customStyles}
        noContextMenu="true"
      />
    </div>
  );
}
