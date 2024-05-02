// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValuesBase = Record<string | number, any>;

type ValidatorFnResult = string | null;
type ValidatorFn<Value> = (value: Value) => ValidatorFnResult;

type ValidatorsRegistryBase = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]) => (...args: any[]) => string | null
>;

type ValidatorsConfig<Values extends ValuesBase> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Key in keyof Values]?: ValidatorFn<Values[Key]>[];
};

const form =
  <ValidatorsRegistry extends ValidatorsRegistryBase>(
    validatorsRegistry: ValidatorsRegistry
  ) =>
  <Values extends ValuesBase>(
    values: Values,
    validators: (
      validatorsRegistry: ValidatorsRegistry
    ) => ValidatorsConfig<Values> = () => ({})
  ) => {};

interface BaseData {
  firstName: string;
}

const req = () => (value: string) => '';
const min = (limit: number) => (value: string) => '';

const validators: ValidatorsConfig<BaseData> = {
  firstName: [req(), min(2)],
};

const baseValidatorsRegistry = {
  min,
  req,
};

const r = form({
  req,
  min,
})<BaseData>({ firstName: '' }, (v) => ({
  firstName: [v.req(), v.min(2)],
}));

r.result.min;
// r.result.firstName.req

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
