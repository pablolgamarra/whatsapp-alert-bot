import { getEndpoints, insertEndpoint, updateEndpoint } from "../../data/dao/dao.js";

export const endpointsController = {
    async getAll(req, res, next) {
        try{
            const filter = req.query.filter;
            const allEndpoints = await getEndpoints(filter);
            return res.status(200).json(allEndpoints);
        }catch(e){
            next(e);
        }
    },

    async getById(req, res, next) {
        try{
            const id = req.params.id;
            const filter = ` WHERE t1.id = ${id}`
            const allEndpoints = await getEndpoints(filter);
            return res.status(200).json(allEndpoints[0]);
        }catch(e){
            next(e);
        }
    },

    async create(req, res, next){
        try{
            const newEndpoint = req.body;
            if (!newEndpoint?.webhook_endpoint || !newEndpoint.recipients || newEndpoint.recipients.length < 0) {
                return res.status(400).json({ error: 'Incomplete body' });
            }
            const insertedEndpoint = await insertEndpoint(newEndpoint);
            return res.status(201).json(insertedEndpoint);            
        }catch(e){
            next(e);
        }
    },

    async update(req, res, next){
        try{
            const newEndpoint = req.body;
            if (!newEndpoint?.webhook_endpoint || !newEndpoint.recipients || newEndpoint.recipients.length < 0) {
                return res.status(400).json({ error: 'Incomplete body' });
            }
            const allEndpoints = await updateEndpoint(newEndpoint);
            return res.status(200).json(allEndpoints[0]);
        }catch(e){
            next(e);
        }
    },

    async delete(req, res, next){
         try {
            const endpointDelete = req.body;
            if (!endpointDelete?.webhook_endpoint || !endpointDelete.recipients) {
                return res.status(400).json({ error: 'Incomplete body' });
            }
            const deletedEndpoint = await deleteEndpoint(endpointDelete);
            return res.status(200).json(deletedEndpoint);
        } catch (e) {
        next(e);
        }
    }
}