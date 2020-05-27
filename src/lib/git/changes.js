const { execSync } = require("child_process");

function gitChanges() {
  return getLines().map(parseLine);
}

function getLines() {
  return execSync("git status -s -u").toString().split("\n").slice(0, -1);
}

function parseLine(line) {
  const [stage, unstage] = line;
  const path = line.slice(3);

  return { stage, unstage, path };
}

module.exports = { gitChanges };
