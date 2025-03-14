
import { connection } from "../db.js";

export class modeloUsuario {
    static  obtenerUsuarios  = async ()=> {
    
        try {
            const [result] = await connection.query
            (`SELECT BIN_TO_UUID(user_id) AS id, nombre, apellido, edad , email , password FROM users `)
            return result;  
        } catch (error) {
            console.error('error en el obtenerUsuarios - modelo',error);
         }                               
    } 

    static crearUsuarios = async ({nombre, apellido, edad , email , password}) =>{
       try {
        const [result] = await connection.query
        (`INSERT INTO users(nombre, apellido, edad , email , password) values(?,?,?,?,?)`
            ,[nombre,apellido,edad,email,password])
        return result;
       } catch (error) {
        console.error('error en el crearUsuarios - modelo',error);
       }
    }

    static actualizarUsuario = async ({nombre, apellido, edad },user_id) =>{
       try {
            const [result] = await connection.query
            ('UPDATE users SET nombre = ?, apellido = ? , edad = ? WHERE user_id = UUID_TO_BIN(?)',[nombre,apellido,edad,user_id]);
          if(result.affectedRows === 0){ return null}

           const [rows] = await connection.query
            ('SELECT BIN_TO_UUID(user_id) AS id, nombre, apellido, edad , email , password FROM users WHERE user_id = UUID_TO_BIN(?)',[user_id])
        
        return rows[0];   
       } catch (error) {
         console.error('error en el actualizarUsuarios - modelo',error);
       }
    }


    static eliminarUsuario = async (user_id) =>{
        try {
            const [result] =  await connection.query('DELETE  from users WHERE user_id = UUID_TO_BIN(?)',[user_id]);
            if(result.affectedRows === 0){ return null}
            return result;
        } catch (error) {
         console.error('error en el eliminarUsuarios - modelo',error);
        }
    }
}