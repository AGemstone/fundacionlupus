from pydantic import BaseModel
from db.schemas.perfil import PerfilBase, Ubicacion
from db.schemas.cuidador import CuidadorForm
from db.schemas.persona import PersonaForm
from db.schemas.lupus_sistemico import LupusSistemico
from db.schemas.medicacion import MedicacionBase
from db.schemas.experiencia_hospitalaria import ExperienciaBase
from db.schemas.otras_enfermedades import EnfermedadBase


class FormType(BaseModel):
    persona: PersonaForm
    perfil: PerfilBase
    ubicacion: Ubicacion
    cuidador: CuidadorForm | None
    lupus_sistemico: LupusSistemico | None
    medicacion: list[MedicacionBase]
    otras_enfermedades: list[EnfermedadBase]
    experiencia_hospitalaria: list[ExperienciaBase]
