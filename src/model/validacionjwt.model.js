import {connection} from '../db.js';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config.js';

export class modelJwt {
    static registerUser = async ({nombre,edad, apellido,email,password}) =>{
       try {
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?',[email]);
        if(rows.length > 0) {throw new Error('el usuario ya existe')}

        const hashedPassword  = await bcrypt.hash(password, Number(SALT_ROUNDS));

        await connection.query('INSERT INTO users(nombre,edad, apellido,email,password) VALUES (?,?,?,?,?)',[nombre,edad,apellido,email,hashedPassword]);

        const [newUser] = await connection.query
        ('SELECT BIN_TO_UUID(user_id) AS user_id, nombre, apellido,email,password FROM users WHERE email = ?',[email]);

        return newUser[0];
       } catch (error) { 
        console.error('error al registrar usuarios - modelo',error);
       }
    }

    static loginUser = async ({email,password}) =>{
        try {
            const [result] = await connection.query
            ('SELECT BIN_TO_UUID(user_id), nombre,apellido,email, password FROM users WHERE email = ?',[email]);
            if(result.length === 0) {throw new Error('datos invalidos')}

            const user = result[0];

            if (!user.password) {
                throw new Error('Error: el usuario no tiene una contraseña registrada');
            }

           

            const compararPassword = await bcrypt.compare(password, user.password);
            if(!compararPassword){throw new Error('contraseña invalida')}

            delete user.password;
            return user;
        } catch (error) {
            console.error('error al logear usuarios - modelo',error);
        }
    }
}