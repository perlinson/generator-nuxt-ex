module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          esmodules: true
        },
        useBuiltIns: 'usage',
        corejs: 3,
        loose: true,
        modules: 'auto'
      }
    ]
  ],
  plugins: ['@babel/plugin-proposal-export-default-from']
}
