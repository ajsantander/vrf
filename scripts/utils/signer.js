async function getSigner() {
  const signers = await hre.ethers.getSigners();

  return signers[0];
}

module.exports = {
  getSigner,
};
