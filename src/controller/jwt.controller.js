import { vaidarPartesUsuario } from "../schema/esquemas.js";
import {  SECRET_JWT_KEY } from "../config.js";
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
             SECRET_JWT_KEY,
            { expiresIn: '48h'})

            res
            .cookie('access_token',token, {
                httpOnly: true, 
                sameSite : 'strict', 
                secure : process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 48
            }) 

            res.send({user,token})
        } catch (error) {
            console.error("Error en el login:", error);
            res.status(500).json({ message: 'error al logear user', error: error.message });
        }
    }

    protected = async (req, res) => { 
        try {
            if (!req.user) {  
                return res.status(401).json({ message: "Acceso denegado" });
            }
    
            res.status(200).json({
                message: "Ruta protegida accedida con éxito",
                user: req.user
            });
        } catch (error) {
            res.status(500).json({ message: "Error en la ruta protegida", error: error.message });
        }
    };

    logout = async (req,res) =>{
        res
        .clearCookie('access_token')
        .send('sesion cerrada')
    }
} 