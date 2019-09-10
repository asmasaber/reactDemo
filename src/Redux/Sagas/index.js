import { all, takeEvery } from "redux-saga/effects";
import { Types as EntityTypes } from "Redux/Actions/Entity";
import { Types as ListTypes } from "Redux/Actions/List";
import  * as entity  from "./Entity";
import  * as entity  from "./List";

export default function* rootSaga() {
  yield all([takeEvery(EntityTypes.GET, entity.get)]);
  yield all([takeEvery(EntityTypes.POST, entity.post)]);
  yield all([takeEvery(EntityTypes.PUT, entity.put)]);

  yield all([takeEvery(ListTypes.GET, list.get)]);
  yield all([takeEvery(ListTypes.PUT, list.put)]);
  yield all([takeEvery(ListTypes.DELETE, list.delete)]);
}
