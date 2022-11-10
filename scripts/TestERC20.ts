import { ethers } from "hardhat";

const MINTER_ROLE_CODE = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';

async function main() {
    const accounts = await ethers.getSigners();
    const tokenContractFactory = await ethers.getContractFactory("MyToken");
    const tokenContract = await tokenContractFactory.deploy();
    await tokenContract.deployed();
    console.log(`Contract deployed at ${tokenContract.address}`);

    // sending a transaction
    const myBalance = await tokenContract.balanceOf(accounts[0].address);
    console.log(`my balance is: ${myBalance.toString()} decimals`);
    const tx = await tokenContract.connect(accounts[0]).transfer(accounts[1].address, 10);

    //Giving Role
    const roleTx = await tokenContract.grantRole(MINTER_ROLE_CODE, accounts[2].address);
    await roleTx.wait();
    const account2Balance = await tokenContract.balanceOf(accounts[0].address);
    console.log(`account 2 balance is: ${account2Balance.toString()} decimals`);

    // Minting Tokens 
    const mintTx = await tokenContract.connect(accounts[2]).mint(accounts[1].address, 1);
    await mintTx.wait();
}

main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})