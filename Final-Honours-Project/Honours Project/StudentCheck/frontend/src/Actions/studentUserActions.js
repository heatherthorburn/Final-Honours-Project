/**
 * Contains actions for logged in students.
 * Corresponding reducers can be found in ../Reducers/studentUserReducers.js
 */

import {
  STUDENT_NOTIFICATIONS_FAIL,
  STUDENT_NOTIFICATIONS_REQUEST,
  STUDENT_NOTIFICATIONS_SUCCESS,
  STUDENT_CIRCUMSTANCE_SUBMISSIONS_REQUEST,
  STUDENT_CIRCUMSTANCE_SUBMISSIONS_SUCCESS,
  STUDENT_CIRCUMSTANCE_SUBMISSIONS_FAIL,
  GET_STUDENT_CIRCUMSTANCES_REQUEST,
  GET_STUDENT_CIRCUMSTANCES_SUCCESS,
  GET_STUDENT_CIRCUMSTANCES_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_LOGOUT,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGIN_REQUEST,
  SUBMIT_CIRCUMSTANCE_REQUEST,
  SUBMIT_CIRCUMSTANCE_FAIL,
  SUBMIT_CIRCUMSTANCE_SUCCESS,
} from "../Constants/studentUserConstants";
import axios from "axios";

/**
 * 
 * @param {*} student_id 
 * Fetches all notifications for a given student
 */

export const studentNotifications = (student_id) => async (dispatch) => {
  dispatch({ type: STUDENT_NOTIFICATIONS_REQUEST });
  try {
    const { data } = await axios.get("/gtb17118-nodejs/students/notifications", {
      params: {
        student_id: student_id,
      },
    });
    dispatch({ type: STUDENT_NOTIFICATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: STUDENT_NOTIFICATIONS_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} student_id 
 * @param {*} password 
 * Registers a password for a given student
 */
export const studentRegister = (student_id, password) => async (dispatch) => {
  dispatch({type : STUDENT_REGISTER_REQUEST});
  axios.post("/gtb17118-nodejs/students/register", {
    password : password,
    student_id : student_id
  })
}

/**
 * 
 * @param {*} id 
 * @param {*} password 
 * Handles log in for a given user.
 * Assigns local storage for JSON web token and information about the user
 * for consistent content during session
 */

export const studentLogin = (id, password) => async (dispatch) => {
  dispatch({ type: STUDENT_LOGIN_REQUEST, payload: { id, password } });
  try {
    const { data } = await axios.post("/gtb17118-nodejs/students/signin", {
      id,
      password,
    });
    dispatch({ type: STUDENT_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("studentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STUDENT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * Handles signout and destroys items in local storage
 */
export const studentSignout = () => (dispatch) => {
  localStorage.removeItem("studentInfo");
  dispatch({ type: STUDENT_LOGOUT });
};

/**
 * Gathers all resources for all types of circumstances
 * Used for testing
 */
export const getStudentCircumstancesResources = () => async (dispatch) => {
  dispatch({ type: GET_STUDENT_CIRCUMSTANCES_REQUEST });
  try {
    const data = await axios.get(
      "/gtb17118-nodejs/students/getCircumstanceTypes"
    );
    dispatch({ type: GET_STUDENT_CIRCUMSTANCES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_STUDENT_CIRCUMSTANCES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * 
 * @param {*} type 
 * @param {*} date 
 * @param {*} details 
 * @param {*} student_id 
 * 
 * Handles circumstance submission
 */

export const submitCircumstanceForm = (
  type,
  date,
  details,
  student_id
) => async (dispatch) => {
  dispatch({
    type: SUBMIT_CIRCUMSTANCE_REQUEST,
  });
  try {
    const data = await axios.post(
      "/gtb17118-nodejs/students/submitCircumstance",
      {
        params: {
          student_id: student_id,
          details: details,
          date: date,
          type: type,
        },
      }
    );
    dispatch({ type: SUBMIT_CIRCUMSTANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUBMIT_CIRCUMSTANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * 
 * @param {*} id 
 * Gets all student circumstances submitted for a given student, used for testing
 */

export const getSudentCircumstanceSubmissions = (id) => async (dispatch) => {
  dispatch({
    type: STUDENT_CIRCUMSTANCE_SUBMISSIONS_REQUEST,
  });
  try {
    const data = await axios.get(
      "/gtb17118-nodejs/students/getCircumstanceSubmissions",
      {
        params: {
          student_id: id,
        },
      }
    );
    dispatch({ type: STUDENT_CIRCUMSTANCE_SUBMISSIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_CIRCUMSTANCE_SUBMISSIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
