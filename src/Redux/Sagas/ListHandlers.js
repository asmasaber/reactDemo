import { call, put as dispatch } from "redux-saga/effects";
import { Creators } from "Redux/Actions/List";
import { StoreIds } from "Services/Config";
import Api from "Services/Api";

const {
  putSuccess,
  putFailure,
  getSuccess,
  getFailure,
  deleteSuccess,
  deleteFailure
} = Creators;

const blogsStoreId = StoreIds.blogs;

export default {
  get: {
    *[blogsStoreId](data) {
      const response = yield call(Api.blogs.get, data);
      if (response.ok) {
        yield dispatch(getSuccess(blogsStoreId, response.data ));
      } else {
        yield dispatch(getFailure(blogsStoreId, response.originalError.message));
      }
    }
  },
};
