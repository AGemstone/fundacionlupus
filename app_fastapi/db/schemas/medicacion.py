from pydantic import BaseModel, ConfigDict


class MedicacionBase(BaseModel):
    medicamento: str
    dosis_mg_ml: float
    frecuencia: int


class Medicacion(MedicacionBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    # id_paciente: int
