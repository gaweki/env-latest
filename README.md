# env-latest 

A dead-simple, blazing-fast CLI tool to ensure your local `.env` file is always in sync with `.env.example`. Stop fighting with "missing environment variable" crashes in production!

## Why use this?
When working on backend/cloud projects, team members often add new variables to `.env.example`. If other developers (or your CI/CD pipeline) forget to update their local `.env` files, the application crashes silently. 

`env-latest` checks if every key inside `.env.example` exists in your `.env`. If something is missing, it will boldly yell out the exact missing keys and fail the process with `Exit Code 1` — perfect for Husky Pre-commit hooks!

---

## Installation

Run it instantly using `npx` (No installation needed!):
```bash
npx env-latest
```

Or install it globally:
```bash
npm install -g env-latest
```

Or add it to your project's `devDependencies`:
```bash
npm install --save-dev env-latest
```

---

## Usage / Example

Simply run the command in the root of any project that contains `.env` and `.env.example` files:

```bash
env-latest
```

### Case 1: All Sync (Success)
```text
[env-latest] All environment variables are synced!
```

### Case 2: Missing Variables (Error)
```text
[env-latest] Error: Missing environment variables in your .env file:
   - AWS_SECRET_KEY
   - DB_PASSWORD

Please add these to your .env file so the application can run properly.
```

---

## Adding to Husky / Pre-commit Hooks (Recommended)
You can prevent developers from committing code if their `.env` is outdated! Just add `env-latest` to your `package.json` scripts:

```json
{
  "scripts": {
    "precommit": "env-latest && lint-staged"
  }
}
```

---
*Created with ❤️ to save developers from debugging `.env` nightmares.*
