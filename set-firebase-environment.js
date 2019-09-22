const writeJsonFile = require('write-json-file');

(async () => {
  await writeJsonFile('.firebaserc', {
    projects: {
      default: 'reiser-relief-test'
    }
  });
})();
