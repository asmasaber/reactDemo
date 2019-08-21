import handlers from "./EntityHandlers";


export function* get({ storeId, id }) {
  yield handlers.get[storeId](id);
  // yield handlers.get["post"](id);
  // yield handlers.get["comment"](id);
}

export function* post({ storeId, item }) {
  yield* handlers.post[storeId](item);
}

export function* put({ storeId, item }) {
  yield* handlers.put[storeId](item);
}

