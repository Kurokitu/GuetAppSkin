module.exports = api => {
  let config = {
    presets: [],
    plugins: [
      "@babel/plugin-proposal-nullish-coalescing-operator",
      ["@babel/plugin-proposal-decorators",{
        decoratorsBeforeExport: true
      }],
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-proposal-partial-application"
    ]
  };
  if (api.env('test')){
    config.presets.push(["@babel/preset-env",{
      targets: {
        node: "current"
      },
      modules: false
    }]);
    config.plugins.push("@babel/plugin-transform-modules-commonjs");
  } else {
    config.presets.push('@vue/app');
  }
  return config;
};
