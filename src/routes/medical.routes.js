import { Router } from "express";
import { medicalController } from "../controller/medical.controller.js";

export const  createMedico = ({modeloMedical}) =>{
    const router = Router();

    const mediValidado = new medicalController({modeloMedical});

    router.get('/',mediValidado.getAll);
    router.post('/',mediValidado.create);
    router.put('/:id',mediValidado.update);
    router.delete('/:id',mediValidado.delete);

    return router;
}