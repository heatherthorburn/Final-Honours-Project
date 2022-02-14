/**
 * Creates a private route for Staff.
 * The documentation for React-Router was used to help construct this
 * Documentation here https://reactrouter.com/web/api/Route
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function StudentRoute({ component: Component, ...rest }) {
    const studentSignIn = useSelector((state) => state.studentSignIn)
    const {studentInfo} = studentSignIn

        // redender if student sign in exists, redirect otherwise.
  return (
    <Route
      {...rest}
      render={(props) =>
        studentInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
}