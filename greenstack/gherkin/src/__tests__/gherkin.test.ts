import { expect, it, describe } from 'vitest';
import { GherkinFunctionName, gherkin } from '..';

describe('Gherkin interpreter works when', () => {
  type ResultPair = { name: GherkinFunctionName; key: string };

  it('executes commands in correct order', async () => {
    const commandsKeys: string[] = [];

    const commands = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      'i see an input': async () => {
        await Promise.resolve();
        commandsKeys.push(`i see an input`);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
      'i click button': (name: string) => {
        commandsKeys.push(`i click button`);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      'i sign in': async (username: string, password: string) => {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(undefined);
          }, 1000);
        });
        commandsKeys.push(`i sign in`);
      },
    };

    const { given } = gherkin()(commands);

    await given(`i click button`, 'tst')
      .when(`i click button`, `name`)
      .and(`i sign in`, '', '')
      .then(`i see an input`)
      .and(`i see an input`)
      .and(`i see an input`)
      .done();

    const expectedKeys: string[] = [
      `i click button`,
      `i click button`,
      `i sign in`,
      `i see an input`,
      `i see an input`,
      `i see an input`,
    ];

    expect(commandsKeys).toEqual(expectedKeys);
  });

  it('triggers middleware functions in correct order', async () => {
    const middlewareResult1: ResultPair[] = [];
    const middlewareResult2: ResultPair[] = [];

    const middlewareSpy1 = vi
      .fn()
      .mockImplementation((name, key) => middlewareResult1.push({ name, key }));
    const middlewareSpy2 = vi
      .fn()
      .mockImplementation((name, key) => middlewareResult2.push({ name, key }));

    const commands = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      'i see an input': () => {},
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
      'i click button': (name: string) => {},
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      'i sign in': async (username: string, password: string) => {
        await Promise.resolve();
      },
    };

    const { given } = gherkin(middlewareSpy1, middlewareSpy2)(commands);

    await given(`i click button`, 'tst')
      .when(`i click button`, `name`)
      .and(`i sign in`, '', '')
      .then(`i see an input`)
      .and(`i see an input`)
      .and(`i see an input`)
      .done();

    const expectedResult: ResultPair[] = [
      { name: 'given', key: 'i click button' },
      { name: 'when', key: 'i click button' },
      { name: 'and', key: 'i sign in' },
      { name: 'then', key: 'i see an input' },
      { name: 'and', key: 'i see an input' },
      { name: 'and', key: 'i see an input' },
    ];

    expect(middlewareSpy1).toHaveBeenCalledTimes(6);
    expect(middlewareSpy2).toHaveBeenCalledTimes(6);
    expect(middlewareResult1).toEqual(expectedResult);
    expect(middlewareResult2).toEqual(expectedResult);
  });
});
