# All Tests

## Functional Testing

### Requirement 
- Have Node.js installed on your computer, installation link => https://nodejs.org/pt-br/download/


### Installing the project
- Clone the project in a local environment: https://github.com/rcalves82/all-test.git
- Open the terminal in the "functional-testing" project directory and run the npm install command to install the dependencies.

### Test execution
- Run the command "npm run test-open" to open the Cypress screen to run tests by interacting with the screen.
- Run the command "npm run test-run" to run the tests in headless mode.

### Structure

**API Testing**
- In the "e2e/api" directory are the test files.
- In the "support/api" directory are the commands or methods used in the test scenarios.

**Web Testing**
- In the "e2e/web" directory are the test files.
- In the "support/web" directory are the commands or methods used in the test scenarios.
- In the "web_data.js" file are the test masses only for web tests.
