import {
  GET_PERSONS,
  GET_PERSON,
  ADD_PERSON,
  UPDATE_PERSON,
  DELETE_PERSON,
  PERSON_ERROR,
  ADD_RESEARCHPOST,
  DELETE_RESEARCHPOST,
  GET_PROPUBDATA
} from '../actions/types';

const initialState = {
  person: null,
  persons: [],
  proPubData: {},
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
    case UPDATE_PERSON:
      return {
        ...state,
        persons: [payload, ...state.persons],
        loading: false
      };
    case DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(person => person._id !== payload),
        loading: false
      };
    case PERSON_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        person: null
      };
    case ADD_RESEARCHPOST:
      return {
        ...state,
        person: { ...state.person, researchPost: payload },
        loading: false
      };
    case DELETE_RESEARCHPOST:
      return {
        ...state,
        person: {
          ...state.person,
          researchPosts: state.person.researchPosts.filter(
            researchPost => researchPost._id !== payload
          )
        },
        loading: false
      };
    case GET_PROPUBDATA:
      return {
        ...state,
        proPubData: payload,
        loading: false
      };
    default:
      return state;
  }
}
