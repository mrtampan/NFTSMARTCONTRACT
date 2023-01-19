const contract = require('../artifacts/contracts/Laknat.sol/Laknat.json');
const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

const Web3 = require('web3');
const web3 = new Web3('ws://localhost:8545');
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const ACCOUNT_PUBLIC_KEY = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
const ACCOUNT_PRIVATE_KEY =
  '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';
const ACCOUNT_OWNER_PUBLIC_KEY = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const ACCOUNT_OWNER_PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

async function mintNft() {
  const nonce = await web3.eth.getTransactionCount(
    ACCOUNT_PUBLIC_KEY,
    'latest'
  );
  const tx = {
    from: ACCOUNT_PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 1000000,
    data: nftContract.methods.mint(5).encodeABI(),
  };
  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    ACCOUNT_PRIVATE_KEY
  );
  const transactionReceipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction
  );
  console.log(`Transaction Receipt: ${JSON.stringify(transactionReceipt)}`);
}

async function getBalanceNft() {
  const balanceOf = await nftContract.methods
    .balanceOf(ACCOUNT_PUBLIC_KEY)
    .call();
  console.log(`Total nft from address ${ACCOUNT_PUBLIC_KEY} is ${balanceOf}`);
}

async function setBaseURI() {
  const nonce = await web3.eth.getTransactionCount(
    ACCOUNT_OWNER_PUBLIC_KEY,
    'latest'
  );
  const tx = {
    from: ACCOUNT_OWNER_PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 1000000,
    data: nftContract.methods
      .setBaseURI('https://mrtampan.github.io/')
      .encodeABI(),
  };
  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    ACCOUNT_OWNER_PRIVATE_KEY
  );
  const transactionReceipt = await web3.eth.sendSignedTransaction(
    signedTx.rawTransaction
  );
  console.log(`Transaction Receipt: ${JSON.stringify(transactionReceipt)}`);
}

async function getBaseURI() {
  const baseURI = await nftContract.methods.tokenURI(1).call();
  console.log(`Total URI is ${baseURI}`);
}

// mintNft();
// getBalanceNft();
// setBaseURI();
getBaseURI();
