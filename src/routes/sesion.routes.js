import { Router } from "express";
import { verificacioController } from "../controller/jwt.controller.js";
import { autenticar } from "../middlewares/autenticacion.js";

export const crearSesion = ({modelJwt}) => {
    const router = Router();

    const sesionValidada = new verificacioController({modelJwt});

    router.post('/register',autenticar,sesionValidada.register);
    router.post('/login',autenticar,sesionValidada.login);
    router.get('/logout',sesionValidada.logout);

    return router;
}