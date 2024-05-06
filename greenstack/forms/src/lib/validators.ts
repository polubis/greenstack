import { ValidatorResult } from './defs';

export const min =
  (limit: number) =>
  (value: string | unknown[]): ValidatorResult<'min'> =>
    value.length >= limit ? null : `min`;

export const max =
  (limit: number) =>
  (value: string | unknown[]): ValidatorResult<'max'> =>
    value.length <= limit ? null : `max`;
