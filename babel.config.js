module.exports = api => {
  let config = {
    presets: [],
    plugins: [
      "@babel/plugin-proposal-nullish-coalescing-operator"
    ]
  };
  if (api.env('test')){
    config.plugins.push("@babel/plugin-transform-modules-commonjs");
  } else {
    config.presets.push('@vue/app');
  }
  return config;
};
