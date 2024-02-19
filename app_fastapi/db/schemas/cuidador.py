from pydantic import BaseModel, ConfigDict
from db.schemas.persona import PersonaBase


class CuidadorBase(BaseModel):
    parentesco: str


class CuidadorForm(CuidadorBase, PersonaBase):
    # email: str
    # telefono: int | None
    pass


class Cuidador(CuidadorBase):
    model_config = ConfigDict(from_attributes=True)

    id_paciente: int
    id_cuidador: int
