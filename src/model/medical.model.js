import { connection } from "../db.js";

export class modeloMedical{
    static  obtenerMedicos  = async ()=> {
        try {
            const [result] = await connection.query
            (`SELECT BIN_TO_UUID(medico_id) AS id, nombre, apellido, edad , email , password FROM medicos `)
            return result;  
        } catch (error) {
            console.error('error en el obtenerMedicos - modelo',error);
         }                               
    } 

    static crearMedicos = async ({nombre, apellido, edad , email , password}) =>{
       try {
        const [result] = await connection.query
        (`INSERT INTO medicos(nombre, apellido, edad , email , password) values(?,?,?,?,?)`
            ,[nombre,apellido,edad,email,password])
        return result;
       } catch (error) {
        console.error('error en el crearMedicos - modelo',error);
       }
    }

    static actualizarMedicos = async ({nombre, apellido, edad },medico_id) =>{
       try {
            const [result] = await connection.query
            ('UPDATE medicos SET nombre = ?, apellido = ? , edad = ? WHERE medico_id = UUID_TO_BIN(?)',[nombre,apellido,edad,medico_id]);
          if(result.affectedRows === 0){ return null}

           const [rows] = await connection.query
            ('SELECT BIN_TO_UUID(medico_id) AS id, nombre, apellido, edad , email , password FROM medicos WHERE medico_id = UUID_TO_BIN(?)',[medico_id])
        
        return rows[0];   
       } catch (error) {
         console.error('error en el actualizarMedicos - modelo',error);
       }
    }


    static eliminarMedicos = async (medico_id) =>{
        try {
            const [result] =  await connection.query('DELETE  from medicos WHERE medico_id = UUID_TO_BIN(?)',[medico_id]);
            if(result.affectedRows === 0){ return null}
            return result;
        } catch (error) {
         console.error('error en el eliminarMedicos - modelo',error);
        }
    }
}