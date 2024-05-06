import { expect, it, describe } from 'vitest';

import { ValidatorsSetup, form, max, min } from '..';

describe('Forms management works when', () => {
  interface RegisterFormValues {
    phone: number;
    username: string;
    password: string;
    repeatedPassword: string;
  }

  it('form may be initialized', () => {
    const registerFormValidators: ValidatorsSetup<RegisterFormValues> = {
      username: [min(2), max(10)],
      phone: [],
      repeatedPassword: [],
    };

    const registerForm = form(registerFormValidators);

    expect(registerForm.state()).toBe(undefined);

    registerForm.init({
      phone: 123123123,
      username: `jaro1`,
      password: `jaro1`,
      repeatedPassword: `jaro1`,
    });

    const state1 = registerForm.state();

    expect(state1.confirmed).toBe(false);
    expect(state1.unconfirmed).toBe(true);
    expect(state1.invalid).toBe(false);
    expect(state1.valid).toBe(true);
    expect(state1.touched).toBe(false);
    expect(state1.untouched).toBe(true);
    expect(state1.values).toEqual({
      phone: 123123123,
      username: `jaro1`,
      password: `jaro1`,
      repeatedPassword: `jaro1`,
    });
    expect(state1.result.username).toBe(null);
    expect(state1.result.phone).toBe(null);
    expect(state1.result.password).toBe(null);
    expect(state1.result.repeatedPassword).toBe(null);

    registerForm.init({
      phone: 123123123,
      username: `2`,
      password: `jaro1`,
      repeatedPassword: `jaro1`,
    });

    const state2 = registerForm.state();

    expect(state2.confirmed).toBe(false);
    expect(state2.unconfirmed).toBe(true);
    expect(state2.invalid).toBe(true);
    expect(state2.valid).toBe(false);
    expect(state2.touched).toBe(false);
    expect(state2.untouched).toBe(true);
    expect(state2.values).toEqual({
      phone: 123123123,
      username: `2`,
      password: `jaro1`,
      repeatedPassword: `jaro1`,
    });
    expect(state2.result.username).toBe(`min`);
    expect(state2.result.phone).toBe(null);
    expect(state2.result.password).toBe(null);
    expect(state2.result.repeatedPassword).toBe(null);

    registerForm.init({
      phone: 1,
      username: `2231321313121321321`,
      password: `1`,
      repeatedPassword: `2`,
    });

    const state3 = registerForm.state();

    expect(state3.confirmed).toBe(false);
    expect(state3.unconfirmed).toBe(true);
    expect(state3.invalid).toBe(true);
    expect(state3.valid).toBe(false);
    expect(state3.touched).toBe(false);
    expect(state3.untouched).toBe(true);
    expect(state3.values).toEqual({
      phone: 1,
      username: `2231321313121321321`,
      password: `1`,
      repeatedPassword: `2`,
    });
    expect(state3.result.username).toBe(`max`);
    expect(state3.result.phone).toBe(null);
    expect(state3.result.password).toBe(null);
    expect(state3.result.repeatedPassword).toBe(null);
  });
});
