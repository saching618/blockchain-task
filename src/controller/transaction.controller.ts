import {Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import { Block, Blockchain, Transaction } from '../service/simpleBlockcahin';
import { TransactionReqObj } from '../interface/interface';
import { FILE_NAME, MESSAGE } from '../config/config';

dotenv.config();
const fileName = FILE_NAME;

const  checkFileExists =  async (file:string)=>{
    return fs.promises.access(file, fs.constants.F_OK)
             .then(() => true)
             .catch(() => false)
}

const getTransactionList = async(req: Request,res: Response) => {
    try{
        let address:string = req.body.address !== undefined ? req.body.address: "";
        let data:any = {
            message:MESSAGE.SUCCESS,
            address: address,
            List: []
        };
        if(address === "" || undefined){
            data.message = MESSAGE.ADDRESS_IS_MISSING;
            return {code:400,data}
        }
        const blockChainObj = new Blockchain();
        const isFileExists:boolean = await checkFileExists(fileName);
        let blockData:Block[] = [];
        if(isFileExists){
            const fileData:string = fs.readFileSync(fileName,{ encoding: 'utf8', flag: 'r' });
            blockData = JSON.parse(fileData);
            blockChainObj.chain = blockData;
            data.List = blockChainObj.getAllTransactions(address);
            
        } else {
            data.message = MESSAGE.DATA_NOT_EXIST;
            return {code:200,data};
        }
        return {code:200,data};
    }
    catch(error){
        console.log(error);
        return {code:500,error};
    }
}

const checkBalance = async(req: Request,res: Response)=> {
    try{
        let address:string = req.body.address !== undefined ? req.body.address: "";
        const data = {
            message:MESSAGE.SUCCESS,
            address: address,
            balance:0
        };
        if(address === "" || undefined){
            data.message = MESSAGE.ADDRESS_IS_MISSING;
            return {code:400,data}
        }
        const blockChainObj = new Blockchain();
        const isFileExists:boolean = await checkFileExists(fileName);
        let blockData:Block[] = [];
        if(isFileExists){
            const fileData:string = fs.readFileSync(fileName,{ encoding: 'utf8', flag: 'r' });
            blockData = JSON.parse(fileData);
            blockChainObj.chain = blockData;
            const balance:number = blockChainObj.getBalance(address);
            data.balance = Number(balance.toFixed(3));
        } else {
            data.message = MESSAGE.DATA_NOT_EXIST;
            return {code:200,data};
        }
        return {code:200,data};
    }
    catch(error){
        console.log(error);
        return {code:500,error};
    }
}

const createTransaction = async(req: Request,res: Response)=> {
    try{
        let fromAddress:string = req.body.fromAddress !== undefined ? req.body.fromAddress: "";
        let toAddress:string = req.body.toAddress !== undefined ? req.body.toAddress: "";
        let amount:number = req.body.amount !== undefined ? req.body.amount: -1;

        const val: TransactionReqObj = {
            fromAddress,
            toAddress,
            amount
        }
        const data = {
            message:MESSAGE.SUCCESS,
            fromAddress: val.fromAddress,
            toAddress: val.toAddress,
            amount: val.amount
        };

        if(data.fromAddress === "" || data.fromAddress === undefined){
            data.message = MESSAGE.SENDER_ADDRESS_IS_MISSING;
            return {code:400,data}
        }
        if(data.toAddress === "" || data.toAddress === undefined){
            data.message = MESSAGE.RECEVIER_ADDRESS_IS_MISSING;
            return {code:400,data}
        }
        if(data.fromAddress === data.toAddress){
            data.message = MESSAGE.SENDER_AND_RECEIVER_ADDRESS_SHOULD_NOT_BE_SAME;
            return {code:400,data}
        }
        if(data.amount < 0 ){
            data.message = MESSAGE.AMOUNT_SHOULD_NOT_BE_LESS_THAN_ZERO;
            return {code:400,data}
        }

        
        
        try {
            const blockChainObj = new Blockchain();
            const isFileExists:boolean = await checkFileExists(fileName);
            let data:Block[] = [];
            if(!isFileExists){
                const tObj = new Transaction(val.fromAddress, val.toAddress, val.amount);
                blockChainObj.addTransaction(tObj);
                data = blockChainObj.chain;
                // data.push(blockChainObj.chain[0]);
                // data.push(blockChainObj.chain[1]);
            } else {
                const fileData:string = fs.readFileSync(fileName,{ encoding: 'utf8', flag: 'r' });
                data = JSON.parse(fileData);
                blockChainObj.chain = data;
                const tObj = new Transaction(val.fromAddress, val.toAddress, val.amount);
                blockChainObj.addTransaction(tObj);
                data = blockChainObj.chain;
            }
            fs.writeFileSync(fileName, JSON.stringify(data)); 
        } catch (err) {
            console.error(err);
        }
        return {code:200,data};
    }
    catch(error){
        console.log(error);
        return {code:500,error};
    }
}




export const TransactionController = {
    getTransactionList,
    checkBalance,
    createTransaction
}