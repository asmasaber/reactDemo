import { call, put as dispatch } from "redux-saga/effects";
import Api from "Services/Api";
import { Creators } from "Redux/Actions/Entity";

const { postSuccess, postFailure, getSuccess, getFailure, putSuccess, putFailure } = Creators;

export default {
  get: {
    *post(id) {
      const response = yield call(Api.posts.get, id);
      if (response.ok) {
        yield dispatch(getSuccess("post", response.data));
      } else {
        yield dispatch(getFailure("post", response.originalError.message));
      }
    },
    *comment(id) {
      const response = yield call(Api.comments.get, id);
      if (response.ok) {
        yield dispatch(getSuccess("comment", response.data));
      } else {
        yield dispatch(getFailure("comment", response.originalError.message));
      }
    },
  },
  post: {
    *post(item) {
      const response = yield call(Api.posts.create, item);
      if (response.ok) {
        yield dispatch(postSuccess("post"));
      } else {
        yield dispatch(postFailure("post", response.originalError.message));
      }
    },
    *comment(item) {
      const response = yield call(Api.comments.create, item);
      if (response.ok) {
        yield dispatch(postSuccess("comment"));
      } else {
        yield dispatch(postFailure("comment", response.originalError.message));
      }
    }
  },
  put: {
    *post(item) {
      const response = yield call(Api.posts.update, item);
      if (response.ok) {
        yield dispatch(putSuccess("post"));
      } else {
        yield dispatch(putFailure("post", response.originalError.message));
      }
    },
    *comment(item) {
      const response = yield call(Api.comments.update, item);
      if (response.ok) {
        yield dispatch(putSuccess("comment"));
      } else {
        yield dispatch(putFailure("comment", response.originalError.message));
      }
    }
  }
};