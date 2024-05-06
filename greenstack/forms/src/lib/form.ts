import {
  ValidatorsSetup,
  ValuesBase,
  FormState,
  ValidationResult,
  FormSubscriber,
  FormSubscription,
  FormSubscriberAction,
} from './defs';
import { max, min } from './validators';

const form = <Values extends ValuesBase>(
  validatorsSetup: ValidatorsSetup<Values> = {}
) => {
  const subscriptions = new Map<string, FormSubscriber<Values>>();

  let state: FormState<Values>;

  const validate = (
    values: Values
  ): Pick<FormState<Values>, 'invalid' | 'valid' | 'result'> => {
    const result = {} as ValidationResult<Values>;
    let invalid = false;

    for (const key in values) {
      const value = values[key];
      const fns = validatorsSetup[key] ?? [];

      for (const fn of fns) {
        const status = fn(value);

        if (typeof status === `string`) {
          result[key] = status;
          invalid = true;
          break;
        }
      }
    }

    return { result, invalid, valid: !invalid };
  };

  const setState = (newState: FormState<Values>): void => {
    state = {
      ...state,
      ...newState,
    };
  };

  const confirm = (
    confirmed: boolean
  ): Pick<FormState<Values>, 'confirmed' | 'unconfirmed'> => {
    return {
      confirmed,
      unconfirmed: !confirmed,
    };
  };

  const touch = (
    touched: boolean
  ): Pick<FormState<Values>, 'touched' | 'untouched'> => {
    return {
      touched,
      untouched: !touched,
    };
  };

  const notify = (action: FormSubscriberAction): void => {
    const keys = subscriptions.keys();

    for (const key of keys) {
      const fn = subscriptions.get(key);
      fn?.(action, state);
    }
  };

  return {
    init: (values: Values): void => {
      setState({
        values,
        ...validate(values),
        ...confirm(false),
        ...touch(false),
      });
      notify(`init`);
    },
    set: (values: Partial<Values>): void => {
      const newValues = {
        ...state.values,
        ...values,
      };

      setState({
        values: newValues,
        ...validate(newValues),
        ...confirm(false),
        ...touch(false),
      });
      notify(`set`);
    },
    subscribe: (subscriber: FormSubscriber<Values>): FormSubscription => {
      const key = new Date().toISOString();
      subscriptions.set(key, subscriber);

      return () => {
        subscriptions.delete(key);
      };
    },
    state: (): FormState<Values> => state,
  };
};

interface RegisterFormData {
  username: string;
  password: string;
}

const registerForm = form<RegisterFormData>({
  username: [],
  password: [min(15), max(20)],
});

registerForm.init({ username: ``, password: `` });
