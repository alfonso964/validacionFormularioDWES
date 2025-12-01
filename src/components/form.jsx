'use client'
import { realAction } from "@/lib/actions";
import { useActionState, useEffect } from "react";
import { CircleAlert, RefreshCcw } from 'lucide-react'
import { toast } from "sonner";

function Formulario() {
    const [state, action, pending] = useActionState(realAction, {})

    useEffect(() => {
        if (state.error) toast.error(state.error)
        if (state.success) toast.success(state.success)
    }, [state])

    return (
        <form action={action} className="my-20 border-2 p-4 flex flex-col gap-2">
            <h1 className="text-center text-xl">Formulario</h1>

            {/* Nombre */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="nombre">Nombre (2-8 letras):</label>
                <input id="nombre" name="nombre" className="ring-2" defaultValue={state.payload?.get("nombre") || ""} />
            </div>
            {state.issues?.nombre && <div className="text-sm font-medium text-red-600 bg-red-50 rounded-md flex items-center border">
                <CircleAlert className="inline m-2 size-4" /> {state.issues.nombre}
            </div>}

            {/* Edad */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="edad">Edad (16-70):</label>
                <input type='number' id="edad" name="edad" className="ring-2" defaultValue={state.payload?.get("edad") || ""} />
            </div>
            {state.issues?.edad && <div className="text-sm font-medium text-red-600 bg-red-50 rounded-md flex items-center border">
                <CircleAlert className="inline m-2 size-4" /> {state.issues.edad}
            </div>}

            {/* Email */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="email">Email:</label>
                <input type='email' id="email" name="email" className="ring-2" defaultValue={state.payload?.get("email") || ""} />
            </div>
            {state.issues?.email && <div className="text-red-600 text-sm">{state.issues.email}</div>}

            {/* Teléfono */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="telefono">Teléfono (6/7/9 + 8 dígitos):</label>
                <input type='tel' id="telefono" name="telefono" className="ring-2" defaultValue={state.payload?.get("telefono") || ""} />
            </div>
            {state.issues?.telefono && <div className="text-red-600 text-sm">{state.issues.telefono}</div>}

            {/* Fecha */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="fecha">Fecha (desde 2024, no futura):</label>
                <input type="date" id="fecha" name="fecha" className="ring-2" defaultValue={state.payload?.get("fecha") || new Date().toISOString().split('T')[0]} />
            </div>
            {state.issues?.fecha && <div className="text-red-600 text-sm">{state.issues.fecha}</div>}

            {/* Comentario */}
            <div className="flex justify-between px-4 py-2 rounded-md bg-indigo-100">
                <label htmlFor="comentario">Comentario (10-500 caracteres):</label>
                <textarea id="comentario" name="comentario" className="ring-2" defaultValue={state.payload?.get("comentario") || ""} />
            </div>
            {state.issues?.comentario && <div className="text-red-600 text-sm">{state.issues.comentario}</div>}

            <button disabled={pending} className="disabled:bg-slate-600 bg-blue-600 text-white rounded-lg py-2">
                {pending ? <RefreshCcw className="inline animate-spin size-4" /> : 'Enviar'}
            </button>
        </form>
    );
}

export default Formulario;