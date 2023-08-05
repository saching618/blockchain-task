import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { CommonControler } from './src/controller/common.controller';
import { TransactionController } from './src/controller/transaction.controller';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.get('/', async (req: Request, res: Response) => {
    try {
        const response = await CommonControler.testServer(req,res);
        res.status(response.code).json(response.data);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({ message: error})
    }
  
});
app.post('/transaction', async (req: Request, res: Response) => {
    try {
        const response = await TransactionController.createTransaction(req,res);
        res.status(response.code).json(response.data);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({ message: error})
    }
});
app.get('/balance', async (req: Request, res: Response) => {
    try {
        const response = await TransactionController.checkBalance(req,res);
        res.status(response.code).json(response.data);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({ message: error})
    }
});
app.get('/transaction-list', async (req: Request, res: Response) => {
    try {
        const response = await TransactionController.getTransactionList(req,res);
        res.status(response.code).json(response.data);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json({ message: error})
    }
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});