/**
 * This contains all actions for taking attendance at both lectures and subclasses such
 * as tutorials.
 * The corresponding reducers can be found in ../Reducers/lectureReducers.js
 */

import axios from "axios";
import {
  DEFAULT_ATTENDANCE_REQUEST,
  STUDENT_QR_ATTENDANCE_FAIL,
  STUDENT_QR_ATTENDANCE_REQUEST,
  STUDENT_QR_ATTENDANCE_SUCCESS,
  ADD_SUB_FAIL,
  ADD_SUB_REQUEST,
  ADD_SUB_SUCCESS,
  GET_SUB_REGISTER_FAIL,
  GET_SUB_REGISTER_REQUEST,
  GET_SUB_REGISTER_SUCCESS,
  GET_SUB_CLASSES_FAIL,
  GET_SUB_CLASSES_REQUEST,
  GET_SUB_CLASSES_SUCCESS,
  GET_LECTURE_SESSIONS_REQUEST,
  GET_LECTURE_SESSIONS_SUCCESS,
  GET_LECTURE_SESSIONS_FAIL,
  GET_LECTURE_ATTENDANCE_REQUEST,
  GET_LECTURE_ATTENDANCE_SUCCESS,
  GET_LECTURE_ATTENDANCE_FAIL,
  LOG_ATTENDANCE_EMAIL_REQUEST,
  LOG_ATTENDANCE_EMAIL_SUCCESS,
  LOG_ATTENDANCE_EMAIL_FAIL,
  LOG_ATTENDANCE_REQUEST,
  LOG_ATTENDANCE_SUCCESS,
  LOG_ATTENDANCE_FAIL,
  ADD_LECTURE_REQUEST,
  ADD_LECTURE_FAIL,
  ADD_LECTURE_SUCCESS,
} from "../Constants/lectureConstants";

/**
 * 
 * @param {*} students
 * Takes an array of JSON objects indicating all students absent.
 * Dispatches when the QR method of attendance is confirmed 
 */
export const defaultAttendance = (students) => async (dispatch) => {
  dispatch({type : DEFAULT_ATTENDANCE_REQUEST});
  try {
    const data = await axios.post("/gtb17118-nodejs/lectures/addStudentsLecture", {
      students : students,
    })
  } catch (error) {
    console.log(error)
  }

}

/**
 * 
 * @param {*} group_id
 * Fetches a list of students for a given subclass such as tutorials 
 */

export const getSubClassesRegister = (group_id) => async (dispatch) => {
  dispatch({
    type: GET_SUB_REGISTER_REQUEST,
  });
  try {
    const data = await axios.get(
      "/gtb17118-nodejs/lectures/getSubClassesRegister",
      {
        params: {
          group_id: group_id,
        },
      }
    );
    dispatch({ type: GET_SUB_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SUB_REGISTER_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} class_code
 * Fetches list of all subgroups of a given class. 
 */

export const getSubClasses = (class_code) => async (dispatch) => {
  dispatch({
    type: GET_SUB_CLASSES_REQUEST,
  });
  try {
    const data = await axios.get(
      "/gtb17118-nodejs/lectures/getSubClasses",
      {
        params: {
          class_code: class_code,
        },
      }
    );
    dispatch({ type: GET_SUB_CLASSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SUB_CLASSES_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} class_code
 * Fetches all lecture sessions for a given class.
 * Mostly used for testing during implementation. 
 */

export const getLectureSessions = (class_code) => async (dispatch) => {
  dispatch({
    type: GET_LECTURE_SESSIONS_REQUEST,
  });
  try {
    const data = await axios.get(
      "/gtb17118-nodejs/lectures/getLectureSessions",
      {
        params: {
          class_code: class_code,
        },
      }
    );
    dispatch({ type: GET_LECTURE_SESSIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_LECTURE_SESSIONS_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} class_code 
 * @param {*} date 
 * @param {*} time 
 * Adds lecture to database.
 */

export const addLecture = (class_code, date, time) => async (dispatch) => {
  dispatch({
    type: ADD_LECTURE_REQUEST,
  });
  try {
    const data = await axios.post("/gtb17118-nodejs/lectures/addLecture", {
      params: {
        class_code: class_code,
        date: date,
        time: time,
      },
    });
    dispatch({ type: ADD_LECTURE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_LECTURE_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} class_code 
 * @param {*} date 
 * @param {*} time 
 * @param {*} group_id 
 * Adds sub class session to database.
 */

export const addSub = (class_code, date, time, group_id) => async (dispatch) => {
  dispatch({
    type: ADD_SUB_REQUEST,
  });
  try {
    const data = await axios.post("/gtb17118-nodejs/lectures/addSubClass", {
      params: {
        class_code: class_code,
        date: date,
        time: time,
        group_id : group_id
      },
    });
    dispatch({ type: ADD_SUB_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_SUB_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} students 
 * @param {*} class_code 
 * Bulk adds lecture attendance for a given lecture
 */

export const logLectureAttendance = (students, class_code) => async (dispatch) => {
  dispatch({
    type: LOG_ATTENDANCE_REQUEST,
  });
  try {
    const data = await axios.post(
      "/gtb17118-nodejs/lectures/logAttendance",
      {
        params: {
          students: students,
          class_code: class_code
        },
      }
    );
    dispatch({ type: LOG_ATTENDANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOG_ATTENDANCE_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} attended 
 * @param {*} notAttended 
 * @param {*} session_id 
 * This was used before the conversion from email to matriculation for uploading attendance via CSV.
 * Email is used to uniquely identify students in a table to log attendance.
 * Not used in application but could be useful for further developments.
 */

export const logLectureAttendanceEmail = (
  attended,
  notAttended,
  session_id
) => async (dispatch) => {
  dispatch({
    type: LOG_ATTENDANCE_EMAIL_REQUEST,
  });
  try {
    const data = await axios.post(
      "/gtb17118-nodejs/lectures/logAttendanceEmail",
      {
        params: {
          attended: attended,
          notAttended: notAttended,
          session_id: session_id,
        },
      }
    );
    dispatch({ type: LOG_ATTENDANCE_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOG_ATTENDANCE_EMAIL_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} session_id 
 * @param {*} matric 
 * Dispatches event to log attendance for an individual student, used for when
 * student scans QR code to log attendance.
 */

export const studentQRAttendance = (session_id, matric) => async (dispatch) => {
  dispatch({
    type: STUDENT_QR_ATTENDANCE_REQUEST,
  });
  try {
    const data = await axios.post(
      "/gtb17118-nodejs/lectures/studentQRAttendance",
      {
        params: {
          session_id: session_id,
          matric: matric
        },
      }
    );
    dispatch({ type: STUDENT_QR_ATTENDANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_QR_ATTENDANCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * 
 * @param {*} session_id 
 * Used to display successful attendance submission.
 * Due to the nature of the bulk create, it would not return the bulk create as 
 * an object, so the attendance has to be queried after submission.
 */

export const getLectureAttendance = (session_id) => async (dispatch) => {
  dispatch({
    type: GET_LECTURE_ATTENDANCE_REQUEST,
  });
  try {
    const data = await axios.post(
      "/gtb17118-nodejs/lectures/getLectureAttendance",
      {
        params: {
          session_id: session_id,
        },
      }
    );
    dispatch({ type: GET_LECTURE_ATTENDANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_LECTURE_ATTENDANCE_FAIL, payload: error.message });
  }
};
