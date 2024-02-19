from pydantic import BaseModel, ConfigDict


class EnfermedadBase(BaseModel):
    enfermedad: str


class OtrasEnfermedades(EnfermedadBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    # id_paciente: int
