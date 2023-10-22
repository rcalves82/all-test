# All Tests

### Installing the project
- Clone the project in a local environment: https://github.com/rcalves82/all-test.git

## Functional Testing

### Requirement 
- Have Node.js installed on your computer, installation link => https://nodejs.org/pt-br/download/
- Open the terminal in the **"functional-testing"** project directory and run the **"npm install"** command to install the dependencies.

### Test execution
- Run the command **"npm run test-open"** to open the Cypress screen to run tests by interacting with the screen.
- Run the command **"npm run test-run"** to run the tests in headless mode.
- Run the **"test-api"** command to run only the api tests.
- Run the **"test-chrome"** command to listen to web tests in the Chrome browser.
- Run the **"test-chromium"** command to listen to web tests in the Chromium browser.
- Run the **"test-firefox"** command to listen to web tests in the Firefox browser.

### Structure

**API Testing**
- In the **"cypress/e2e/api"** directory are the test files.
- In the **"cypress/support/api"** directory are the commands or methods used in the test scenarios.

**Web Testing**
- In the **"cypress/e2e/web"** directory are the test files.
- In the **"cypress/support/web"** directory are the commands or methods used in the test scenarios.
- In the **"cypress/support/web_data.js"** file are the test masses only for web tests.

**General**
- In the **"cypress/screenshots"** directory, evidence of failed tests will be generated.
- In the **"cypress/videos"** directory, videos will be generated showing the execution of each test file.

## Performance Testing

### Requirement 
- Have K6 installed on your computer, installation link => https://k6.io/docs/get-started/installation/

### Test execution

- Open the terminal in directory **"performance-testing/tests"** and run the **"k6 run stress-create-user.js"** command to run the test.
- At the end of the test, a .html file will be created with the test result.

### Structure
- In the **"libs"** directory is the file **"uuid.js"** which contains the method for generating random test data.
- In the tests directory is the file **"stress-create-user.js"** with the stress tests that create the user through the api.
- The **"report.html"** file presents the test results after completion.
