const ethers = require('ethers');
require('dotenv').config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const { abi } = require("./artifacts/contracts/contractApi.sol/contractApi.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

/*const express = require('express');
const app = express();
app.use(express.json());
*/
const getOneRecord = async (req, res) => {   //http://localhost:3000/records/1
    try {
        const bookingId = req.params.id;
        const record = await contractInstance.getRecord(bookingId, { gasLimit: 1 * 10 ** 6 });
        res.status(200).json({ "transactionId": record });
    }
    catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

const getRecords = async (req, res) => {   //http://localhost:3000/records/
    try {
        const allRecords = await contractInstance.getAllRecords();
        const records = allRecords.map(record => ({
            bookingId: record.bookingId,
            transactionId: record.transactionId
        }))
        console.log(records)
        res.send(records);
    }
    catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};


const storeRecord = async (req, res) => {
    try {
        const { bookingId, transactionId } = req.body;
        const tx = await contractInstance.setRecord(bookingId.trim(), transactionId.trim(),{ gasLimit: 3 * 10 ** 4 });
        await tx.wait();
        res.json({ success: true })
    }
    catch (error) {
        res.status(500).json({ "Error": error.message });
    }
};

/*app.put('/records/:id', async (req, res) => {   //http://localhost:3000/records/1
    try {
        const id = req.params.id;
        const {name, price, quantity} = req.body;
        const tx = await contractInstance.updateRecord(id, name, price, quantity);
        await tx.wait();
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});*/

const deleteRecord = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const tx = await contractInstance.deleteRecord(bookingId);
        await tx.wait();
        res.json({ success: true })
    }
    catch (error) {
        res.status(500).json({ "error": error.message });
    }
};

/*const port = 3000;
app.listen(port, () => {
    console.log("API server is listening on port 3000")
})*/

module.exports = { storeRecord, getOneRecord, getRecords, deleteRecord }