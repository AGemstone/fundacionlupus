from pydantic import BaseModel, ConfigDict
from datetime import date


class Ubicacion(BaseModel):
    provincia: str
    localidad: str
    barrio: str
    direccion: str
    codigo_postal: str


class PerfilBase(BaseModel):
    sexo: str
    estado_civil: str
    ocupacion: str | None
    obra_social: int | None
    cud: bool
    medicacion_check: bool
    visita_check: bool
    urgencia_check: bool
    fecha_diagnostico: date
    ultima_visita: date
    fuente_medicacion: str
    tipo_lupus: str


class PerfilQuery(PerfilBase, Ubicacion):
    id_cuidador: int | None


class Perfil(PerfilBase, Ubicacion):
    model_config = ConfigDict(from_attributes=True)
    # id: int
