const path = require('path');

module.exports = {
  entry: './src/index.js', // The entry point of your application
  output: {
    filename: 'bundle.js', // Name of the output file
    path: path.resolve(__dirname, 'dist') // Directory for the output
  },
  mode: 'production', // Mode: development or production
  
  module: {
  rules: [
    {
      test: /\.node$/,
      use: "node-loader" // Use `node-loader` to handle `.node` files
    },
     {
       test: /\.js$/,
       parser: {
         requireEnsure: false,
       },
     },
   ],
},
resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      buffer: require.resolve('buffer/'),
      "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "util": false,
      "stream": require.resolve("stream-browserify"),
      "fs": false,
      "snappy": false,
      "kerberos": false,
      "mongodb-client-encryption": false,
    //   require.resolve("mongodb-client-encryption"),
      "aws4": false,
      "@mongodb-js/zstd": require.resolve("@mongodb-js/zstd")



    }
  },
  target: "node",

};