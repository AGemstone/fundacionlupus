export interface PerfilInterface {
    provincia: string,
    localidad: string,
    barrio: string,
    direccion: string,
    codigo_postal: string,
    sexo: string,
    estado_civil: string,
    ocupacion: string,
    obra_social: number | null,
    cud: boolean,
    medicacion_check: boolean,
    visita_check: boolean,
    urgencia_check: boolean,
    fecha_diagnostico: string,
    ultima_visita: string,
    fuente_medicacion: string,
    tipo_lupus: string
}