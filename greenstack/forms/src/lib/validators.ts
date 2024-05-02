import { ValidatorFn } from './defs';

const isString = (): ValidatorFn<string, `isString`> => (value) =>
  typeof value === `string` ? ` ` : `isString`;

export { isString };
