import { getQR } from "../../store/qr.js";

export const qrController = {
    async getQrCode(req, res, next){
        try{
            const { qr } = getQR();
            return res.status(200).json({qr: qr})
        }catch(e){
            next(e);
        }
    },

    async getQRCount(req, res, next){
        try{
            const { qrCount } = getQR();
            return res.status(200).json({ count: qrCount });
        }catch(e){
            next(e);
        }
    }
}