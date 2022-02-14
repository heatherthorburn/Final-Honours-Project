/**
 * This contains all actions related to fetching student data.
 * It does not handle student user actions such as logging in and out.
 * The corresponsing reducers can be found in "../Reducers/studentReducers.js"
 */

import {
  CLASS_PDF_REQUEST,
  CLASS_PDF_SUCCESS,
  CLASS_PDF_FAIL,
  DEPARTMENT_STUDENTS_REQUEST,
  DEPARTMENT_STUDENTS_SUCCESS,
  DEPARTMENT_STUDENTS_FAIL,
  STUDENT_DETAILED_PROFILE_REQUEST,
  STUDENT_DETAILED_PROFILE_SUCCESS,
  STUDENT_DETAILED_PROFILE_FAIL,
  ADVISEE_LIST_REQUEST,
  ADVISEE_LIST_SUCCESS,
  ADVISEE_LIST_FAIL,
  STUDENT_LIST_FAIL,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_REQUEST,
  STUDENT_DETAILS_FAIL,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
} from "../Constants/studentConstants";
import axios from "axios";

/**
 * 
 * @param {*} matric
 * Fetches cross module data for a given student
 * State of logged in user is taken for authorisation.
 * Accepts the student, department head, or the student's advisor, otherwise throws error 
 */

export const getStudentDetailedProfile = (matric) => async (dispatch, getState) => {
  dispatch({
    type: STUDENT_DETAILED_PROFILE_REQUEST,
  });
  try {
    const data = await axios.get(
      "/gtb17118-nodejs/students/detailedProfile",
      {
        params: {
          matric: matric,
        },
        headers: {
          Authorization : getState().staffSignIn.staffInfo ? getState().staffSignIn.staffInfo.token : getState().studentSignIn.studentInfo ? getState().studentSignIn.studentInfo.token : null
        }
      }
    );
    dispatch({ type: STUDENT_DETAILED_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILED_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * 
 * @param {*} profile 
 * This function was used originally when Puppeteer was being used to generate PDFs
 * Now PDFs are generated on the client side so this action is no longer used.
 */

export const generateClassPDF = (profile) => async (dispatch) => {
  dispatch({
    type: CLASS_PDF_REQUEST,
  });
  try {
    const data = await axios.post("/gtb17118-nodejs/students/classPDF", {
      params: {
        profile: profile,
      },
    });
    dispatch({ type: CLASS_PDF_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CLASS_PDF_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} staff_id
 * Gets list of advisees for a given staff member 
 */

export const getAdvisees = (staff_id) => async (dispatch) => {
  dispatch({
    type: ADVISEE_LIST_REQUEST,
  });
  try {
    const data = await axios.get("/gtb17118-nodejs/students/advisees", {
      params: {
        staff_id: staff_id,
      },
    });
    dispatch({ type: ADVISEE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADVISEE_LIST_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} dept_id
 * Fetches list of students in a given department.
 * Uses staff member state ID for authorisation
 */

export const getDepartmentStudents = (dept_id) => async (dispatch, getState) => {
  dispatch({
    type: DEPARTMENT_STUDENTS_REQUEST,
  });
  try {
    const data = await axios.get(
      "/gtb17118-nodejs/students/getDepartmentStudents",
      {
        params: {
          dept_id: dept_id,
        },
        headers: {
          Authorization : getState().staffSignIn.staffInfo.token
        }
      }
    );
    dispatch({ type: DEPARTMENT_STUDENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DEPARTMENT_STUDENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * 
 * @param {*} class_code 
 * @param {*} matric
 * Gets student class details.
 * Takes state for authorisation. Accepts teachers for the given class or throws error 
 */

export const getStudentDetails = (class_code, matric) => async (dispatch, getState) => {
  dispatch({
    type: STUDENT_DETAILS_REQUEST,
  });
  try {
    const studentData = await axios.get(
      "/gtb17118-nodejs/students/getStudentGeneralInfo",
      {
        params: {
          class_code: class_code,
          matric: matric,
        },
        headers: {
          Authorization : getState().staffSignIn.staffInfo.token
        }
      }
    );
    dispatch({ type: STUDENT_DETAILS_SUCCESS, payload: studentData });
  } catch (error) {
    dispatch({ type: STUDENT_DETAILS_FAIL, payload: error.message });
  }
};

/**
 * Gets list of all students, used for testing.
 */

export const getStudentList = () => async (dispatch) => {
  dispatch({
    type: STUDENT_LIST_REQUEST,
  });
  try {
    const studentsList = await axios.get("/gtb17118-nodejs/students");
    dispatch({ type: STUDENT_LIST_SUCCESS, payload: studentsList });
  } catch (error) {
    dispatch({ type: STUDENT_LIST_FAIL, payload: error.message });
  }
};
