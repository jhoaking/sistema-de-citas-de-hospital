import {validarCita,validarPartesCita} from '../schema/cita.esquema.js'

export class citaController {
    constructor ({citaModel}) {
        this.citaModel = citaModel;
    }

    getAll = async (req,res) =>{
        try {
            const result = await this.citaModel.obtenerCitas();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al obtener citas', error: error.message});
        }
    }
}