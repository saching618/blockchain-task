
import { throws } from 'assert';
import { Request, Response } from 'express';


const testServer = async (req: Request, res: Response) => {
    try {
        const data = {
            Controller: "CommonControler",
            method: "test Server"
        }
        return { code: 200, data };
    }
    catch (error) {
        return { code: 500, error };
    }
}




export const CommonControler = {
    testServer
};