module.exports = function(api) {
  api.cache(true);

  const presets = [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["> 0.2%, not dead, not op_mini all"]
      },
      "modules": "commonjs",
      "debug":true,
      "useBuiltIns": 'usage',
      'corejs' : '3',
    }],
    ["@babel/preset-react"]
  ];

  const plugins = [
    "@babel/plugin-proposal-class-properties"
  ];

  return {
    presets,
    plugins,
    "env": {
      "test": {
        "presets": [
          [
            "@babel/preset-env",
            {
              "targets": {
                "node": "current",
                "browsers": ["> 0.25%, not dead, not op_mini all"]
              }
            }
          ]
        ]
      }
    }
  }

}
