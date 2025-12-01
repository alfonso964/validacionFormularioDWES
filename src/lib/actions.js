'use server'
import { z } from "zod";

const schema = z.object({
    id: z.union([z.coerce.number(), z.string().nullish()]),
    
    // NUEVAS VALIDACIONES:
    nombre: z.string().trim()
        .min(2, "Debe tener al menos 2 letras")      // ← ANTES: min(1)
        .max(8, "Máximo 8 letras permitidas"),       // ← ANTES: max(5)
    
    edad: z.coerce.number()
        .min(16, "La edad mínima debe ser 16 años")  // ← ANTES: min(18)
        .max(70, "La edad máxima debe ser 70 años"), // ← ANTES: max(65)
    
    telefono: z.string().trim()
        .regex(/^[679][0-9]{8}$/, "Escribe 9 dígitos, siendo el primero 6,7 o 9"),
        // ↑ ANTES: /[678]{1}[0-9]{8}/ ↑
    
    email: z.string().email({ message: "Email no válido" }),
    
    fecha: z.coerce.date()
        .min(new Date("2024-01-01"), "La fecha debe ser posterior al 1 de enero 2024")
        .max(new Date(), "La fecha no puede ser futura"), // ← ANTES: hasta 31/12/2024
    
    comentario: z.string()
        .min(10, "El comentario debe tener al menos 10 caracteres") // ← NUEVO
        .max(500, "Máximo 500 caracteres permitidos")               // ← NUEVO
        .optional()
});

function validate(formData) {
    const datos = Object.fromEntries(formData.entries());
    return schema.safeParse(datos);
}

export async function realAction(prevState, formData) {
    const result = validate(formData);
    
    if (!result.success) {
        const simplified = result.error.issues.map(issue => [issue.path[0], issue.message]);
        const issues = Object.fromEntries(simplified);
        return { issues, payload: formData };
    }

    try {
        console.log('Datos válidos:', result.data);
        return { success: '¡Formulario enviado correctamente!' };
    } catch (error) {
        return { error: 'Error del servidor' };
    }
}