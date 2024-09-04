const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'http://localhost/moodle'; // Your Moodle server URL
const changeOrigin = true;

const proxy = createProxyMiddleware({
  target,
  changeOrigin,
  pathRewrite: { '^/api': '' },
});

module.exports = proxy;