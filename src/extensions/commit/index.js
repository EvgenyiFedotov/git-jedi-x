const { dirname } = require("path");

const { gitChanges } = require("../../lib/git");

function scopesByChangesSrc() {
  const paths = gitChanges().map(_parseScopePath).filter(Boolean);
  const unicPaths = paths.reduce((memo, path) => {
    memo.add(path);

    return memo;
  }, new Set());

  return Array.from(unicPaths);
}

function _parseScopePath(params) {
  const arr = dirname(params.path).split("/");

  if (arr[1] && arr[2]) {
    return `${arr[1]}/${arr[2]}`;
  } else if (arr[1]) {
    return arr[1];
  }

  return "";
}

module.exports = { scopesByChangesSrc };
