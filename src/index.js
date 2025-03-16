import express from 'express';
import {PORT} from './config.js';

import {createUsuario} from './routes/user.routes.js'
import { createMedico } from './routes/medical.routes.js';
import { createCita } from './routes/citas.routes.js';

import { modeloUsuario } from './model/user.model.js';
import { modeloMedical } from './model/medical.model.js';
import { citaModel } from './model/citas.model.js';

const app = express();
app.use(express.json())

app.use('/user',createUsuario({modeloUsuario}));
app.use('/medical',createMedico({modeloMedical}));
app.use('/citas',createCita({citaModel}));


app.listen(PORT, () => {
    console.log('server on port ', PORT);
    
})