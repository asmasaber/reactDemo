import FieldState from "./FieldState";

export default class FormState {
  constructor(data) {
    const form = {};
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const field = data[key];
        form[key] = new FieldState(field);
      }
    }
    return form;
  }
}