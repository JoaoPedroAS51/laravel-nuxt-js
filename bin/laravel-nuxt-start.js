#!/usr/bin/env node
const _ = require("lodash");
const program = require("commander");
const spawn = require("cross-spawn");
const which = require("npm-which")(__dirname);
const utils = require("../src/utils");
const pkg = require("../package.json");

program
    .version(pkg.version)
    .description("Start the server in production mode")
    .option(
        "-a, --analyze",
        "Launch webpack-bundle-analyzer to optimize your bundles",
    )
    .option("--no-color", "Disable colored output")
    .parse(process.argv);

// Stop the process if the config is not OK.
utils.validateConfig();

const start = spawn(
    which.sync("nuxt"),
    _.filter([
        "start",
        `-c=${utils.configPath}`,
        program.analyze ? "-a" : "",
        program.color ? "--color" : null,
    ]),
);
utils.pipeStdio(start, "nuxt");
utils.exitOnClose(start);
