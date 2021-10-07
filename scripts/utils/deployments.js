const fs = require('fs');

const KOVAN_PATH = './deployments/kovan/deployments.json';

function getDeployment() {
  if (hre.network.name !== 'kovan') {
    throw new Error('Only kovan supported');
  }

  return JSON.parse(
    fs.readFileSync(KOVAN_PATH)
  );
}

function storeDeployment(data) {
  if (hre.network.name !== 'kovan') {
    throw new Error('Only kovan supported');
  }

  fs.writeFileSync(KOVAN_PATH, JSON.stringify(data, null, 2));
}

module.exports = {
  getDeployment,
  storeDeployment,
};
