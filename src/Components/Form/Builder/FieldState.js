export default class FieldState {
  constructor(data) {
    return {
      value: "",
      validators: [],
      isValid: true,
      ...data
    };
  }
}