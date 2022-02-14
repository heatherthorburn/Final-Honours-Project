const {
  BATCH_UPLOAD_MARKS_FAIL,
  BATCH_UPLOAD_MARKS_SUCCESS,
  BATCH_UPLOAD_MARKS_REQUEST,
  BATCH_UPLOAD_MARKS_CLEANUP,
  UPDATE_COURSEWORK_MARKS_FAIL,
  UPDATE_COURSEWORK_MARKS_SUCCESS,
  UPDATE_COURSEWORK_MARKS_REQUEST,
  UPDATE_COURSEWORK_MARKS_RESET,
  GET_STUDENT_COURSEWORK_FAIL,
  GET_STUDENT_COURSEWORK_RESET,
  GET_STUDENT_COURSEWORK_SUCCESS,
  GET_STUDENT_COURSEWORK_REQUEST,
  GET_COURSEWORK_MARKS_FAIL,
  GET_COURSEWORK_MARKS_REQUEST,
  GET_COURSEWORK_MARKS_SUCCESS,
  GET_COURSEWORK_BY_ID_RESET,
  DELETE_COURSEWORK_FAIL,
  DELETE_COURSEWORK_REQUEST,
  DELETE_COURSEWORK_SUCCESS,
  DELETE_COURSEWORK_RESET,
  UPDATE_COURSEWORK_FAIL,
  UPDATE_COURSEWORK_REQUEST,
  UPDATE_COURSEWORK_SUCCESS,
  UPDATE_COURSEWORK_RESET,
  GET_COURSEWORK_BY_ID_FAIL,
  GET_COURSEWORK_BY_ID_REQUEST,
  GET_COURSEWORK_BY_ID_SUCCESS,
  ADD_COURSEWORK_REQUEST,
  ADD_COURSEWORK_SUCCESS,
  ADD_COURSEWORK_FAIL,
  ADD_COURSEWORK_RESET, 
  GET_CLASS_COURSEWORK_FAIL,
  GET_CLASS_COURSEWORK_SUCCESS,
  GET_CLASS_COURSEWORK_REQUEST,
  GET_CLASS_COURSEWORK_RESET,
  EDIT_CW_RESET
} = require("../Constants/courseworkConstants");

export const batchUploadCourseworkReducer = (
  state = { },
  action
) => {
  switch (action.type) {
    case BATCH_UPLOAD_MARKS_REQUEST:
      return { loading: true };
    case BATCH_UPLOAD_MARKS_SUCCESS:
      return { loading: false, marks: action.payload };
    case BATCH_UPLOAD_MARKS_FAIL:
      return { loading: false, error: action.payload };
    case BATCH_UPLOAD_MARKS_CLEANUP:
      return {}
    default:
      return state;
  }
};

export const getStudentCourseworkReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case GET_STUDENT_COURSEWORK_REQUEST:
      return { loading: true };
    case GET_STUDENT_COURSEWORK_SUCCESS:
      return { loading: false, marks: action.payload };
    case GET_STUDENT_COURSEWORK_FAIL:
      return { loading: false, error: action.payload };
    case GET_STUDENT_COURSEWORK_RESET:
      return {};
    default:
      return state;
  }
};

export const updateCourseworkMarksReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case UPDATE_COURSEWORK_MARKS_REQUEST:
      return { loading: true };
    case UPDATE_COURSEWORK_MARKS_SUCCESS:
      return { loading: false, success: action.payload };
    case UPDATE_COURSEWORK_MARKS_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_COURSEWORK_MARKS_RESET:
      return {};
    default:
      return state;
  }
};

export const getCourseworkMarksReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case GET_COURSEWORK_MARKS_REQUEST:
      return { loading: true };
    case GET_COURSEWORK_MARKS_SUCCESS:
      return { loading: false, marks: action.payload };
    case GET_COURSEWORK_MARKS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addCourseworkReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ADD_COURSEWORK_REQUEST:
      return { loading: true };
    case ADD_COURSEWORK_SUCCESS:
      return { loading: false, session: action.payload };
    case ADD_COURSEWORK_FAIL:
      return { loading: false, error: action.payload };
    case ADD_COURSEWORK_RESET:
      return {}
    default:
      return state;
  }
};

/** this reducer is different, it adds an extra attribute by adding up the weights of the returned
 * results from the getClassCourseworkReducer. Used for editting and adding coursework
 */
export const getClassCourseworkReducer = (
  state = { loading: true, classes: [] },
  action
) => {
  switch (action.type) {
    case GET_CLASS_COURSEWORK_REQUEST:
      return { loading: true };
    case GET_CLASS_COURSEWORK_SUCCESS:
      var weightCount = 0;
      if (action.payload && action.payload.data && action.payload.data.length > 0) {
        for (var i = 0; i < action.payload.data.length; i++ ) {
          weightCount = weightCount + action.payload.data[i].weight;
        }
      }
      return { loading: false, classes: action.payload, totalWeight : weightCount };
    case GET_CLASS_COURSEWORK_FAIL:
      return { loading: false, error: action.payload };
    case GET_CLASS_COURSEWORK_RESET:
      return {};
    default:
      return state;
  }
};

export const getCourseworkByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COURSEWORK_BY_ID_REQUEST:
      return { loading: true };
    case GET_COURSEWORK_BY_ID_SUCCESS:
      return { loading: false, classes: action.payload };
    case GET_COURSEWORK_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case GET_COURSEWORK_BY_ID_RESET:
        return {}
    default:
      return state;
  }
};

export const updateCourseworkReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COURSEWORK_REQUEST:
      return { loading: true };
    case UPDATE_COURSEWORK_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_COURSEWORK_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_COURSEWORK_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteCourseworkReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COURSEWORK_REQUEST:
      return { loading: true };
    case DELETE_COURSEWORK_SUCCESS:
      return { loading: false, success: true };
    case DELETE_COURSEWORK_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_COURSEWORK_RESET:
      return {};
    default:
      return state;
  }
};
