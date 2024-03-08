from pydantic import BaseModel, ConfigDict


class LupusSistemico(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    cerebro: bool
    pulmones: bool
    corazon: bool
    riñones: bool
    cutaneo: bool
    gastrointestinal: bool
    oseo_musucular: bool
    otros: str
