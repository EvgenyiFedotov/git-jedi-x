const { runValue } = require("../lib/run-value");

const _types = ["feat", "fix", "refactor", "setup", "tests", "docs", "ci"];

async function configCommit(config = {}) {
  const {
    types = _types,
    scopes = [],
    template = _template,
    before = () => {},
    after = () => {},
  } = config;

  return {
    types: await runValue(types),
    scopes: await runValue(scopes),
    template,
    before,
    after,
  };
}

function _template({ type, scope, title }) {
  scope = scope ? `(${scope})` : "";

  return `${type}${scope}: ${title}`;
}

module.exports = { configCommit };
