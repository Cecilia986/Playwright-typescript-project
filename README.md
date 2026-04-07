#  Playwright TypeScript Automation Framework

A scalable end-to-end (E2E) automation testing framework built using **Playwright** and **TypeScript**, designed to simulate real-world enterprise testing scenarios. The framework supports containerized execution using Docker and automated CI/CD pipelines using GitHub Actions.

This project demonstrates modern test automation practices including **UI testing**, **API testing**, **modular framework design**, and **CI/CD integration**.

---

#  Project Overview

This project implements a **production-style automation framework** that supports testing of dynamic web applications and REST APIs.

The framework is designed using **Page Object Model (POM)** and modular architecture to ensure maintainability, scalability, and reusability.

Key objectives of this project:

- Build a scalable and maintainable automation framework
- Demonstrate UI and API automation capabilities
- Apply modern automation design patterns
- Support CI/CD-based test execution
- Simulate real-world enterprise automation workflows

---

#  Framework Architecture

The framework follows a modular layered design:
tests/
├── functional/ # UI test scenarios
├── api/ # API test scenarios

pages/ # Page Object Model classes

utils/ # Reusable helper functions

fixtures/ # Shared test setup

config/ # Environment configuration

reports/ # Test output reports


### Architecture Layers

**Tests Layer**
- Contains UI and API test cases
- Implements business-level workflows

**Page Layer**
- Implements Page Object Model (POM)
- Encapsulates UI element interactions

**Utilities Layer**
- Provides reusable helper functions
- Includes API helpers and test utilities

**Configuration Layer**
- Manages test environments
- Controls browser and execution settings

**Reporting Layer**
- Generates execution reports
- Supports HTML and Allure reports

---

# 🧩 Design Patterns Used

The framework applies modern automation design principles:

- **Page Object Model (POM)** – Improves maintainability
- **Modular Architecture** – Enables scalability
- **Reusable Utilities** – Reduces duplication
- **Fixture-based Setup** – Standardizes test initialization
- **API Test Chaining** – Supports workflow testing

---

# 🧪 Test Coverage

This framework includes testing for both **UI workflows** and **REST APIs**.

---

## 🌐 UI Testing (`tests/functional/`)

### Covered Scenarios:

- Dynamic elements handling
- Hidden and asynchronous elements
- Alerts, confirms, prompts
- Drag and drop interactions
- Mouse and keyboard actions
- Right-click and hover actions
- Iframe handling
- File upload and download
- Table sorting and validation
- Authentication workflows
- Cookie handling
- Infinite scrolling
- Redirect validation

### Sample UI Test Files:

- `dynamic-element-scene.spec.ts`
- `basic-form-scenarios.spec.ts`
- `todomvc.spec.ts`

---

## 🔌 API Testing (`tests/api/`)

API tests simulate real-world backend workflows.

### Covered Scenarios:

- Authentication token generation
- CRUD operations
- API chaining workflows
- Response validation
- Error response verification
- Schema validation
- Resource lifecycle testing

### Target APIs:

**Restful-Booker**

Workflow includes:

- Create booking
- Retrieve booking
- Update booking
- Patch booking
- Delete booking
- Validate deletion

**JSONPlaceholder**

Operations include:

- GET requests
- POST requests
- PUT requests
- PATCH requests
- DELETE requests

### Sample API Test Files:

- `advanced-api-test.spec.ts`
- `api-testing.spec.ts`

---

# ⚙️ CI/CD Integration

This project supports automated test execution using **GitHub Actions**.

Pipeline Workflow:

1. Install dependencies
2. Install Playwright browsers
3. Execute UI tests
4. Execute API tests
5. Generate test reports
6. Upload execution results

Benefits:

- Continuous regression testing
- Faster feedback cycles
- Automated validation pipeline
- Improved release confidence

---

# 🧰 Tech Stack

| Category | Tools |
|----------|------|
| Language | TypeScript |
| Test Framework | Playwright |
| API Testing | Playwright API |
| Containerization | Docker |
| CI/CD | GitHub Actions |
| Reporting | Allure, Ortoni |
| Version Control | Git |
| Package Manager | npm |

---

# 📋 Prerequisites

Before running this project, install:

- **Node.js** (v18 or later)
- **npm**

Verify installation:
node -v
npm -v

---

# ⚙️ Installation & Setup

Clone the repository:
git clone https://github.com/Cecilia986/Playwright-typescript-project.git

cd Playwright-typescript-project

Install dependencies:
npm install

Install Playwright browsers:
npx playwright install

Install Docker Desktop

---

# ▶️ Running Tests

Run all tests:
npx playwright test

Run UI tests only:
npx playwright test tests/functional/

Run API tests only:
npx playwright test tests/api/

Run tests in headed mode:
npx playwright test --headed

Run tests in debug mode:
npx playwright test --debug

---

# 📊 Test Reports

After test execution:

Playwright generates:

- HTML Reports
- Allure Reports
- Ortoni Reports

To open HTML report:
npx playwright show-report

---

# 🌍 Cross-Browser Testing

The framework supports:

- Chromium
- Firefox
- WebKit

Configured in:
playwright.config.ts

---
# 🐳 Docker Support

This project supports containerized test execution using Docker, ensuring consistent test environments across machines.

## Build Docker Image

docker build -t playwright-tests .

## Run Tests Inside Docker

docker run --rm playwright-tests

## Benefits of Using Docker

- Ensures consistent test environment
- Eliminates local dependency issues
- Improves portability
- Supports CI/CD execution

---

# ⚙️ CI/CD Integration

This project integrates with **GitHub Actions** to automatically execute tests whenever code changes are pushed to the repository.

## CI/CD Workflow

1. Developer updates test code locally
2. Tests are verified locally using Docker
3. Code is pushed to GitHub
4. GitHub Actions pipeline is triggered
5. Dependencies are installed
6. Playwright browsers are installed
7. UI and API tests are executed
8. Reports are generated automatically

## Benefits

- Continuous regression testing
- Automated quality checks
- Early defect detection
- Improved release confidence

  ---

  # 🔄 Automation Workflow

Local Development
        ↓
Run Tests in Docker
        ↓
Git Push
        ↓
GitHub Actions Triggered
        ↓
Install Dependencies
        ↓
Execute Tests
        ↓
Generate Reports

# 🧠 Key Outcomes

This project demonstrates:

- Automation framework design
- UI and API automation testing
- Modular architecture development
- Test reliability handling
- CI/CD integration workflow
- Scalable test design

---

# 👩‍💻 Author

**Cecilia**

Automation Test Engineer  
Specializing in:

- UI Automation Testing
- API Testing
- Playwright + TypeScript
- CI/CD Automation
---


