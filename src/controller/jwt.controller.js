import { vaidarPartesUsuario } from "../schema/esquemas.js";
import { SALT_ROUNDS } from "../config.js";
import jwt from 'jsonwebtoken';

export class verificacioController {
    constructor ({modelJwt}){
        this.modelJwt = modelJwt;
    }

    register = async(req,res) =>{
        try {
            const vali = vaidarPartesUsuario(req.body);
            if(!vali.success){
                return res.status(400).json({message: 'error al validar datos del register'})
            }
            const user = await this.modelJwt.registerUser(vali.data);

            res.status(200).send({user});
        } catch (error) {
            res.status(500).json({message : 'error al registrar user', error: error.message});        
        }
    }


    login = async (req,res) =>{
        try {
            const vali = vaidarPartesUsuario(req.body);
            if(!vali.success){
                return res.status(400).json({message: 'error al validar datos del login'})
            }

            const user = await this.modelJwt.loginUser(vali.data);

            if(!user){ throw new Error('no se encontro el usuario')}

            const token = jwt.sign({
             id : user.id , nombre: user.nombre, apellido : user.apellido },
             SALT_ROUNDS,
            { expiresIn: '72h'})

            res
            .cookie('access_token',token, {
                httpOnly: true, 
                sameSite : 'strict', 
                secure : process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 72
            }) 

            res.send({user,token})
        } catch (error) {
            console.error("Error en el login:", error);
            res.status(500).json({ message: 'error al logear user', error: error.message });
        }
    }
} 