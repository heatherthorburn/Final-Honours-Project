/**
 * This contains all actions to do with staff user interactions
 * The corresponding reducers can be found in ../Reducers/StaffUserReducers.js
 */

import {
  STAFF_REGISTER_REQUEST,
  STAFF_NOTIFICATIONS_REQUEST,
  STAFF_NOTIFICATIONS_SUCCESS,
  STAFF_NOTIFICATIONS_FAIL,
  STAFF_ADVISEES_REQUEST,
  STAFF_ADVISEES_SUCCESS,
  STAFF_ADVISEES_FAIL,
  STAFF_CLASSES_REQUEST,
  STAFF_CLASSES_SUCCESS,
  STAFF_CLASSES_FAIL,
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_FAIL,
  STAFF_LOGOUT,
} from "../Constants/staffUserConstants";
import axios from "axios";

/**
 * 
 * @param {*} staff_id 
 * @param {*} password
 * Registers password to a given user 
 */
export const staffRegister = (staff_id, password) => async (dispatch) => {
  dispatch({type : STAFF_REGISTER_REQUEST});
  axios.post("/gtb17118-nodejs/staff/register", {
    password : password,
    staff_id : staff_id
  })
}

/**
 * 
 * @param {*} staff_id 
 * Dispatches request to get all staff notifications
 */

export const staffNotifications = (staff_id) => async (dispatch) => {
  dispatch({ type: STAFF_NOTIFICATIONS_REQUEST });
  try {
    const { data } = await axios.get("/gtb17118-nodejs/staff/notifications", {
      params: {
        staff_id: staff_id,
      },
    });
    dispatch({ type: STAFF_NOTIFICATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: STAFF_NOTIFICATIONS_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} staff_id 
 * Gets all students a staff member advises
 */

export const staffAdvisees = (staff_id) => async (dispatch) => {
  dispatch({ type: STAFF_ADVISEES_REQUEST, payload: { staff_id } });
  try {
    const { data } = await axios.get("/gtb17118-nodejs/staff/advisees", {
      params: {
        staff_id: staff_id,
      },
    });
    dispatch({ type: STAFF_ADVISEES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: STAFF_ADVISEES_FAIL, payload: error.message });
  }
};

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * Logs in staff member. Allocates JSON webtoken to local storage along with user data for
 * consistent relevant content across pages.
 */
export const staffLogin = (email, password) => async (dispatch) => {
  dispatch({ type: STAFF_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/gtb17118-nodejs/staff/signin", {
      email,
      password,
    });
    dispatch({ type: STAFF_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("staffInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STAFF_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/**
 * Destroys items in local storage and logs out staff member
 */
export const staffSignout = () => (dispatch) => {
  localStorage.removeItem("staffInfo");
  dispatch({ type: STAFF_LOGOUT });
};

/**
 * 
 * @param {*} staff_id 
 * Gets a list of classes a staff member teaches.
 * Originally used for navigation but this function is no longer used.
 */
export const getStaffClasses = (staff_id) => async (dispatch) => {
  dispatch({ type: STAFF_CLASSES_REQUEST, payload: { staff_id } });
  try {
    const { data } = await axios.get(
      "/gtb17118-nodejs/staff/taughtClasses",
      {
        params: {
          staff_id: staff_id,
        },
      }
    );
    dispatch({ type: STAFF_CLASSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: STAFF_CLASSES_FAIL, payload: error.message });
  }
};
