/* eslint-disable no-console */
/**
 * This module will start the express server
 */

// import the express app
const webapp = require('./backend/controller/server');

const port = 8002;

webapp.listen(port, () => {
  console.log('Server running on port', port);
});
