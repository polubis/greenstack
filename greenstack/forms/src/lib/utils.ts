import { ValidatorFnResult } from './defs';

const validate = (valid: boolean, message: string): ValidatorFnResult =>
  valid ? '' : message;

export { validate };
