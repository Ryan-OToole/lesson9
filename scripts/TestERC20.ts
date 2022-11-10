import { ethers } from "hardhat";

async function main() {
    const tokenContractFactory = await ethers.getContractFactory("MyToken");
    const tokenContract = await tokenContractFactory.deploy();
    await tokenContract.deployed();
    console.log(`Contract deployed at ${tokenContract.address}`);

    // sending a transaction
    const [name, symbol, decimals, totalSupply] = await Promise.all([
        tokenContract.name(), 
        tokenContract.symbol(), 
        tokenContract.decimals(),
        tokenContract.totalSupply(),
    ]);
    const accounts = await ethers.getSigners();
    const myBalance = await tokenContract.balanceOf(accounts[0].address);
    console.log(`my balance is: ${myBalance.toString()} decimals`);
}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})