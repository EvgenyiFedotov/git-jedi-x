#!/usr/bin/env node

const { program } = require("commander");

const { version } = require("../package.json");
const { getConfig } = require("./get-config");
const { commandCommit } = require("./cli-commands/commit");

const getCommandOptions = async () => ({
  program,
  config: (await getConfig(program)).config,
});

const runCommand = (cliCommand) => {
  return (command) => {
    getCommandOptions().then((options) => cliCommand({ command, options }));
  };
};

// Main programm
program.version(version);
program.option("--config <path>", "Path to config");
program.option("--development", "Mode development");

// Command commit
const commit = program.command("commit");

commit.action(runCommand(commandCommit));

program.parse(process.argv);
