# Chainlink VRF (random number) example

See https://docs.chain.link/docs/get-a-random-number/

### Set up

1) Clone repo =P
2) `npm i`
3) `cp .env.sample .env`
4) Populate .env with a Kovan provider and a private key that has Kovan ETH

### Testing

1) Run `npx hardhat run scripts/deploy.js`
2) Run `npx hardhat run scripts/get-random-number.js`
3) (in another terminal) Run `npx hardhat run scripts/monitor-random-numbers.js`
4) Repeat 2 ad infinitum
