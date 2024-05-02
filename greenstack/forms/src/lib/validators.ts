import { ValidatorFn } from './defs';

const isString = (): ValidatorFn<string, `isString`> => (value) =>
  typeof value === `string` ? null : `isString`;

export { isString };
