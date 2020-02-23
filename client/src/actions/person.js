import axios from 'axios';
import { setAlert } from './alert';

import { GET_PERSON, GET_PERSONS, ADD_PERSON, PERSON_ERROR } from './types';

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

// Add person
export const addPerson = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/persons', formData, config);

    dispatch({
      type: ADD_PERSON,
      payload: res.data
    });

    dispatch(setAlert('Person Added', 'success'));
  } catch (err) {
    dispatch({
      type: PERSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
