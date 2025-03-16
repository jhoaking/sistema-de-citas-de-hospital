import { connection } from "../db.js";

export class citaModel {
    static obtenerCitas = async () =>{
       try {
        const [result] = await connection.query
        (`SELECT BIN_TO_UUID(cita_id) AS cita_id,descripcion, fecha_cita,BIN_TO_UUID(user_id) AS user_id,
             BIN_TO_UUID(medico_id) AS medico_id FROM citas`);
        return result;
       } catch (error) {
        console.error('error en el obtener citas - modelo',error);
       }
    }

    static crearCitas = async ({fecha_cita,descripcion,user_id,medico_id}) =>{
       try {
        const [result] = await connection.query
        ('INSERT INTO citas(fecha_cita,descripcion,user_id,medico_id) VALUES (?,?, UUID_TO_BIN(?), UUID_TO_BIN(?))',[fecha_cita,descripcion,user_id,medico_id])
        return result;
       } catch (error) {
        console.error('error en el crear citas - modelo',error);
       }
    }

    static actualizarCitas = async ({fecha_cita,descripcion, user_id}, cita_id) => {
       try {
        const [result] = await connection.query
        ('UPDATE citas SET fecha_cita = ? , descripcion = ? , user_id = UUID_TO_BIN(?)  WHERE cita_id = UUID_TO_BIN (?)'
         ,[fecha_cita,descripcion,user_id,cita_id]);

        if(result.affectedRows === 0){return null}
        
        const [rows] = await connection.query
         ('SELECT BIN_TO_UUID(cita_id) AS cita_id, fecha_cita,descripcion, BIN_TO_UUID(user_id) AS user_id FROM citas WHERE cita_id = UUID_TO_BIN(?)',
          [cita_id]);

         return rows[0]; 
       } catch (error) {
        console.error('error en el actualizar citas - modelo',error);
       }
    }

    static eiminarCitas = async (cita_id) =>{
        try {
            const [result] = await connection.query('DELETE FROM citas WHERE cita_id = UUID_TO_BIN(?)',[cita_id])
            if(result.affectedRows === 0){return null}
            return result
        } catch (error) {
            console.error('error en el eliminar citas - modelo',error);
        }
    }
}