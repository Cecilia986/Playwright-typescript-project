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

### SVGOMG Tests (DEV Environment)
- ✅ Page load validation
- ✅ SVG paste functionality
- ✅ Optimization options configuration
- ✅ Image compression validation

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
