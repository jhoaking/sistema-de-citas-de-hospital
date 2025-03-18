import jwt from 'jsonwebtoken';
import {SECRET_JWT_KEY} from '../config.js'



export const autenticar = ((req,res,next) =>{
   try {
    const token = req.cookies.access_token; 
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    const decoded = jwt.verify(token, SECRET_JWT_KEY); 
    req.user = decoded
    next()
   } catch (error) {
    console.error('El token ya expiró');
    return res.status(401).json({ message: 'Token inválido o expirado' });
   }
})