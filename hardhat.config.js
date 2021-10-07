require('dotenv').config();

require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: 'kovan',
  networks: {
    kovan: {
      url: process.env.PROVIDER_URL_KOVAN,
      accounts: [process.env.PRIVATE_KEY_KOVAN]
    }
  }
};
