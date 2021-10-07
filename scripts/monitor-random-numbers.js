const hre = require('hardhat');
const { getDeployment } = require('./utils/deployments');

async function main() {
  console.log(`Monitoring generated random numbers on ${hre.network.name}...`);

  const deployment = getDeployment();
  if (!deployment.Randomizer || deployment.Randomizer === '') {
    throw new Error('Cannot find deployed Randomizer contract');
  }

  const Randomizer = await hre.ethers.getContractAt('Randomizer', deployment.Randomizer);
  console.log(`Using Randomizer deployed at ${Randomizer.address}`);

  const numRequests = await Randomizer.numberOfRequests();
  console.log(`Number of requests: ${numRequests}`);

  for (let i = 0; i < numRequests; i++) {
    const requestId = await Randomizer.randomNumberRequestIds(i);
    const randomNumber = await Randomizer.randomNumbers(requestId);

    console.log(`Request ${i}, with id ${requestId}: ${randomNumber}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
