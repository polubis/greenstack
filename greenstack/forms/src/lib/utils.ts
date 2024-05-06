import { ValidatorResult } from './defs';

const validate = (valid: boolean, message: string): ValidatorResult =>
  valid ? '' : message;

export { validate };
