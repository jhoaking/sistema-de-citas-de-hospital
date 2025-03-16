import { connection } from "../db.js";

export class citaModel {
    static obtenerCitas = async () =>{
       try {
        const [result] = await connection.query
        (`SELECT BIN_TO_UUID(cita_id) AS cita_id,descripcion, BIN_TO_UUID(user_id) AS paciente_id,
             BIN_TO_UUID(medico_id) AS medico_id FROM citas`);
        return result;
       } catch (error) {
        console.error('error en el obtener citas - modelo',error);
       }
    }
}