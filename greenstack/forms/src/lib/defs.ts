// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValuesBase = Record<string | number, any>;

type ValidatorFnResult<Identifier = string> = Identifier | null;
type ValidatorFn<Value, Identifier = string> = (
  value: Value
) => ValidatorFnResult<Identifier>;

type ValidatorsRegistryBase = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]) => (...args: any[]) => string | null
>;

type ValidatorsConfig<Values extends ValuesBase> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Key in keyof Values]?: ValidatorFn<Values[Key]>[];
};

type ValidationResult<
  Values extends ValuesBase,
  ValidatorsRegistry extends ValidatorsRegistryBase
> = {
  [ValueKey in keyof Values]: {
    [ValidatorKey in keyof ValidatorsRegistry]: ValidatorKey | null;
  };
};

type FormState<
  Values extends ValuesBase,
  ValidatorsRegistry extends ValidatorsRegistryBase
> = {
  values: Values;
  result: ValidationResult<Values, ValidatorsRegistry>;
  valid: boolean;
  invalid: boolean;
  touched: boolean;
  untouched: boolean;
  confirmed: boolean;
  unconfirmed: boolean;
};

type FormMiddlewareFn<
  Values extends ValuesBase,
  ValidatorsRegistry extends ValidatorsRegistryBase
> = (state: FormState<Values, ValidatorsRegistry>) => void;

type FormMiddleware<
  Values extends ValuesBase,
  ValidatorsRegistry extends ValidatorsRegistryBase
> = FormMiddlewareFn<Values, ValidatorsRegistry>[];

type FormActions<
  Values extends ValuesBase,
  ValidatorsRegistry extends ValidatorsRegistryBase
> = {
  set<Key extends keyof Values>(
    key: Key,
    value: Values[Key]
  ): FormState<Values, ValidatorsRegistry>;
};

type Formable<
  Values extends ValuesBase,
  ValidatorsRegistry extends ValidatorsRegistryBase
> = FormState<Values, ValidatorsRegistry> &
  FormActions<Values, ValidatorsRegistry>;

export type {
  ValuesBase,
  ValidatorFnResult,
  ValidatorFn,
  ValidatorsRegistryBase,
  ValidatorsConfig,
  ValidationResult,
  FormState,
  FormMiddleware,
  FormActions,
  Formable,
};
