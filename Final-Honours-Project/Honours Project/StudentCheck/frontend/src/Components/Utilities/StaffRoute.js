/**
 * Creates a private route for Staff.
 * The documentation for React-Router was used to help construct this
 * Documentation here https://reactrouter.com/web/api/Route
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function StaffRoute({ component: Component, ...rest }) {
    const staffSignIn = useSelector((state) => state.staffSignIn)
    const {staffInfo} = staffSignIn

    // redender if staff sign in exists, redirect otherwise.
  return (
    <Route
      {...rest}
      render={(props) =>
        staffInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
}