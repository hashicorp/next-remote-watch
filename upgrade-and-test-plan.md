## Steps to take to upgrade and test the library

The proposal for introducing the following step is to adopt a git strategy as follows:

1. a `dev` branch to merge against under the `hashicorp/next-remote-watch` repo.
2. Every step of the following plan will be introduced as a separate PR to be merged against `dev` from our fork.
3. Once all PRs under `dev` are merged, `dev` can be merged against `master/main` in the main repo.

### Upgrade dependencies

Currently test dependencies include version ^9 of Next.js that exposes a different API for hot reloading (`app.hotReloader` instead of `app.server.hotReloader` introduced in Next >10).

1. Upgrade `next` to latest version
2. Install `jest`
3. Install `eslint`

_Reminder: we will need to audit, and potentially fix, high/critical vulnerabilities in third party dependencies_

---

### Setup ESLint and Jest

Improve code quality in the project by adding a basic ESLint configuration (consider `eslint-plugin-node`).

1. install `eslint`
2. install `eslint-plugin-prettier` and `eslint-plugin-node`
3. extend eslint recommended, prettier recommended, and node recommendede configuration.

Introduce `jest` in the project:

1. install `jest`

---

### Testing Strategy

#### Step 1 - Unit Test the `main.js`

1. We extract the code from the `.bin/next-remote-watch` into a `main.js` under `src/`. The `main.js` will export a `run` function that is invoked in the `.bin/next-remote-watch`
2. We make sure that the logic in `main.js` is encapsulated into functions, which gives us the possibility to export those functions and test them individually (and mock the dependencies)
3. We write the unit tests

#### Step 2 - create modules

Once we have test coverage in place, we can start refactor the `main.js` and extract each functionalities into separate modules (and extract the corresponding tests from the `main.test.js`).
The `src/` directory will look like the following:

```sh
src/
├── app.js
├── main.js
├── program.js
├── server.js
└── watcher.js
```

### Step 3 - Integration testing to cover different Next.js version

Introduce integration testing to ensure compatibility between v9, v10 (and potentially future versions).

---

### Step 4 - CI

We need to ensure that the tests will be run on each open PR. We can implement the following:

- `husky` pre-commit hook to run `eslint` and `jest`.
- GitHub Action to run `eslit` and `jest` test on each PR.
