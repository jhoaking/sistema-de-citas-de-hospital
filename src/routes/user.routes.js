import { Router } from "express";
import { usuarioController } from "../controller/user.controller.js";


export const createUsuario = ({modeloUsuario}) =>{

    const router = Router();

    const validarUsuario = new usuarioController({modeloUsuario})

    router.get('/',validarUsuario.getAll)
    router.post('/',validarUsuario.create)
    router.put('/:id',validarUsuario.update)
    router.delete('/:id',validarUsuario.delete)
    
   return router; 
}