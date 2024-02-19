from pydantic import BaseModel, ConfigDict


class ObraSocial(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    rnos: int
    nombre: str
    # sigla: str
    # provincia: str
    # codigo_postal: int
