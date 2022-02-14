/**
 * This contains exports for actions to do with getting information about classes, such as 
 * getting the list of students enrolled in a class.
 * The corresponding reducers can be found in ../Reducers/classReducers.js
 */

import {
  STUDENT_CLASS_FAIL,
  STUDENT_CLASS_REQUEST,
  STUDENT_CLASS_SUCCESS,
  SET_CLASS_FAIL,
  SET_CLASS_REQUEST,
  SET_CLASS_SUCCESS,
} from "../Constants/classConstants";
import axios from "axios";

/**
 * 
 * @param {*} class_code
 * Lists students in a given class. Staff token is taken for authentication. 
 */

export const listStudentsInClass = (class_code) => async (dispatch, getState) => {
  dispatch({
    type: STUDENT_CLASS_REQUEST,
  });
  try {
    const studentClassData = await axios.get(
      "/gtb17118-nodejs/enrolment/classRegister",
      {
        params: {
          class_code: class_code,
        },
        headers: {
          Authorization : getState().staffSignIn.staffInfo.token
        }
      }
    );
    dispatch({ type: STUDENT_CLASS_SUCCESS, payload: studentClassData });
  } catch (error) {
    dispatch({
      type: STUDENT_CLASS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * 
 * @param {*} code
 * Sets taught classes in state for a given teacher.
 * This was originally used for navigation. 
 */

export const setClass = (code) => async (dispatch) => {
  dispatch({
    type: SET_CLASS_REQUEST,
  });
  try {
    dispatch({ type: SET_CLASS_SUCCESS, payload: code });
  } catch (error) {
    dispatch({ type: SET_CLASS_FAIL, payload: error.message });
  }
};
