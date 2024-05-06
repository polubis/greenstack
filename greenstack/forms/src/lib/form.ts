/* eslint-disable @typescript-eslint/no-explicit-any */
type ValidationResult<Identifier extends string> = Identifier | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValuesBase = Record<string | number, any>;

type ValidatorsSetup<Values extends ValuesBase> = {
  [Key in keyof Values]?: ((value: Values[Key]) => ValidationResult<string>)[];
};

type ValuesKeys<Values extends ValuesBase> = (keyof Values)[];

type ValidationReport<Values extends ValuesBase> = {
  [Key in keyof Values]: ValidationResult<string>;
};

const form = <Values extends ValuesBase>(
  validatorsSetup: ValidatorsSetup<Values> = {}
) => {
  let values: Values;
  let keys: ValuesKeys<Values>;
  let report: ValidationReport<Values>;

  return {
    init: (initialValues: Values) => {
      values = initialValues;
      keys = Object.keys(values);
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
    report,
  };
};

const min =
  (limit: number) =>
  (value: string | unknown[]): ValidationResult<'min'> =>
    value.length > limit ? `min` : null;

const max =
  (limit: number) =>
  (value: string | unknown[]): ValidationResult<'max'> =>
    value.length > limit ? `max` : null;

interface RegisterFormData {
  username: string;
  password: string;
}

const registerForm = form<RegisterFormData>({
  username: [],
  password: [min(15), max(20)],
});
// Performs validation initially.
registerForm.init({ username: ``, password: `` });

// registerForm.report.password.
// registerForm.report.password?.charAt();
// const [form] = useState(registerForm.init)
// const [state, setState] = useState(form.state)

// React.useEffect(() => {
//   form.subscribe(setState)
// }, [])

// registerForm.set();
// registerForm.subscribe((state) => {
//   setState(stat)
// });
