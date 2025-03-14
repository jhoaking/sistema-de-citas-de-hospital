import z from 'zod';

export const esquemaUsuario = z.object({
    nombre: z.string().optional(),
    apellido: z.string().min(1),
    edad : z.number().int().positive(),
    email : z.string().email().min(1),
    password: z.string().min(6)
})

//validaciones de la base de datos
export const validarUsuario = (input) =>{
    return esquemaUsuario.safeParse(input)
}

// validacion al hacer el put
export const vaidarPartesUsuario = (input) =>{
    return esquemaUsuario.partial().safeParse(input)
}