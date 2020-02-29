module.exports = api => {
  let config = {
    presets: [],
    plugins: [
      "@babel/plugin-transform-typescript",
      "@babel/plugin-proposal-nullish-coalescing-operator",
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
    config.plugins.push(["@babel/plugin-proposal-decorators", {
      legacy: true
    }]);
  } else {
    config.presets.push('@vue/app');
  }
  return config;
};
