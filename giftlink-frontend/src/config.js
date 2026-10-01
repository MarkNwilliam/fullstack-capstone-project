const config = {
  backendUrl: process.env.REACT_APP_BACKEND_URL,
  frontendUrl: process.env.REACT_APP_FRONTEND_URL || '',
};

console.log(`backendUrl in config.js: ${config.backendUrl}`);
console.log(`frontendUrl in config.js: ${config.frontendUrl}`);
export { config as urlConfig };