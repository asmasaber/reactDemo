import { all, takeLatest } from "redux-saga/effects";
import { Types } from "Redux/Actions/Entity";
import { get, post, put } from "./Entity";

export default function* rootSaga() {
  yield all([takeLatest(Types.GET, get)]);
  yield all([takeLatest(Types.POST, post)]);
  yield all([takeLatest(Types.PUT, put)]);
}