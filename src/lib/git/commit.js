const { execSync } = require("child_process");

function gitCommit({ message, all }) {
  try {
    const a = all ? "-a" : "";

    execSync(`git commit ${a} -m "${message}"`, {
      cwd: process.cwd(),
    });
  } catch (error) {
    console.log(error.message);

    if (error.output) {
      console.log(error.output.toString());
    }
  }
}

module.exports = { gitCommit };
