import { json } from 'express';
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

    createCita = async (req,res) =>{
        try {
            const vali = validarCita(req.body);
            if(!vali.success){
                return res.status(404).json({error :JSON.parse(vali.error.message)})
            }

            const result = await this.citaModel.crearCitas(vali.data);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al crear citas', error: error.message});
        }
    }

    updateCita = async (req,res) =>{
        const {id} = req.params;
        try {
            const vali = validarPartesCita(req.body);
            if(!vali.success){
                return res.status(404).json({error :JSON.parse(vali.error.message)})
            }

            const result = await this.citaModel.actualizarCitas(vali.data , id);
            if(!result) {
                return res.status(404).json({message : 'no se encontro la cita'});
            }
            res.status(200).json({message : "se actualizo la cita"});
        } catch (error) {
            res.status(500).json({message : 'error al actualizar citas', error: error.message});
        }
    }

    deleteCita = async (req,res) =>{
        const {id} = req.params;
        try {
            const result = await this.citaModel.eiminarCitas(id);
            if(!result) {return res.status(404).json({message : "no se encontro el medico"})}
            res.status(201).json({message: 'se elimino la cita'});
        } catch (error) {
            res.status(500).json({message : 'error al eliminar citas', error: error.message});
        }
    }
}