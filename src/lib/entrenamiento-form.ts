import { apiFetch, ApiError } from './api-client';

export interface EjercicioElegido {
    exerciseId: string;
    nombre: string;
    series: number;
    repeticiones: number;
    peso: number;
    completado: boolean;
    notaPersonal: string;
}

export interface ResultadoBusqueda {
    exerciseId: string;
    name: string;
    imageUrl?: string;
}

export function leerEjerciciosDeFormData(formData: FormData): EjercicioElegido[] {
    const ejercicios: EjercicioElegido[] = [];
    for (let i = 0; formData.has(`ej_${i}_exerciseId`); i++) {
        ejercicios.push({
            exerciseId: String(formData.get(`ej_${i}_exerciseId`)),
            nombre: String(formData.get(`ej_${i}_nombre`)),
            series: Number(formData.get(`ej_${i}_series`)),
            repeticiones: Number(formData.get(`ej_${i}_repeticiones`)),
            peso: Number(formData.get(`ej_${i}_peso`) ?? 0),
            completado: formData.get(`ej_${i}_completado`) === 'on',
            notaPersonal: String(formData.get(`ej_${i}_notaPersonal`) ?? ''),
        });
    }
    return ejercicios;
}

export interface FormularioEntrenamiento {
    fecha: string;
    hora: string;
    notasGenerales: string;
    q: string;
    ejerciciosElegidos: EjercicioElegido[];
    resultadosBusqueda: ResultadoBusqueda[];
    busquedaError: string | null;
    erroresValidacion: string[];
}

// Lanza ApiError cuando la búsqueda de ejercicios responde 401, para que la página
// pueda cerrar la sesión y redirigir a /login; el resto de errores se guardan en busquedaError.
export async function procesarFormularioEntrenamiento(formData: FormData, token: string): Promise<FormularioEntrenamiento> {
    const fecha = String(formData.get('fecha') ?? '');
    const hora = String(formData.get('hora') ?? '');
    const notasGenerales = String(formData.get('notasGenerales') ?? '');
    const q = String(formData.get('q') ?? '').trim();
    let ejerciciosElegidos = leerEjerciciosDeFormData(formData);

    if (formData.has('agregar')) {
        const raw = String(formData.get('agregar'));
        const separador = raw.indexOf('::');
        if (separador !== -1) {
            const exerciseId = raw.slice(0, separador);
            const nombre = raw.slice(separador + 2);
            if (exerciseId && !ejerciciosElegidos.some((e) => e.exerciseId === exerciseId)) {
                ejerciciosElegidos.push({
                    exerciseId,
                    nombre,
                    series: 3,
                    repeticiones: 10,
                    peso: 0,
                    completado: false,
                    notaPersonal: '',
                });
            }
        }
    }

    if (formData.has('quitar')) {
        const exerciseId = String(formData.get('quitar'));
        ejerciciosElegidos = ejerciciosElegidos.filter((e) => e.exerciseId !== exerciseId);
    }

    let resultadosBusqueda: ResultadoBusqueda[] = [];
    let busquedaError: string | null = null;

    if (formData.has('buscar') && q) {
        try {
            resultadosBusqueda = await apiFetch<ResultadoBusqueda[]>(
                `/api/ejercicios/buscar?q=${encodeURIComponent(q)}`,
                { token },
            );
        } catch (e) {
            if (e instanceof ApiError && e.statusCode === 401) throw e;
            busquedaError = e instanceof Error ? e.message : 'Error desconocido';
        }
    }

    const erroresValidacion: string[] = [];
    if (!fecha || isNaN(new Date(fecha).getTime())) erroresValidacion.push('La fecha no es válida');
    if (!hora) erroresValidacion.push('La hora es obligatoria');
    if (ejerciciosElegidos.length === 0) erroresValidacion.push('Debe incluir al menos un ejercicio');
    if (ejerciciosElegidos.some((e) => !Number.isFinite(e.series) || e.series < 1)) {
        erroresValidacion.push('Las series deben ser un número mayor a 0');
    }
    if (ejerciciosElegidos.some((e) => !Number.isFinite(e.repeticiones) || e.repeticiones < 1)) {
        erroresValidacion.push('Las repeticiones deben ser un número mayor a 0');
    }
    if (ejerciciosElegidos.some((e) => !Number.isFinite(e.peso) || e.peso < 0)) {
        erroresValidacion.push('El peso debe ser un número válido');
    }

    return { fecha, hora, notasGenerales, q, ejerciciosElegidos, resultadosBusqueda, busquedaError, erroresValidacion };
}
