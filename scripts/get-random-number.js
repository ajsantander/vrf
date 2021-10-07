const hre = require('hardhat');
const { getDeployment } = require('./utils/deployments');

async function main() {
  console.log(`Generating a random number on ${hre.network.name}...`);

  const deployment = getDeployment();
  if (!deployment.Randomizer || deployment.Randomizer === '') {
    throw new Error('Cannot find deployed Randomizer contract');
  }

  const Randomizer = await hre.ethers.getContractAt('Randomizer', deployment.Randomizer);
  console.log(`Using Randomizer deployed at ${Randomizer.address}`);

  const numRequests = await Randomizer.numberOfRequests();
  console.log(`Number of requests: ${numRequests}`);

  const canPay = await Randomizer.canPayForARequest();
  console.log(`Randomizer can pay for a request: ${canPay}`);
  if (!canPay) {
    throw new Error('Randomizer needs more link to pay for a random number request');
  }

  await _requestNewRandomNumber(Randomizer);
}

async function _requestNewRandomNumber(Randomizer) {
  const tx = await Randomizer.getRandomNumber();
  console.log(`> Transaction sent ${tx.hash}`);
  // console.log(tx);

  const receipt = await tx.wait();
  console.log('> Transaction mined');
  // console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
