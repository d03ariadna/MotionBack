const config = {
  local: {
    mode: "local",
    port: 4000,
  },
  staging: {
    mode: "staging",
    port: 4500,
  },
  production: {
    mode: "production",
    port: 5000,
  },
};

module.exports = function (mode) {
  return config[mode || process.argv[2] || "local"] || config.local;
};
