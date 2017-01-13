# tsinit [![Build Status](https://img.shields.io/circleci/project/bcherny/tsinit.svg?branch=master&style=flat-square)](https://circleci.com/gh/bcherny/tsinit) [![NPM](https://img.shields.io/npm/v/tsinit.svg?style=flat-square)](https://www.npmjs.com/package/tsinit) [![MIT](https://img.shields.io/npm/l/tsinit.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> Zero-config, opinionated generator for TypeScript + TsLint + Ava projects

## Installation

```sh
npm install tsinit --global
```

## Usage

```sh
> mkdir my-project
> cd my-project
> tsinit -s

----------
- tsinit -
----------

----------
Mode: simple
Name: my-project
----------

Wrote index.d.ts
Wrote index.ts
Wrote index.js
Wrote index.js.map
Wrote LICENSE.md
Wrote package.json
Wrote tsconfig.json
Wrote README.md
Wrote tslint.json

Generated project "my-project" in 43ms!
```

## Tests

```sh
npm test
```

## License

MIT

## Todo

- [ ] Fetch and generate LICENSE.md
- [ ] Run git init
- [ ] Add project to CircleCI via API