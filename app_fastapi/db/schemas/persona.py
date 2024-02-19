from pydantic import BaseModel, ConfigDict
from datetime import date


class PersonaBase(BaseModel):
    nombres: str
    apellidos: str
    dni: int
    email: str | None
    telefono: int | None


class PersonaForm(PersonaBase):
    fecha_nacimiento: date | None


class Persona(PersonaForm):
    model_config = ConfigDict(from_attributes=True)
    # id: int
