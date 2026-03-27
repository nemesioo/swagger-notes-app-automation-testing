# Swagger Notes App Automation Testing

Automated API testing suite for the *Swagger Notes App* using Playwright. This repository contains test scripts, configuration, and reports to validate API endpoints and ensure reliable functionality.

---

## 🚀 Features

- Automated API testing using Playwright
- Organized test structure
- Environment-based configuration support
- HTML report generation
- Reusable utilities and helpers
- Easy integration with CI/CD pipelines

---

## 📦 Project Structure

```
.
├── .github/               # GitHub workflows (CI/CD)
├── reports/               # Generated test reports
├── src/                   # Shared utilities, helpers, schemas
├── tests/                 # Test suites
├── .env                   # Environment variables (ignored)
├── package.json           # Project dependencies and scripts
├── pnpm-lock.yaml         # Dependency lock file
├── playwright.config.ts   # Playwright configuration
└── README.md              # Documentation
```

---

## 🔧 Prerequisites

Make sure you have the following installed:

- Node.js (v16 or higher)
- pnpm or npm
- Git

---

## 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/nemesioo/swagger-notes-app-automation-testing.git
cd swagger-notes-app-automation-testing
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Setup environment variables:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration values.

---

## ⚙️ Environment Variables

Example `.env`:

```env
API_BASE_URL=https://your-api-url
API_KEY=your_api_key_here
```

---

## ▶️ Running Tests

### Run all tests

```bash
pnpm test
# or
npm test
```

### Run tests with report

```bash
pnpm test:report
```

### Run a specific test file

```bash
pnpm test tests/example.spec.ts
```

---

## 📊 Reports

After running tests, reports will be generated in the `reports/` directory. Open the HTML report in your browser to view:

- Test results
- Request/response logs
- Errors and traces
- Screenshots (if enabled)

---

## 🧪 Writing Tests

- Test files are located inside the `tests/` directory
- Follow naming convention: `*.spec.ts`
- Use reusable helpers from the `src/` directory
- Validate API responses using assertions

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch  
3. Make your changes  
4. Submit a pull request  

---

## 📜 License

This project is open-source and available for personal and commercial use.

---

## 💬 Support

If you encounter any issues or have questions, feel free to open an issue in the repository.