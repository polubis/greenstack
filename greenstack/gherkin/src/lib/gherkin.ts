type GherkinFnName = 'Given' | 'When' | 'Then' | 'And';
type MiddlewareFunction<Key extends string | symbol | number> = (
  name: GherkinFnName,
  key: Key
) => void;

type Commands<C extends Record<string, unknown>> = Record<
  keyof C,
  (...args: never[]) => void
>;

interface Setup<C extends Record<string, unknown>> {
  commands: Commands<C>;
  middleware?: MiddlewareFunction<keyof C>[];
}

function Gherkin<S extends Setup<S['commands']>>({ commands, middleware }: S) {
  function runMiddleware(name: GherkinFnName, key: keyof S['commands']): void {
    middleware?.forEach((fn) => fn(name, key));
  }

  function Given<K extends keyof S['commands']>(
    key: K,
    ...args: Parameters<S['commands'][K]>
  ) {
    runMiddleware('Given', key);
    commands[key](...args);

    return {
      Then,
      When,
      And,
    };
  }

  function Then<K extends keyof S['commands']>(
    key: K,
    ...args: Parameters<S['commands'][K]>
  ) {
    runMiddleware('Then', key);
    commands[key](...args);

    return {
      And,
      When,
    };
  }

  function When<K extends keyof S['commands']>(
    key: K,
    ...args: Parameters<S['commands'][K]>
  ) {
    runMiddleware('When', key);
    commands[key](...args);

    return {
      And,
      Then,
    };
  }

  function And<K extends keyof S['commands']>(
    key: K,
    ...args: Parameters<S['commands'][K]>
  ) {
    runMiddleware('And', key);
    commands[key](...args);

    return {
      Then,
      When,
      And,
    };
  }

  return { Given };
}

export type { Setup, Commands, MiddlewareFunction };
export { Gherkin };
