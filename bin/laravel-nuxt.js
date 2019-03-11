#!/usr/bin/env node
const program = require("commander");
const pkg = require("../package.json");

program
    .version(pkg.version)
    .command("dev", "Start the development servers", { isDefault: true })
    .command("build", "Build for production")
    .command("start", "Start for production")
    .parse(process.argv);
