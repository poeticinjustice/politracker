import axios from 'axios';
import { setAlert } from './alert';

import { GET_PERSON, GET_PERSONS, PERSON_ERROR } from './types';

// Get all persons
export const getPersons = () => async dispatch => {
  try {
    const res = await axios.get('/api/persons');

    dispatch({
      type: GET_PERSONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PERSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get person by ID
export const getPersonById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/persons/${id}`);

    dispatch({
      type: GET_PERSON,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PERSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add or update person
export const addPerson = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/persons', formData, config);

    dispatch({
      type: GET_PERSON,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Person Updated' : 'Person Added', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PERSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
