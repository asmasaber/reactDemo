/* eslint-disable */
import { createReducer, createActions } from "reduxsauce";
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({});
const SINGLE_STATE = { loading: false, id:null, item: {}, error: null };

export const { Types, Creators } = createActions({
  register: ["storeId"],
  get: ["storeId", "id"],
  getSuccess: ["storeId", "item"],
  getFailure: ["storeId", "error"],
  post: ["storeId", "item"],
  postSuccess: ["storeId"],
  postFailure: ["storeId", "error"],
  put: ["storeId", "item"],
  putSuccess: ["storeId", "item"],
  putFailure: ["storeId", "error"],
});

const loadingHandler = (state, action) => {
  let newState = { ...state };
  newState[action.storeId].loading = true;
  return newState;
};

const successHandler = (state, action) => {
  let newState = { ...state };
  newState[action.storeId].loading = false;
  newState[action.storeId].item = action.item;
  return newState;
};

const failureHandler = (state, action) => {
  let newState = { ...state };
  newState[action.storeId].loading = false;
  newState[action.storeId].error = action.error;
  return newState;
};

const HANDLERS = {
  [Types.REGISTER]: (state, action) => ({
    ...state,
    [action.storeId]: SINGLE_STATE
  }),
  [Types.GET]: loadingHandler,
  [Types.GET_SUCCESS]: successHandler,
  [Types.GET_FAILURE]: failureHandler,
  [Types.POST]: loadingHandler,
  [Types.POST_SUCCESS]: successHandler,
  [Types.POST_FAILURE]: failureHandler,
  [Types.PUT]: loadingHandler,
  [Types.PUT_SUCCESS]: successHandler,
  [Types.PUT_FAILURE]: failureHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
