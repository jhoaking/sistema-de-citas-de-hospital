import { Router } from "express";
import { citaController } from "../controller/citas.controller.js";

export const createCita = ({citaModel}) =>{

    const router = Router();

    const citaValidada = new citaController ({citaModel});

    router.get('/',citaValidada.getAll);
    router.post('/',citaValidada.createCita);
    router.put('/:id',citaValidada.updateCita);
    router.delete('/:id',citaValidada.deleteCita);

    return router;
}