import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PERSON,
  GET_PERSONS,
  ADD_PERSON,
  UPDATE_PERSON,
  PERSON_ERROR,
  DELETE_PERSON,
  ADD_RESEARCHPOST,
  DELETE_RESEARCHPOST,
  GET_PROPUBDATA
} from './types';

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

    dispatch(setAlert('Person added', 'success'));
  } catch (err) {
    dispatch({
      type: PERSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update person
export const updatePerson = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`/api/persons/${id}`, formData, config);

    dispatch({
      type: UPDATE_PERSON,
      payload: res.data
    });

    dispatch(setAlert('Person updated', 'success'));
  } catch (err) {
    dispatch({
      type: PERSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete person
export const deletePerson = id => async dispatch => {
  try {
    await axios.delete(`/api/persons/${id}`);

    dispatch({
      type: DELETE_PERSON,
      payload: id
    });

    dispatch(setAlert('Person Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PERSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Post research
export const addResearchPost = (personId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/persons/researchpost/${personId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_RESEARCHPOST,
      payload: res.data
    });

    dispatch(setAlert('Research Posted', 'success'));
  } catch (err) {
    dispatch({
      type: PERSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete research
export const deleteResearchPost = (
  personId,
  researchPostId
) => async dispatch => {
  try {
    await axios.delete(
      `/api/persons/researchpost/${personId}/${researchPostId}`
    );

    dispatch({
      type: DELETE_RESEARCHPOST,
      payload: researchPostId
    });

    dispatch(setAlert('Research Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PERSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Pro Publica data
export const getProPubData = memberid => async dispatch => {
  try {
    const res = await axios.get(`/api/persons/propublica/${memberid}`);

    dispatch({
      type: GET_PROPUBDATA,
      payload: res.data.results[0]
    });
  } catch (err) {
    dispatch({
      type: PERSON_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
