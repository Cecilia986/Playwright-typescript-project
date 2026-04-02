# Playwright TodoMVC & SVGOMG Test Framework

This is a Playwright + TypeScript automation test framework specifically designed for testing Playwright's official demo websites.

## Test Targets

| Environment | Test Website | Description |
|-------------|--------------|-------------|
| **QA** | [TodoMVC](https://demo.playwright.dev/todomvc) | Todo application testing |
| **DEV** | [SVGOMG](https://demo.playwright.dev/svgomg) | SVG image optimization tool testing |

##  Tech Stack

- [Playwright](https://playwright.dev/) - End-to-end testing framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Allure Report](https://allurereport.org/) - Test reporting
- [Ortoni Report](https://github.com/ortoniKC/ortoni-report) - HTML reporting

##  Test Coverage

### TodoMVC Tests (QA Environment)
- ✅ Add todo items
- ✅ Mark complete/incomplete
- ✅ Delete todo items
- ✅ Filter (All/Active/Completed)
- ✅ Edit todo items

##  API Test Coverage (Restful-Booker)

API endpoint: `https://restful-booker.herokuapp.com`

### Full Booking Lifecycle Test (Chain Call)

| Step | Operation | Endpoint | Description |
|------|-----------|----------|-------------|
| 1 | Get Auth Token | `POST /auth` | Generate token for update/delete operations |
| 2 | Create Booking | `POST /booking` | Create a new booking record |
| 3 | Get Booking | `GET /booking/{id}` | Verify booking was created correctly |
| 4 | Full Update | `PUT /booking/{id}` | Fully update the booking with token |
| 5 | Partial Update | `PATCH /booking/{id}` | Partially update the booking with token |
| 6 | Delete Booking | `DELETE /booking/{id}` | Delete the booking with token |
| 7 | Verify Deletion | `GET /booking/{id}` | Confirm booking returns 404 after deletion |
| 8 | Validate Schema | `POST /booking` | Verify response schema structure |

### Validation Points

- ✅ Status code validation (2xx, 4xx)
- ✅ Response data integrity
- ✅ JSON Schema validation
- ✅ Chain dependency (token, booking ID)
- ✅ Post-deletion resource verification


##  Prerequisites

- Node.js 18+
- npm 8+

##  Installation

```bash
# Clone the project
git clone https://github.com/Cecilia986/Playwright-typescript-project.git

# Enter the directory
cd Playwright-typescript-project

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
