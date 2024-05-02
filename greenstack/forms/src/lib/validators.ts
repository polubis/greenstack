import { validate } from './utils';

const isString =
  (message = 'Value must be a string') =>
  (value: string) =>
    validate(typeof value === `string`, message);

export { isString };
