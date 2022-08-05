'use strict';

module.exports = {
  externals: {
    FileReader: 'FileReader'
  },
  plugins: [
    {
      name: 'scss',
      options: {
        postcss: {
          dev: {
            sourceMap: false,
          },
        },
      },
    },
  ]
};

