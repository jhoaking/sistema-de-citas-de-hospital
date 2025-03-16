import { validarUsuario,vaidarPartesUsuario } from "../schema/esquemas.js";

export class usuarioController{
    constructor ({modeloUsuario})  {
        this.modeloUsuario = modeloUsuario;
    }

    getAll = async (req,res) =>{
        try {
        const result = await this.modeloUsuario.obtenerUsuarios();
           res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al obtener usuarios', error: error.message});
        }
    }

    create = async (req,res) =>{
        const validar = validarUsuario(req.body);
        try {
            if(!validar.success){
                return res.status(404).json({error :JSON.parse(vali.error.message)})
            }
    
            const result = await this.modeloUsuario.crearUsuarios(validar.data);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al crear usuarios', error: error.message});
        }
    }

    delete = async (req,res) =>{
        const {id} = req.params;
        try {
            const result = await this.modeloUsuario.eliminarUsuario(id);
            if(!result) {return res.status(404).json({message : "no se encontro el usuario"})}
            res.status(201).json({message: 'se elimino el usuario'});
        } catch (error) {
            res.status(500).json({message : 'error al eliminar usuarios', error: error.message})
        }
    }

    update = async (req,res) =>{
        const {id } = req.params;
        try {
            const vali = vaidarPartesUsuario(req.body);
            if(!vali.success){
                return res.status(404).json({error :JSON.parse(vali.error.message)})
            }
            
            const result = await this.modeloUsuario.actualizarUsuario(vali.data, id)
            if(!result) {
                return res.status(404).json({message : 'no se encontro el user'});
            }
            res.status(200).json({message : "se actualizo el user"});
        } catch (error) {
            res.status(500).json({message : 'error al actualizar usuarios', error: error.message});
        }

    }
}