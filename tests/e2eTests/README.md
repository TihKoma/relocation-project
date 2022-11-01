# e2eTests-web

This directory includes e2e web tests for Nicity

## Tests execution steps

1. Setup ssh connection with GitLab https://docs.gitlab.com/ee/user/ssh.html

It will be necessary to npm install dependent GitLab repo via **package.json**

```json
  "dependencies": {
    "@qa/tools": "git+ssh://git@gitlab.com:nicity/qa/tools.git#0.0.2"
  }
```

2. Export ENV_NAME to specify which test environment should be under testing

Example:

```shell
export ENV_NAME="mp-dev-1"
```

or
rename .env.example to .env and add required values.
Some other environment variables may be required.

3. Install dependencies (takes couple of minutes)

```shell
cd tests/e2eTests
npm i
```

4. Run tests

For specific test execution: go to **package.json** and modify test path/name

```json
"anyTest": "mocha --t 60000 community/auth/QA-TC-36_Login.js",
```

run test:

```shell
npm run anyTest
```

For parallel tests execution: use **mocha-parallel-tests** library and path
to directory with tests

```json
"e2eTests": "mocha-parallel-tests --exit --retries 1 --timeout 10000 community/* --max-parallel 2"
```

run tests:

```shell
npm run e2eTests
```
