import { getTenants } from '../../data/dao/dao.js';

export const tenantsController = {
	async getAll(req, res, next) {
		try {
			const filter = req.query.filter;
			const allTenants = await getTenants(filter);
			return res.status(200).json(allTenants);
		} catch (e) {
			next(e);
		}
	},
};
