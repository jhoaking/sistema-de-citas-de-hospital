import {connection} from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config.js';

export class modelJwt {
    static register = async ({nombre, apellido,email,pasword}) =>{
       try {
        const [rows] = await connection.query('SELECT * FROM users WHERE email = ?',[email]);
        if(rows.length > 0) {throw new Error('el usuario ya existe')}

        const hashedPassword  = await bcrypt.hash(pasword, Number(SALT_ROUNDS));
        await connection.query('INSERT INTO users(nombre, apellido,email,pasword) VALUES (?,?,?,?)',[nombre,apellido,email,hashedPassword]);

        const [newUser] = await connection.query
        ('SELECT BIN_TO_UUID(user_id) AS user_id,nombre, apellido,email,pasword WHERE email = ?',[email]);

        return newUser[0];
       } catch (error) {
        console.error('error al registrar usuarios - modelo',error);
       }
    }

    static login = async ({email,password}) =>{
        try {
            const [result] = await connection.query
            ('SELECT BIN_TO_UUID(user_id), nombre,apellido,email WHERE email = ?',[email])
            if(result.length > 0) {throw new Error('ya fuiste logeado')}

            const user = result[0];

            const compararPassword = await bcrypt.compare(password,user.password);
            if(!compararPassword){throw new Error('contraseña invalida')}

            return user;
        } catch (error) {
            console.error('error al registrar usuarios - modelo',error);
        }
    }
}