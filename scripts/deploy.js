const hre = require('hardhat');
const inquirer = require('inquirer');
const { getDeployment, storeDeployment } = require('./utils/deployments');
const { getSigner } = require('./utils/signer');

async function main() {
  const signer = await getSigner();

  const deployment = getDeployment();
  if (deployment.Randomizer !== '') {
    const { confirmation } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmation',
        message: `Randomizer is already deployed at ${deployment.Randomizer}. Do you wish to deploy a new version?`,
      },
    ]);

    if (!confirmation) {
      console.log('Deployment cancelled.');

      process.exit(0);
    }
  }

  console.log(`Deploying Randomizer on ${hre.network.name} with ${signer.address}`);

  const factory = await hre.ethers.getContractFactory('Randomizer');
  const Randomizer = await factory.deploy();
  await Randomizer.deployed();

  console.log(`Randomizer deployed at ${Randomizer.address}`);
  deployment.Randomizer = Randomizer.address;

  storeDeployment(deployment);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
