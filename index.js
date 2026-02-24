#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// ANSI sequence for colors
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function printPrefix() {
    return `${colors.bold}${colors.blue}[env-latest]${colors.reset}`;
}

function runAudit() {
    const cwd = process.cwd();
    const exampleEnvPath = path.join(cwd, '.env.example');
    const localEnvPath = path.join(cwd, '.env');

    if (!fs.existsSync(exampleEnvPath)) {
        console.log(`${printPrefix()} ℹ️  No .env.example found. Skipping audit.`);
        process.exit(0);
    }

    const exampleEnvBuf = fs.readFileSync(exampleEnvPath);
    const exampleKeys = Object.keys(dotenv.parse(exampleEnvBuf));

    let localKeys = [];
    if (fs.existsSync(localEnvPath)) {
        const localEnvBuf = fs.readFileSync(localEnvPath);
        localKeys = Object.keys(dotenv.parse(localEnvBuf));
    } else {
        console.log(`${printPrefix()} ${colors.yellow}⚠️  No .env file found! You might need to create one based on .env.example.${colors.reset}`);
    }

    const missingKeys = exampleKeys.filter(key => !localKeys.includes(key));

    if (missingKeys.length === 0) {
        console.log(`${printPrefix()} ${colors.green}✅ All environment variables are synced!${colors.reset}`);
        process.exit(0);
    } else {
        console.error(`${printPrefix()} ${colors.red}❌ Error: Missing environment variables in your .env file:${colors.reset}`);
        missingKeys.forEach(key => {
            console.error(`   ${colors.red}- ${key}${colors.reset}`);
        });
        console.error(`\n${colors.yellow}Please add these to your .env file so the application can run properly.${colors.reset}\n`);

        // Exit with an error code to fail CI or pre-commit hooks
        process.exit(1);
    }
}

runAudit();
