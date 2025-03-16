import z from 'zod';

export const citasEsquema = z.object({
    fecha_cita : z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    descripcion: z.string().min(3),
    user_id:z.string().uuid(),
    medico_id: z.string().uuid()
})

export const validarCita = (input) => {
    return citasEsquema.safeParse(input);
}

export const validarPartesCita = (input) =>{
    return citasEsquema.partial().safeParse(input);
}