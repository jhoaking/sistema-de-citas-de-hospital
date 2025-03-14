import express from 'express';
import {PORT} from './config.js';
import {createUsuario} from './routes/user.routes.js'
import { modeloUsuario } from './model/user.model.js';
const app = express();
app.use(express.json())

app.use('/user',createUsuario({modeloUsuario}))


app.listen(PORT, () => {
    console.log('server on port ', PORT);
    
})