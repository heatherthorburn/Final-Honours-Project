const {
  CLASS_PDF_REQUEST,
  CLASS_PDF_SUCCESS,
  CLASS_PDF_FAIL,
  DEPARTMENT_STUDENTS_FAIL,
  DEPARTMENT_STUDENTS_SUCCESS,
  DEPARTMENT_STUDENTS_REQUEST,
  STUDENT_DETAILED_PROFILE_FAIL,
  STUDENT_DETAILED_PROFILE_SUCCESS,
  STUDENT_DETAILED_PROFILE_REQUEST,
  ADVISEE_LIST_FAIL,
  ADVISEE_LIST_SUCCESS,
  ADVISEE_LIST_REQUEST,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL,
  STUDENT_DETAILS_CLEANUP,
  STUDENT_LIST_FAIL,
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
} = require("../Constants/studentConstants");

export const classPDFReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CLASS_PDF_REQUEST:
      return { loading: true };
    case CLASS_PDF_SUCCESS:
      return { loading: false, details: action.payload };
    case CLASS_PDF_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const studentDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { loading: true };
    case STUDENT_DETAILS_SUCCESS:
      return { loading: false, details: action.payload };
    case STUDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_DETAILS_CLEANUP:
      return {}
    default:
      return state;
  }
};

export const studentListReducer = (
  state = { loading: true, studentList: [] },
  action
) => {
  switch (action.type) {
    case STUDENT_LIST_REQUEST:
      return { loading: true };
    case STUDENT_LIST_SUCCESS:
      return { loading: false, details: action.payload };
    case STUDENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const detailedProfileReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case STUDENT_DETAILED_PROFILE_REQUEST:
      return { loading: true };
    case STUDENT_DETAILED_PROFILE_SUCCESS:
      return { loading: false, details: action.payload };
    case STUDENT_DETAILED_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const departmentStudentReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case DEPARTMENT_STUDENTS_REQUEST:
      return { loading: true };
    case DEPARTMENT_STUDENTS_SUCCESS:
      return { loading: false, details: action.payload };
    case DEPARTMENT_STUDENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adviseeListReducer = (
  state = { loading: true, studentList: [] },
  action
) => {
  switch (action.type) {
    case ADVISEE_LIST_REQUEST:
      return { loading: true };
    case ADVISEE_LIST_SUCCESS:
      return { loading: false, details: action.payload };
    case ADVISEE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

