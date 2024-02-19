from sqlalchemy import select
from sqlalchemy.orm import Session
from db.schemas.otras_enfermedades import EnfermedadBase
from db.models import OtrasEnfermedades


def add_enfermedades(db: Session, paciente_id: int, enfermedades: list[EnfermedadBase]):
    nuevas_enfermedades = []
    for enfermedad in enfermedades:
        medicamento_nuevo = OtrasEnfermedades(id_paciente=paciente_id,
                                              **enfermedad.model_dump())
        nuevas_enfermedades.append(medicamento_nuevo)
        db.add(medicamento_nuevo)
    db.commit()
    # db.refresh(medicamento_nuevo)
    return nuevas_enfermedades
