import { getChatTypes } from "../../data/dao/dao.js";

export const chatTypesController = {
    async getAll(req, res, next) {
        try{
            const filter = req.query.filter;
            const allChatTypes = await getChatTypes(filter);
            return res.status(200).json(allChatTypes);
        }catch(e){
            next(e);
        }
    },

    async getById(req, res, next) {
        try{
            const id = req.params.id;
            const filter = ` WHERE id = ${id}`
            const allChatTypes = await getChatTypes(filter);
            return res.status(200).json(allChatTypes[0]);
        }catch(e){
            next(e);
        }
    },
}