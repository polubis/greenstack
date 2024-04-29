type GherkinFunctionName = 'given' | 'when' | 'then' | 'and';

type GherkinMiddleware = ((name: GherkinFunctionName, key: string) => void)[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CommandHandler = (...args: any[]) => Promise<void> | void;

const gherkin =
  (...middleware: GherkinMiddleware) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <C extends Record<string, CommandHandler>>(commands: C) => {
    const queue: (() => Promise<void>)[] = [];

    async function runQueue(): Promise<void> {
      for (const command of queue) {
        await command();
      }
    }

    function runMiddleware<K extends keyof C>(
      name: GherkinFunctionName,
      key: K
    ): void {
      if (typeof key !== 'string') {
        throw Error(
          'Cannot run middleware. Passed key is not matching any commands key'
        );
      }

      middleware.forEach((fn) => fn(name, key));
    }

    function given<K extends keyof C>(key: K, ...args: Parameters<C[K]>) {
      queue.push(async () => {
        runMiddleware('given', key);
        await commands[key](...args);
      });

      return {
        when,
        then,
        and,
        done,
      };
    }

    function when<K extends keyof C>(key: K, ...args: Parameters<C[K]>) {
      queue.push(async () => {
        runMiddleware('when', key);
        await commands[key](...args);
      });

      return {
        and,
        then,
        done,
      };
    }

    function then<K extends keyof C>(key: K, ...args: Parameters<C[K]>) {
      queue.push(async () => {
        runMiddleware('then', key);
        await commands[key](...args);
      });

      return {
        when,
        and,
        done,
      };
    }

    function and<K extends keyof C>(key: K, ...args: Parameters<C[K]>) {
      queue.push(async () => {
        runMiddleware('and', key);
        await commands[key](...args);
      });

      return {
        then,
        when,
        and,
        done,
      };
    }

    async function done(): Promise<void> {
      await runQueue();
    }

    return {
      given,
    };
  };

export type { GherkinFunctionName, GherkinMiddleware };
export { gherkin };
