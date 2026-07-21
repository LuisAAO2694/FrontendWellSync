export interface EjercicioElegido {
    exerciseId: string;
    nombre: string;
    series: number;
    repeticiones: number;
    peso: number;
    completado: boolean;
    notaPersonal: string;
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
