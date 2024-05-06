type ValidationResult<Identifier extends string = string> = Identifier | ' ';
// Returns truthy if value is valid.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidatorsRegistryFn = (
  ...args: any[]
) => (value: unknown) => ValidationResult;

type ValidatorsRegistryBase = Record<string, ValidatorsRegistryFn>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValuesBase = Record<string | number, any>;

type ValidatorsSetup<Values extends ValuesBase> = {
  [Key in keyof ValuesBase]?: (value: Values[Key]) => ValidationResult;
};

const form =
  <ValidatorsRegistry extends ValidatorsRegistryBase>(
    registry: ValidatorsRegistry
  ) =>
  <Values extends ValuesBase>(
    validatorsSetup: ValidatorsSetup<Values> = {}
  ) => {
    let values: Values;

    return {
      init: (initialValues: Values) => {
        values = initialValues;
      },
      set: <Key extends keyof Values>(key: Key, value: Values[Key]) => {
        values = {
          ...values,
          [key]: value,
        };
      },
      patch: (newValues: Partial<Values>) => {
        values = {
          ...values,
          ...newValues,
        };
      },
    };
  };

const min =
  (limit: number) =>
  (value: unknown): ValidationResult<'min'> => {
    if (typeof value !== `string` && !Array.isArray(value)) return ` `;

    return value.length > limit ? `min` : ` `;
  };

const max =
  (limit: number) =>
  (value: unknown): ValidationResult<'max'> => {
    if (typeof value !== `string` && !Array.isArray(value)) return ` `;

    return value.length > limit ? `max` : ` `;
  };

const createForm = form({
  min,
  max,
});

interface RegisterFormData {
  username: string;
  password: string;
}

const registerForm = createForm<RegisterFormData>({});
// Performs validation initially.
registerForm.init({ username: ``, password: `` });

// const [form] = useState(registerForm.init)
// const [state, setState] = useState(form.state)

// React.useEffect(() => {
//   form.subscribe(setState)
// }, [])

// registerForm.set();
// registerForm.subscribe((state) => {
//   setState(stat)
// });
