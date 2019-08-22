import { all, takeEvery } from "redux-saga/effects";
import { Types } from "Redux/Actions/Entity";
import { get, post, put } from "./Entity";

export default function* rootSaga() {
  yield all([takeEvery(Types.GET, get)]);
  yield all([takeEvery(Types.POST, post)]);
  yield all([takeEvery(Types.PUT, put)]);
}