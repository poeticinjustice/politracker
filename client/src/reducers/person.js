import {
  GET_PERSON,
  PERSON_ERROR,
  ADD_PERSON,
  GET_PERSONS
} from '../actions/types';

const initialState = {
  person: null,
  persons: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PERSON:
      return {
        ...state,
        person: payload,
        loading: false
      };
    case GET_PERSONS:
      return {
        ...state,
        persons: payload,
        loading: false
      };
    case ADD_PERSON:
      return {
        ...state,
        persons: [payload, ...state.persons],
        loading: false
      };
    case PERSON_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        person: null
      };
    default:
      return state;
  }
}
