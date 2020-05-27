const inquirer = require("inquirer");

const { gitCommit } = require("../lib/git");

async function commandCommit({ options: { config } }) {
  const questions = _questions({ config });
  const answers = await inquirer.prompt(questions);

  config.commit.before({ answers });
  gitCommit({ message: config.commit.template(answers) });
  config.commit.after({ answers });
}

function _questions({ config }) {
  const questions = [];

  questions.push({
    type: "list",
    name: "type",
    message: "type",
    choices: config.commit.types,
  });

  questions.push(_questionScope({ config }));

  questions.push({
    type: "input",
    name: "title",
    message: "title",
  });

  return questions.filter(Boolean);
}

function _questionScope({ config }) {
  if (config.commit.scopes && config.commit.scopes.length) {
    return {
      type: "list",
      name: "scope",
      message: "scope",
      choices: config.commit.scopes,
    };
  }

  return {
    type: "input",
    name: "scope",
    message: "scope",
  };
}

module.exports = { commandCommit };
