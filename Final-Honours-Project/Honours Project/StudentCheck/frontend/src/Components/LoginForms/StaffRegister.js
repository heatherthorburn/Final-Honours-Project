/**
 * Handles register passsword for student and staff
 */

import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useDispatch } from 'react-redux'
import { staffRegister } from '../../Actions/staffUserActions'
import { studentRegister } from '../../Actions/studentUserActions'

export default function StaffRegister(props) {

    const dispatch = useDispatch();

    //get type of user that is registering
    const role = props.role;

    const [id, setID] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerify, setPasswordVerify] = useState("")
    const [errorArray, setErrorArray] = useState([])
    const [success, setSuccess] = useState(false)

    /**
     * Verifies user input, no empty fields, password validation
     */
    function verifyInput() {
        var temp = []
        if (id == "" || id == null) {
            temp.push("Please enter your staff ID.")
        }
        if (password != passwordVerify) {
            temp.push("The password fields must match!")
        } else if (password.length < 8) {
            temp.push("Your password must be over 8 characters long.")
        }
        if (temp.length > 0) {
            setErrorArray(temp)
        } else {
            setSuccess(true)
            if (role == "staff") {
                dispatch(staffRegister(id, password))
            }
            else if (role == "student") {
                dispatch(studentRegister(id, password))
            }
        }
    }

    return (
        success ? <Alert variant="success">Thanks! If this {role == "staff" ? <>staff</> : <>student</>} ID exists and isn't already registered, you can now log-in.</Alert> :
            <div>
                {errorArray.length > 0 ?

                    <Alert variant="danger">
                        {errorArray.map((element, index) => <div key={index}>{element} <br /> </div>)}
                    </Alert>
                    : null}
                <Form>
                    <Form.Group>
                        <Form.Label>{role == "staff" ? <>Staff ID</> : <>Student ID</>}</Form.Label>
                        <Form.Control type="text" onChange={(e) => setID(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPasswordVerify(e.target.value)} />
                    </Form.Group>
                </Form>

                <Button style={{ marginTop: "1rem" }} className="button" onClick={() => verifyInput()}>Register</Button>
            </div>
    )
}