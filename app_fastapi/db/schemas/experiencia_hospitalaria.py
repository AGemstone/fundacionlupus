from pydantic import BaseModel, ConfigDict
from typing import Annotated
from fastapi import Query


class ExperienciaBase(BaseModel):
    unidad_hospitalaria: Annotated[str, Query(max_length=128)]
    experiencia: str


class ExperienciaHospitalaria(ExperienciaBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    # id_paciente: int
