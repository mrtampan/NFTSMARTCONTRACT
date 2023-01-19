const hrh = require('hardhat');

async function deploy() {
  const Laknat = await hrh.ethers.getContractFactory('Laknat');
  const laknat = await Laknat.deploy();

  await laknat.deployed();

  console.log(
    'Laknat berhasil dijalankan berikut ini token addressnya:',
    laknat.address
  );
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
