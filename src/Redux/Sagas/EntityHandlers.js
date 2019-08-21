import { call, put as dispatch } from "redux-saga/effects";
import { Creators } from "Redux/Actions/Entity";
import {StoreIds} from "Services/Config";
import Api from "Services/Api";

const {
  postSuccess,
  postFailure,
  getSuccess,
  getFailure,
  putSuccess,
  putFailure
} = Creators;

const postStoreId = StoreIds.post;
const commentStoreId = StoreIds.comment;

export default {
  get: {
    *[postStoreId](id) {
      const response = yield call(Api.posts.get, id);
      if (response.ok) {
        yield dispatch(getSuccess(postStoreId, response.data));
      } else {
        yield dispatch(
          getFailure(postStoreId, response.originalError.message)
        );
      }
    },
    *[commentStoreId](id) {
      const storeId = commentStoreId;
      const response = yield call(Api.comments.get, id);
      if (response.ok) {
        yield dispatch(getSuccess(storeId, response.data));
      } else {
        yield dispatch(getFailure(storeId, response.originalError.message));
      }
    }
  },
  post: {
    *[postStoreId](item) {
      const response = yield call(Api.posts.create, item);
      if (response.ok) {
        yield dispatch(postSuccess(postStoreId));
      } else {
        yield dispatch(postFailure(postStoreId, response.originalError.message));
      }
    },
    *[commentStoreId](item) {
      const response = yield call(Api.comments.create, item);
      if (response.ok) {
        yield dispatch(postSuccess(commentStoreId));
      } else {
        yield dispatch(postFailure(commentStoreId, response.originalError.message));
      }
    }
  },
  put: {
    *[postStoreId](item) {
      const response = yield call(Api.posts.update, item);
      if (response.ok) {
        yield dispatch(putSuccess(postStoreId));
      } else {
        yield dispatch(putFailure(postStoreId, response.originalError.message));
      }
    },
    *[commentStoreId](item) {
      const response = yield call(Api.comments.update, item);
      if (response.ok) {
        yield dispatch(putSuccess(commentStoreId));
      } else {
        yield dispatch(putFailure(commentStoreId, response.originalError.message));
      }
    }
  }
};
