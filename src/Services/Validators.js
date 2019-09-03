export const  isRequied = value => Array.isArray(value)? value.length === 0 && "This field is required." : !value.trim() && "This field is required.";

export const  minLength = length => value => Array.isArray(value)? (value.length < length && `Min. Length should be ${length}`) :(value && length && value.length <= length-1 && `Min. Length should be ${length}`);

export const  maxLength = length => value => Array.isArray(value)? (value.length > length && `Max. Length should be ${length}`) :(value && length && value.length >= length-1 && `Max. Length should be ${length}`);

export const isText = value => value && !/^([^0-9]*)$/.test(value) && "value should not contain numbers";

export const isPhone = value => value && !/^(01)[0-9]{9}$/.test(value) && "not Valid Phone";

export const checkPassword = value => value && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  .test(value) && "password should contain at least one (1) character from three (3) of the following categories: Uppercase letter (A-Z) Lowercase letter (a-z) Digit (0-9) Special character (~`!@#$%^&*()+=_-{}[] | ...]";

export const matches = (value, compareTo) => value && compareTo && value !== compareTo && "fields not matched";