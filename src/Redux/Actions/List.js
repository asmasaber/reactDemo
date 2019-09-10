import { createReducer, createActions } from "reduxsauce";
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({});
const SINGLE_STATE = { loading: false, items: [], count: 0, forceRefresh: false, error: null };

export const { Types, Creators } = createActions({
  register: ["storeId"],
  get: ["storeId", "data"],
  getSuccess: ["storeId", "items", "count"],
  getFailure: ["storeId", "error"],
  put: ["storeId", "data"],
  putSuccess: ["storeId"],
  putFailure: ["storeId", "error"],
  delete: ["storeId", "data"],
  deleteSuccess: ["storeId"],
  deleteFailure: ["storeId", "error"]
});

const loadingHandler = (state, action) => {
  let newState = { ...state };
  newState[action.storeId].loading = true;
  newState[action.storeId].forceRefresh = false;
  return newState;
};


const successHandler = (state, action) => {
  let newState = { ...state };
  newState[action.storeId].loading = false;
  newState[action.storeId].forceRefresh = true;
  return newState;
};

const failureHandler = (state, action) => {
  let newState = { ...state };
  newState[action.storeId].loading = false;
  newState[action.storeId].forceRefresh = false;
  newState[action.storeId].error = action.error;
  return newState;
};

const HANDLERS = {
  [Types.REGISTER]: (state, action) => ({
    ...state,
    [action.storeId]: SINGLE_STATE
  }),
  [Types.GET]: loadingHandler,
  [Types.GET_SUCCESS]: (state, action) => {
    let newState = { ...state };
    newState[action.storeId].loading = false;
    newState[action.storeId].forceRefresh = false;
    newState[action.storeId].items = action.items;
    newState[action.storeId].count = action.count;
    return newState;
  },
  [Types.GET_FAILURE]: failureHandler,
  [Types.PUT]: loadingHandler,
  [Types.PUT_SUCCESS]: successHandler,
  [Types.PUT_FAILURE]: failureHandler,
  [Types.DELETE]: loadingHandler,
  [Types.DELETE_SUCCESS]: successHandler,
  [Types.DELETE_FAILURE]: failureHandler
};

export default createReducer(INITIAL_STATE, HANDLERS);