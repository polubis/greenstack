import type {
  ValidatorsRegistryBase,
  ValidatorsConfig,
  ValuesBase,
  ValidationResult,
  FormMiddleware,
  Formable,
  FormState,
} from './defs';
import { isString } from './validators';

const form =
  <ValidatorsRegistry extends ValidatorsRegistryBase>(
    validatorsRegistry: ValidatorsRegistry
  ) =>
  <Values extends ValuesBase>(
    values: Values,
    validators: (
      validatorsRegistry: ValidatorsRegistry
    ) => ValidatorsConfig<Values> = () => ({}),
    middleware: FormMiddleware<Values, ValidatorsRegistry> = []
  ) => {
    return {} as {
      result: ValidationResult<Values, ValidatorsRegistry>;
    };

    // const set: Formable<Values, ValidatorsRegistry>['set'] = (key, value) => {
    //   values = {
    //     ...values,
    //     [key]: value,
    //   };

    //   const state: FormState<Values, ValidatorsRegistry> = {
    //     values,
    //   };

    //   middleware.forEach((fn) => fn(state));

    //   return {
    //     values,
    //   };
    // };

    // return { set };
  };

interface BaseData {
  firstName: string;
}

const req = () => (value: string) => '';
const min = (limit: number) => (value: string) => '';

const validatorsRegistryBase = {
  req,
  min,
  isString,
};

const r = form(validatorsRegistryBase)<BaseData>({ firstName: '' }, (v) => ({
  firstName: [v.req(), v.min(2), v.isString()],
}));

const translations = {
  '': 'All is fine',
  isString: `The field must be a string`,
};

r.result.firstName.isString && translations[r.result.firstName.isString];
translations[r.result.firstName.isString];
const rs = r.result.firstName.isString;
r.result.firstName.min === 'min';
r.result.firstName.isString === '';
rs === 'isString';
rs === ``;
// r.errors.req
// r.result.req

// const conForm = form('strict')<ValuesInterface>(
//   {
//     firstName: ``,
//   },
//   {
//     firstName: [req, min(2)],
//   }
// );

// conForm.values;
// conForm.validators
// conForm.set();
// conForm.patch();
// conForm.reconfigure();
// conForm.keys();

// const [{ values, validators, report }, { change }] = form('strict', [
//   (values, validators, report) => set({ values, validators, reports }),
// ])(values, validators);

// const useForm = create<DocStoreState>((set) => ({
//   values,
//   report,
//   change,
// }));
