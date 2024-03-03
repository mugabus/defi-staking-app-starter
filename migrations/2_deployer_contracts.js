const RWD = artifacts.require('RWD');
const Tether = artifacts.require('Tether');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {
    try {
        // Deploy Tether token
        await deployer.deploy(Tether);
        const tether = await Tether.deployed();

        // Deploy RWD token
        await deployer.deploy(RWD);
        const rwd = await RWD.deployed();

        // Deploy DecentralBank contract
        await deployer.deploy(DecentralBank, rwd.address, tether.address);
        const decentralbank = await DecentralBank.deployed();

        // Transfer initial tokens to DecentralBank
        await rwd.transfer(decentralbank.address, '1000000000000000000');

        // Transfer initial tokens to an account (for testing purposes)
        await tether.transfer(accounts[1], '1000000000000000000');

        console.log("Deployment completed successfully!");
    } catch (error) {
        console.error("Error during deployment:", error);
    }
};
