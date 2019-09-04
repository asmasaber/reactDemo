export const  isRequied = (message= "This field is required.") => ({
  validate: (value) => value.trim().length > 0,
  message
});

export const  minLength = (length, message = `Min. Length should be ${length}` ) => ({
  validate: value => value.length >= length,
  message
});

export const  maxLength = (length, message = `Max. Length should be ${length}` ) => ({
  validate: value => value.length <= length,
  message
});

export const checkPassword = (message = "password should contain at least one (1) character from three (3) of the following categories: Uppercase letter (A-Z) Lowercase letter (a-z) Digit (0-9) Special character (~`!@#$%^&*()+=_-{}[] | ...]") => ({
  validate: value => value && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value),
  message
});

export const matches = (xValue, message= "Not Matched") =>  ({
  validate: (value) => xValue() === value,
  message
});


