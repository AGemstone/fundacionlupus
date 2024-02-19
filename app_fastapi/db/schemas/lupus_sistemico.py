from pydantic import BaseModel, ConfigDict
from typing import Annotated
from fastapi import Query

class LupusSistemicoBase(BaseModel):
    cerebro: bool
    pulmones: bool
    corazon: bool
    riñones: bool
    cutaneo: bool
    gastrointestinal: bool
    oseo_musucular: bool
    otros: str


class LupusSistemico(LupusSistemicoBase):
    model_config = ConfigDict(from_attributes=True)
    # id_paciente: int
