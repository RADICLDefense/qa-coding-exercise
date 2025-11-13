# Quality Assurance Engineer - Take-Home Coding Exercise

Welcome! This coding exercise is designed to assess your quality assurance and testing skills for a **Quality Assurance Engineer** position at RADICL. We're excited to see how you approach testing and quality!

## Overview

You're starting with a functional full-stack cybersecurity dashboard application that includes:
- **Frontend:** React + Vite
- **Backend Services:** Node.js (Express) and Go (Gorilla Mux)
- **Database:** PostgreSQL

Your task is to evaluate, test, and improve the quality of this application through comprehensive testing strategies.

## Important Notes

- **Use all tools at your disposal** - We encourage you to leverage AI assistants, documentation, testing frameworks, and any other resources you typically use in your QA workflow.
- **Minimum time commitment:** 3-4 hours (but we encourage you to go above and beyond if you're having fun!)
- **Create a PRIVATE repository** for your work - DO NOT fork this repository publicly. See setup instructions below.
- **Grant us collaborator access** to your private repository when submitting. Complete the **[CANDIDATE_RESULTS.md](CANDIDATE_RESULTS.md)** file with your submission details.
- **CRITICAL:** Keep the [README.md](README.md) updated with:
  - Testing framework setup instructions
  - How to run your tests
  - Any new dependencies or prerequisites
  - We will run your tests locally, and accurate instructions are required.

## Getting Started

### 1. Clone This Repository

**Important:** Clone this repository directly - do NOT fork it. This keeps your work private and prevents other candidates from seeing your solution.

```bash
# Clone this repository to your local machine
git clone https://github.com/your-username/supreme-octo-spork.git supreme-octo-spork
cd supreme-octo-spork

# Remove the existing git remote
git remote remove origin
```

### 2. Create Your Private Repository

1. Go to GitHub and create a **new private repository** (e.g., `radicl-qa-test`)
2. **Do NOT initialize it** with a README, .gitignore, or license (we already have those)
3. Copy the repository URL from GitHub

### 3. Push to Your Private Repository

```bash
# Add your new private repository as the remote origin
git remote add origin https://github.com/your-username/your-repo-name.git

# Push your code to your private repository
git push -u origin main
```

### 4. Get the Application Running

```bash
# Follow the setup instructions in the main README.md
# Quick start:
docker compose up -d  # Start PostgreSQL
cd backend/node-service && npm install && npm run dev  # Start Node service
cd backend/go-service && go run main.go  # Start Go service
cd frontend && npm install && npm run dev  # Start React frontend
```

For detailed setup instructions, see the main [README.md](README.md).

### 5. Explore the Application

- **Frontend**: http://localhost:5173
- **Node.js Service**: http://localhost:3001
- **Go Service**: http://localhost:3002

Navigate through the application:
- `/` - Main cybersecurity dashboard
- `/health` - Service health monitoring
- `/service-health` - Detailed service diagnostics

## The Challenge: Test & Improve Quality

Your goal is to demonstrate comprehensive QA skills by testing this application at multiple levels and improving its quality.

**Important Context:**
- This is **not a completed application** - some features may be partially implemented or not fully functional
- Missing or incomplete features should be documented as part of your findings
- This reflects real-world scenarios where you assess partially built systems

**You have complete freedom in:**
- Which testing frameworks and tools you choose
- Which test types you prioritize
- How you organize and structure your tests
- Whether you fix bugs you find or document them (or both!)
- How deep you go in each area

**We want to see your senior-level QA expertise and decision-making!**

## Minimum Requirements

You must complete all of these to be considered for the position:

### 1. Unit Testing

- Install and configure appropriate unit testing frameworks
- Write unit tests that demonstrate meaningful coverage
- Focus on critical functionality and edge cases
- Tests should be maintainable and reliable
- **Document** how to run your tests in the README

### 2. Integration Testing

- Write integration tests that validate interactions between components/services
- Test critical integration points across the application stack
- Consider testing:
  - API endpoints with database operations
  - Frontend-to-backend communication
  - Service health and connectivity
  - Data flow across layers
- Use appropriate tools and approaches for your test scenarios

### 3. Bug Discovery & Documentation

- Explore the application and identify bugs, inconsistencies, missing features, or issues
  - Review the UI/UX for problems
  - Analyze the code for issues
  - Test edge cases and error handling
  - Consider accessibility, security, and performance concerns
- **Create a bug report document** with:
  - Clear description of each issue
  - Steps to reproduce
  - Expected vs actual behavior
  - Severity/priority assessment
  - Screenshots or evidence (where applicable)
- **Document missing or incomplete features** you discover

### 4. Testing Documentation

- Update the [README.md](README.md) with a "Testing" section that includes:
  - Prerequisites for running tests
  - Commands to run different test suites
  - Any environment setup needed
  - Brief overview of your testing approach
- Ensure someone else can clone your repo and run your tests successfully

Choose areas that align with your expertise and demonstrate your approach to comprehensive quality assurance.

## Bug Fixing (Optional)

If you discover bugs during your testing:

**Option 1: Document Only**
- Create detailed bug reports
- Include reproduction steps
- Suggest potential fixes
- Consider writing tests that are skipped or expected to fail (if your framework supports it)
  - This documents bugs as executable specifications
  - Helps developers understand the issue and validate fixes

**Option 2: Document AND Fix**
- Create bug reports
- Fix the bugs in your code
- Add tests to prevent regression
- Document your fixes in CANDIDATE_RESULTS.md

**Both approaches are acceptable!** Choose based on your assessment and priorities.

## Submission

### Grant Collaborator Access

When you're ready to submit:

1. Go to your private repository on GitHub
2. Navigate to **Settings** → **Collaborators and teams** (or **Manage Access**)
3. Click **Add people** or **Invite a collaborator**
4. Add the following GitHub usernames with **Read** access:
   - `JamesLamarRAD` 
   - `FrankHassanabad`
   - `mdpete4`
5. We'll receive an email invitation and can review your code while keeping it private

### Complete Your Submission Details

Please complete the provided **CANDIDATE_RESULTS.md** file with:

- **Testing Summary**: Overview of your testing approach and strategy
- **Test Coverage**: What you tested and why you prioritized those areas
- **Tools & Frameworks**: Which testing tools you chose and why
- **Bugs Found**: Summary of issues discovered (link to your bug report document)
- **Bugs Fixed**: If you fixed any bugs, describe what and how
- **Time Spent**: Approximate time on different activities (testing, automation, documentation)
- **Challenges**: Any difficulties you faced and how you solved them
- **Trade-offs**: Decisions you made and why
- **Future Improvements**: What you would add with more time
- **Test Results**: Summary of test execution results

## Tips for Success

1. **Start with the basics**: Get the app running, explore it thoroughly, understand the architecture
2. **Choose your battles**: Focus on areas where you can demonstrate expertise rather than trying to do everything
3. **Quality over quantity**: A few excellent, meaningful tests are better than many shallow ones
4. **Document as you go**: Don't leave all documentation until the end
5. **Think like a user**: Test real workflows and scenarios that matter
6. **Test your tests**: Make sure your tests are reliable and actually catch bugs
7. **Show your thought process**: In CANDIDATE_RESULTS.md, explain your decisions and priorities

## Questions?

If you have any questions about the requirements or setup, please reach out to your recruiting contact.

Good luck! We're excited to see your QA skills in action! 🚀

