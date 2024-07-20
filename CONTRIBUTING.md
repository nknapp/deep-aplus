## Contributing

Contributions and feedback are always welcome. The expected procedure is the following:

### Bugs, Features and Feedback

- Please, create github issues for **feature-requests**, **bug reports**.
- Feel free to open issues for **questions and problems you have**, even if they are not bugs
  or feature requests.
- You may even open an issue just to say you like the project.
- For small changes, such as **typo and formatting corrections**, you can immediately
  create a pull-request. You can use the github web-interface, but keep in mind that most of the documentation
  is created with Thought, so you should change the template in the `.thought` directory or change the default
  templates in [the thought project](https://github.com/nknapp/thought/tree/master/handlebars).
- If you have an idea for a **new feature** that you would like to implement, please **open an issue** first and ask
  for feedback. Maybe someone else has a similar problem and different ideas.
- If you encounter a bug you can submit a **pull-request for a failing unit test**, you should then also open an issue
  for the bug.
- Before making a pull-request, make sure that you commit corresponds to the coding-style. You can do this by
  running `npm test`.

**People submitting relevant contributions will be granted commit access to the repository.**

### Installing & Testing

You can fork and clone the repo from github. Run

```shell
# Install dependencies needed to build and run the project
npm install

# Run tests like they are run in CI
npm run test

# Run tests in watch mode
npm run dev

# Generate README.md and other documentation files
npm run thought

```
