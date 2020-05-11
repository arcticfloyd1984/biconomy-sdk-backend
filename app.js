const Biconomy = require("@biconomy/mexa");
const ethers = require('ethers');
const Web3 = require('web3');
const providerUrl = 'https://ropsten.infura.io/v3/0c9ee86cdadf410abb4d6eb1f134a97b';
const biconomy = new Biconomy(new Web3.providers.HttpProvider(providerUrl), { dappId: '5ead5154b904e055ca1a794a', apiKey: 'c4jqSXD-2.1facdab2-fd80-43ed-8c09-5571dd4bcafb', debug: true });

const web3 = new Web3(biconomy);

const address = '0xc180F90Ff4bc68E9Af90a5F933eE08dee3d50C99';
const privateKey = process.env.PRIVATE_KEY_1;
const contractAddress = "0xAD033986FEA5e7058919c90c72e80eAc902BAdDe";
const contractABI = [{
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x06fdde03"
    },
    {
        "constant": true,
        "inputs": [{
            "name": "_increment",
            "type": "uint256"
        }],
        "name": "variableName",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x97c602d6"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "_name",
            "type": "string"
        }],
        "name": "changeName",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x5353a2d8"
    }
];
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function sendTransactionToBlockchain() {
    let txParams = {
        "from": address,
        "gasLimit": web3.utils.toHex(23000),
        "to": contractAddress,
        "value": "0x0",
        "data": contract.methods.changeName("hello").encodeABI()
    }

    const signedTx = await web3.eth.accounts.signTransaction(txParams, `${privateKey}`);

    let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, txHash) => {
        if (error) {
            return console.log(error);
        }
        console.log(txHash);
    })
}

sendTransactionToBlockchain();


/**
 * let txParams = {
    "from": address,
    "gasLimit": web3js.utils.toHex(210000),
    "to": contractAddress,
    "value": "0x0",
    "data": contract.methods.addRating(1, 5).encodeABI()
};

const signedTx = await web3.eth.accounts.signTransaction(txParams, `${privateKey}`);

let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, txHash)=>{
    if(error) {
        return console.error(error);
    }
    console.log(txHash);
});


    BICONOMY_DAPP_ID: '5e99a3c6667350123f4de8f2',
    BICONOMY_API_KEY: 'c4jqSXD-2.1facdab2-fd80-43ed-8c09-5571dd4bcafb',
 */