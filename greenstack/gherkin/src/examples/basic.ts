/* eslint-disable @typescript-eslint/no-unused-vars */
import { gherkin } from '../lib/gherkin';

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

const { given } = gherkin((name, key) => {
  console.log(`function ${name} executed with ${key} key`);
})(commands);

const yourTestsExecutedInSequence = async () => {
  // Executed in sequence
  await given(`i see an input`)
    .and(`i see an input`)
    .when(`i sign in`, '', '')
    .then(`i see an input`);

  await given(`i see an input`)
    .and(`i see an input`)
    .when(`i sign in`, '', '')
    .then(`i see an input`);
};

const ifDontNeedToWait = () => {
  given(`i see an input`)
    .and(`i see an input`)
    .when(`i sign in`, '', '')
    .then(`i see an input`);
};
