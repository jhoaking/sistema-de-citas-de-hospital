import { validarUsuario,vaidarPartesUsuario } from "../schema/esquemas.js";

export class medicalController {
    constructor ({modeloMedical}) {
        this.modeloMedical = modeloMedical
    }

    getAll = async (req,res) =>{
        try {
        const result = await this.modeloMedical.obtenerMedicos();
           res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al obtener medicos', error: error.message});
        }
    }

    create = async (req,res) =>{
        const validar = validarUsuario(req.body);
        try {
            if(!validar.success){
                return res.status(400).json({message : 'error en la validacion de datos'})
            }
    
            const result = await this.modeloMedical.crearMedicos(validar.data);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al crear medicos', error: error.message});
        }
    }

    delete = async (req,res) =>{
        const {id} = req.params;
        try {
            const result = await this.modeloMedical.eliminarMedicos(id);
            if(!result) {return res.status(404).json({message : "no se encontro el medico"})}
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al eliminar medicos', error: error.message})
        }
    }

    update = async (req,res) =>{
        const {id } = req.params;
        try {
            const vali = vaidarPartesUsuario(req.body);
            if(!vali.success){
                return res.status(404).json({error :JSON.parse(vali.error.message)})
            }
            
            const result = await this.modeloMedical.actualizarMedicos(vali.data, id)
            if(!result) {
                return res.status(404).json({message : 'no se encontro el medico'});
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al actualizar medicos', error: error.message});
        }

    }
}