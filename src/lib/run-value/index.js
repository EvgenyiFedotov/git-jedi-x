function runValue(value, params = {}) {
  if (value instanceof Function) {
    return value(params);
  }

  return value;
}

module.exports = { runValue };
