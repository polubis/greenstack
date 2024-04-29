# Introduction

A lightweight facade library with zero external dependencies for maintaining end-to-end test logic using the `Gherkin` convention.

## Why?

1. Framework agnostic.
2. Facilitates the reuse of test steps.
3. Creates more human-friendly tests.
4. Ensures type safety and offers an excellent developer experience.
5. Provides hints while writing tests.
6. High reusability.

> Learn more about the `Gherkin` syntax implemented in this library here: [Gherkin](https://cucumber.io/docs/gherkin/reference/).

## Installation

Run the following command in your terminal:

```bash
npm i @greenstack/gherkin
```

## Source Code

The library is open source and is hosted under the following [greenstack](https://github.com/polubis/greenstack/tree/main/greenstack/gherkin) repository. Feel free ro raise issues.

### The Idea Showcase

Tests are composed of **commands** that you define in an object and pass to the `gherkin` function. The first argument is middleware which may include additional logs, and the second is the configuration object containing the commands.

Later, you can call them with a chain of functions. The arguments are inferred and `TypeScript` protects you from making mistakes and typos at both IDE and compile time. This approach will save you considerable time during test writing.

```typescript
import { gherkin } from '@greenstack/gherkin';

const commands = {
   // Add these commands for you test logic and reuse them by methods chain.
  'i see an input': () => {
    // Insert your framework logic here.
  },
  'i click button': (name: string) => {
    // Insert your framework logic here.
  },
  'i sign in': async (username: string, password: string) => {
    // Insert your framework logic here.
  },
};

const { given } = gherkin((name, key) => {
  // Middleware. May be loggers or side effects. Whatever you need.
  console.log(`Function ${name} executed with ${key} key`);
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
```