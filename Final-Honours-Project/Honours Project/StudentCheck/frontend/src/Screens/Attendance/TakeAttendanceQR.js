/**
 * Screen that is displayed when students scan QR code
 */

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { studentQRAttendance } from '../../Actions/lectureActions'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

export default function TakeAttendanceQR() {
    const dispatch = useDispatch();
    let { id } = useParams()

    const log = useSelector((state) => state.studentQR);
    const [studentID, setStudentID] = useState("");
    const [inputError, setInputError] = useState("");

    function handleIDChange(e) {
        setStudentID(e.target.value)
    }

    function handleSubmitClick() {
        if (studentID == null || studentID == "") {
            setInputError("Please enter your Student ID")
        }
        else {
            dispatch(studentQRAttendance(id, studentID))
        }
    }


    return (
        <div style={{ margin: "1rem", padding: "1rem" }}>
            <Card style={{ marginTop: "1rem" }}>
                <Card.Header>Logging attendance for lecture #{id}</Card.Header>
                <Card.Body style={{ padding: "1rem", display: "flex", flexDirection: "column" }}>
                    <InputGroup style={{ width: "100%" }}>
                        Please enter your Student ID:
                            <FormControl style={{ width: "100%" }} className="search-bar" onChange={handleIDChange} />
                        <span className="error-message">{inputError}</span> <br />
                    </InputGroup>
                    {log.attendance ? null :
                        <Button onClick={() => handleSubmitClick()} style={{ marginTop: "1rem", fontSize: "2rem" }} className="button">Submit Attendance</Button>
                    }
                    {log.error ?
                        <Alert style={{ marginTop: "1rem" }} variant="danger">{log.error}</Alert>
                        : log.attendance ?
                            <Alert style={{ marginTop: "1rem" }} variant="success">Attendance Recorded! </Alert>
                            : null}
                </Card.Body>
            </Card>
        </div>
    )
}