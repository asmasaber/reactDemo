export const  isRequied = value => !value.trim() && "This field is required." ;

export const  minLength = length => value => value && length && value.length <= length-1 && `Min. Length should be ${length}`;

export const  maxLength = length => value =>  value && length && value.length >= length-1 && `Max. Length should be ${length}`;

export const isText = value => value && !/^([^0-9]*)$/.test(value) && "value should not contain numbers";

export const isPhone = value => value && !/^(01)[0-9]{9}$/.test(value) && "not Valid Phone";

export const checkPassword = value => value && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  .test(value) && "password should contain at least one (1) character from three (3) of the following categories: Uppercase letter (A-Z) Lowercase letter (a-z) Digit (0-9) Special character (~`!@#$%^&*()+=_-{}[] | ...]";

export const compare = (value, compareTo) => value && compareTo && value !== compareTo && "repeat password not matched";