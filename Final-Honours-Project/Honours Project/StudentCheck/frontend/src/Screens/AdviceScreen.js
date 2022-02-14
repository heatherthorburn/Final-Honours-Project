/**
 * Dispatches action to get all circumstances logged by a student
 * Displays any corresponding services available to the student
 * If no services are available, a default message is displayed
 * referring the student to their advisor.
 */

import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSudentCircumstanceSubmissions } from "../Actions/studentUserActions";
import AdviceBox from "../Components/Utilities/AdviceBox";

export default function AdviceScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const submissions = useSelector((state) => state.circumstanceSubmissions);
  const { resources } = submissions;
  const [circumstances, setCircumstances] = useState();

  useEffect(() => {
    if (!resources) {
      dispatch(getSudentCircumstanceSubmissions(id));
    } else {
      var temp = [];
      resources.data.forEach((element) => {
        if (element.circumstances_type !== null) {
          var i = temp.findIndex((x) => x.id === element.circumstances_type.id);
          if (i <= -1) {
            temp.push(element.circumstances_type);
          }
        }
      });
      setCircumstances(temp);
    }
  }, [dispatch, resources, id]);

  return (
    <div style={{ padding: "1rem" }}>
      <Card>
        <Card.Header>
          Your Advice
            </Card.Header>
        <Card.Body style={{ padding: "1rem" }}>
          <p>If you are experiencing any difficulties, you can submit an extenuating circumstances form.</p>
          <p>You can also contact your advisor <span style={{ fontWeight: "700" }}>{studentSignIn.studentInfo.data.advisor}</span> at <span style={{ fontWeight: "700" }}>{studentSignIn.studentInfo.data.advisor_email}</span></p>
        </Card.Body>
      </Card>
      {circumstances
        ? circumstances.map((element) => (
          <Card>
            <Card.Header>{element.name}</Card.Header>
            <AdviceBox circumstance={element} />
          </Card>
        ))
        : null}
    </div>
  );
}
