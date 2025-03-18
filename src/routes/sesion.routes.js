import { Router } from "express";
import { verificacioController } from "../controller/jwt.controller.js";
import { autenticar } from "../middlewares/autenticacion.js";

export const crearSesion = ({modelJwt}) => {
    const router = Router();

    const sesionValidada = new verificacioController({modelJwt});

    router.post('/register',sesionValidada.register);
    router.post('/login',sesionValidada.login);
    router.get('/logout',sesionValidada.logout);

    router.get('/protected',autenticar , sesionValidada.protected)

    return router;
}