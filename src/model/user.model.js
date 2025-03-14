
import { connection } from "../db.js";

export class modeloUsuario {
    static  obtenerUsuarios  = async ()=> {
    
            const [result] = await connection.query
            (`SELECT BIN_TO_UUID(user_id) AS id, nombre, apellido, edad , email , password FROM users `)
            return result;                                 
    } 

    static crearUsuarios = async ({nombre, apellido, edad , email , password}) =>{
        const [result] = await connection.query
        (`INSERT INTO users(nombre, apellido, edad , email , password) values(?,?,?,?,?)`
            ,[nombre,apellido,edad,email,password])
        return result;
    }

    static actualizarUsuario = async ({nombre, apellido, edad }) =>{
        const [result] = await connection.query
          ('UPDATE users SET nombre = ?, apellido = ? , edad = ? WHERE user_id = ?',[nombre,apellido,edad,user_id]);
        if(result.affectedRows === 0){ return null}

        const [rows] = await connection.query
           ('SELECT BIN_TO_UUID(user_id) AS id, nombre, apellido, edad , email , password FROM users WHERE user_id = ?',[user_id])
        
        return rows[0];   
    }


    static eiminarUsuario = async (user_id) =>{
        const [result] =  await connection.query('DELETE from users WHERE user_id =',[user_id]);
        
        return result.affectedRows > 0;
    }
}