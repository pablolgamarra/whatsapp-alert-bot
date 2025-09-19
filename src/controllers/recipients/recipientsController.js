import { getRecipients } from "../../data/dao/dao.js";

export const recipientsController = {
    async getAll(req, res, next) {
        try{
            const filter = req.query.filter;
            const allRecipients = await getRecipients(filter);
            return res.status(200).json(allRecipients);
        }catch(e){
            next(e);
        }
    },

    async getById(req, res, next) {
        try{
            const id = req.params.id;
            const filter = ` WHERE t1.id = ${id}`
            const allRecipients = await getRecipients(filter);
            return res.status(200).json(allRecipients[0]);
        }catch(e){
            next(e);
        }
    },
}