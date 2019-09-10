import handlers from "./ListHandlers";

export function* get({ storeId, data }) {
  yield handlers.get[storeId](data);
}

export function* put({ storeId, data }) {
//   yield handlers.put[storeId](data);
}

export function* remove({ storeId, data }) {
//   yield handlers.delete[storeId](data);
}
