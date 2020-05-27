const { cosmiconfigSync } = require("cosmiconfig");

const { configCommit } = require("./config/commit");

async function getConfig(program) {
  const exlorerConfig = cosmiconfigSync("jgx");

  const { filepath = "", config = {} } = program.config
    ? exlorerConfig.load(program.config)
    : exlorerConfig.search() || {};

  return { filepath, config: await buildConfig(program, config) };
}

async function buildConfig(program, config = {}) {
  return {
    development: program.development || config.development,
    commit: await configCommit(config.commit),
  };
}

module.exports = { getConfig };
