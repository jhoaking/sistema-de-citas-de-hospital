import { Router } from "express";
import { verificacioController } from "../controller/jwt.controller.js";

export const crearSesion = ({modelJwt}) => {
    const router = Router();

    const sesionValidada = new verificacioController({modelJwt});

    router.post('/register',sesionValidada.register)
    router.post('/login',sesionValidada.login)

    return router;
}