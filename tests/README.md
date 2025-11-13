# Application's tests directory 


This directory contains multiple projects with different frameworks for each application. 
It also has function API tests written in Python.

**PS** It has not been properly maintained before. Lots of teams were contributing to the tests and its structure so it became messy overtime.

## Projects organization 

- API - contains Python tests for API. It also has `perf` folder for performance tests, but work never has been started.
- APP1 - Cypress integration tests for `app1`
- APP2 - WebdriverIO tests for `app2` 


# General requirements 

We value higly good quality code, so be sure to follow general software engineering guidelines and practices when adding more code.

Below are just some general rules: 

- Use clear and descriptive naming
- Apply appropriate TypeScript types and generics
- Common software engineering principles i.e DRY, KISS, Single responsobility etc 
- Common style conventions
- Good error handling 
- Add comments as seem fit
- Avoid vague types such as `any`, `unknown` etc
- No hardcoded values

# Task 00 – Implement the Core Package

This task evaluates your ability to design and implement a reusable TypeScript library.

Since both `app1` and `app2` utilize same backend API, there is a lot of repetitive code has been implemented to utilize 
APIs to setup testing preconditions (users, projects etc). 

We need to extract commong logic into separate `core` package and make it reusable by both testing frameworks.
It should expose an `ApiClient` class that simplifies API communication. 

However, API service itself will be available later.

Here are some of the requirements that we are expecting from the solution:

- Library should available both for Cypress and WebdriverIO projets to use
- Configure TypeScript to output compiled code into `/dist`
- Include type declarations (`.d.ts`)
- Provide scripts:
  - `build` – to compile the package
  - `watch` – to rebuild automatically on changes
  - `clean` – to clear build output


# Task 01 - Style consistency across the projects

Each project currently has its own style for files, variable names etc. Would be nice to bring some consistency to it.

- Refactor `app1` and `app2` projects to have common code style (add necessary tools/dependencies if needed)


# Task 02 - More tests 

- All of the testing projects have seriously lacking test coverage for the application. See if this can be improved. Currently our priority is app2

# Task 03 - More organization 

We currently don't have any test organization. Would be nice to tide this up. Ideally to have commands to execute tests for specific features


### Bonus tasks 

- In the future we are planning to expand our APIs with more services. Would be nice to account for that and make `ApiClient` easily extendable for other services.
- We also would like to make local development more smooth and effecient. We have many teams working on different operating systems. Would be nice to extend current project
to utilze docker for more effecient environment setup
- We also intend to add test coverage for API. We have settled for Python is our team is most familiar with it. However, we werent been able to setup anything yet. 
Would be nice to get some MVP working to present for the team
- WebdriverIO tests contains too many noisy logs. Need to clean up that
- Parallelization
- Pretty reports in CI

