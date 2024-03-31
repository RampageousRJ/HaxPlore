/*const ethers = require('ethers');
require('dotenv').config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const {abi} = require("./artifacts/contracts/contractApi.sol/contractApi.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const express = require('express');
const app = express();
app.use(express.json());


export const storeRecord=async(req,res)=>{
    try {
        const {bookingId,transactionId} = req.body;
        const tx = await contractInstance.setRecord(bookingId,transactionId);
        await tx.wait();
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const confirmBooking=(req,res)=>{
    res.json({success:true})
}

export const refundMoney=(req,res)=>{
    res.json({success:true})
}
*/