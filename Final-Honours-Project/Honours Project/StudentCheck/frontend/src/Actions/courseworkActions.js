/**
 * This contains all actions to do with managing coursework.
 * The corresponding reducers can be found in ../Reducers/courseworkReducers.js
 */

import {
  BATCH_UPLOAD_MARKS_REQUEST,
  BATCH_UPLOAD_MARKS_SUCCESS,
  BATCH_UPLOAD_MARKS_FAIL,
  UPDATE_COURSEWORK_MARKS_FAIL,
  UPDATE_COURSEWORK_MARKS_REQUEST,
  UPDATE_COURSEWORK_MARKS_SUCCESS,
  GET_STUDENT_COURSEWORK_FAIL,
  GET_STUDENT_COURSEWORK_REQUEST,
  GET_STUDENT_COURSEWORK_SUCCESS,
  GET_COURSEWORK_MARKS_FAIL,
  GET_COURSEWORK_MARKS_REQUEST,
  GET_COURSEWORK_MARKS_SUCCESS,
  DELETE_COURSEWORK_FAIL,
  DELETE_COURSEWORK_REQUEST,
  DELETE_COURSEWORK_SUCCESS,
  UPDATE_COURSEWORK_REQUEST,
  UPDATE_COURSEWORK_SUCCESS,
  UPDATE_COURSEWORK_FAIL,
  GET_COURSEWORK_BY_ID_REQUEST,
  GET_COURSEWORK_BY_ID_SUCCESS,
  GET_COURSEWORK_BY_ID_FAIL,
  GET_CLASS_COURSEWORK_REQUEST,
  GET_CLASS_COURSEWORK_SUCCESS,
  GET_CLASS_COURSEWORK_FAIL,
  ADD_COURSEWORK_REQUEST,
  ADD_COURSEWORK_SUCCESS,
  ADD_COURSEWORK_FAIL,
} from "../Constants/courseworkConstants";
import axios from "axios";

/**
 * 
 * @param {*} students
 * Dispatches action for uploading coursework marks via .csv. Takes an array of JSON objects that can 
 * be bulk added to the database. 
 */

export const batchUploadCoursework = (students) => async (dispatch) => {
  dispatch({
    type: BATCH_UPLOAD_MARKS_REQUEST,
  });
  try {
    const data = await axios.put(
      "/gtb17118-nodejs/coursework/batchUploadCoursework",
      {
        params: {
          students: students,
        },
      }
    );
    dispatch({ type: BATCH_UPLOAD_MARKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BATCH_UPLOAD_MARKS_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} class_code 
 * Gets list of courseworks for a given class.
 * Gets staff info from state to authenticate they are a teacher for the class.
 */

export const getClassCoursework = (class_code) => async (dispatch, getState) => {
  dispatch({
    type: GET_CLASS_COURSEWORK_REQUEST,
  });
  try {
    const data = await axios.get(
      "/gtb17118-nodejs/coursework/getClassCoursework",
      {
        params: {
          class_code: class_code,
        },
        headers: {
          Authorization : getState().staffSignIn.staffInfo.token
        }
      },
    );
    dispatch({ type: GET_CLASS_COURSEWORK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CLASS_COURSEWORK_FAIL, payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
   });
  }
};

/**
 * 
 * @param {*} id 
 * @param {*} title 
 * @param {*} description 
 * @param {*} weight 
 * Action for changing information for a given coursework.
 */
export const updateCoursework = (id, title, description, weight) => async (
  dispatch
) => {
  dispatch({
    type: UPDATE_COURSEWORK_REQUEST,
  });
  try {
    const data = await axios.put(
      "/gtb17118-nodejs/coursework/updateCoursework",
      {
        params: {
          id: id,
          title: title,
          description: description,
          weight: weight,
        },
      }
    );
    dispatch({ type: UPDATE_COURSEWORK_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_COURSEWORK_FAIL, error: message });
  }
};

/**
 * 
 * @param {*} title 
 * @param {*} description 
 * @param {*} class_code 
 * @param {*} weight
 * Action for dispatching addition of coursework to the database for a given
 * class. 
 * Staff information is taken from state to authenticae they are a teacher for 
 * the given class. 
 */

export const addCoursework = (title, description, class_code, weight) => async (
  dispatch, getState
) => {
  dispatch({
    type: ADD_COURSEWORK_REQUEST,
  });
  try {
    const data = await axios.post(
      "/gtb17118-nodejs/coursework/addCoursework",
      {
        params: {
          class_code: class_code,
          title: title,
          description: description,
          weight: weight,
        },
        headers: {
          Authorization : getState().staffSignIn.staffInfo.token
        }
      }
    );
    dispatch({ type: ADD_COURSEWORK_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADD_COURSEWORK_FAIL, payload: message });
  }
};

/**
 * 
 * @param {*} id 
 * @param {*} class_code
 * Dispatched action to fetch information about a specific coursework
 * Class code and staff information is taken for teacher authentication 
 */

export const getCourseworkByID = (id, class_code) => async (dispatch, getState) => {
  dispatch({
    type: GET_COURSEWORK_BY_ID_REQUEST,
  });
  try {
    const data = await axios.get(
      "/gtb17118-nodejs/coursework/getCourseworkByID",
      {
        params: {
          id: id,
          class_code : class_code
        },
        headers: {
          Authorization : getState().staffSignIn.staffInfo.token
        }
      }
    );
    dispatch({ type: GET_COURSEWORK_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COURSEWORK_BY_ID_FAIL, payload: error.response });
  }
};

/**
 * 
 * @param {*} id
 * Dispatches action to delete a specific coursework 
 */

export const deleteCoursework = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_COURSEWORK_REQUEST,
  });
  try {
    const data = await axios.delete(
      "/gtb17118-nodejs/coursework/deleteCoursework",
      {
        params: {
          id: id,
        },
      }
    );
    dispatch({ type: DELETE_COURSEWORK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_COURSEWORK_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} id 
 * @param {*} class_code
 * Dispatches action to retrieve all student coursework marks for a specific coursework
 * Class code and staff information are taken from state for teacher authentication 
 */

export const getCourseworkMarks = (id, class_code) => async (dispatch, getState) => {
  dispatch({
    type: GET_COURSEWORK_MARKS_REQUEST,
  });
  try {
    const data = await axios.get(
      "/gtb17118-nodejs/coursework/getCourseworkMarks",
      {
        params: {
          id: id,
          class_code: class_code,
        },
        headers: {
          Authorization : getState().staffSignIn.staffInfo.token
        }
      }
    );
    dispatch({ type: GET_COURSEWORK_MARKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COURSEWORK_MARKS_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} cw_id 
 * @param {*} student_id 
 * @param {*} class_code
 * Fetches all information about a students coursework grades for a specific coursework
 * Class code and staff information are taken for teacher authentication 
 */

export const getStudentCoursework = (cw_id, student_id, class_code) => async (dispatch, getState) => {

  dispatch({
    type: GET_STUDENT_COURSEWORK_REQUEST,
  });
  try {
    const data = await axios.get(
      "/gtb17118-nodejs/coursework/getStudentCourseworkMarks",
      {
        params: {
          student_id: student_id,
          cw_id: cw_id,
          class_code : class_code
        },
        headers: {
          Authorization : getState().staffSignIn.staffInfo.token
        }
      }
    );
    dispatch({ type: GET_STUDENT_COURSEWORK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_STUDENT_COURSEWORK_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} coursework_id 
 * @param {*} student_id 
 * @param {*} grade 
 * @param {*} feedback
 * Dispatches action to update a specific coursework grade for a specific student 
 */

export const updateCourseworkMarks = (
  coursework_id,
  student_id,
  grade,
  feedback
) => async (dispatch) => {
  dispatch({
    type: UPDATE_COURSEWORK_MARKS_REQUEST,
  });
  try {
     await axios.put(
      "/gtb17118-nodejs/coursework/updateStudentCourseworkMarks",
      {
        params: {
          coursework_id: coursework_id,
          student_id: student_id,
          grade: grade,
          feedback: feedback,
        },
      }
    );
    dispatch({ type: UPDATE_COURSEWORK_MARKS_SUCCESS, payload: "success" });
  } catch (error) {
    dispatch({ type: UPDATE_COURSEWORK_MARKS_FAIL, payload: error.message });
  }
};
