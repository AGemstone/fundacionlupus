from sqlalchemy import select
from sqlalchemy.orm import Session
from db.schemas.otras_enfermedades import EnfermedadBase
from db.models import OtrasEnfermedades
from db.crud.persona import query_persona_id


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


def get_enfermedades(db: Session, nombres: str, apellidos: str, dni: int):
    paciente_id = query_persona_id(nombres, apellidos, dni)
    query = select(OtrasEnfermedades).where(
        OtrasEnfermedades.id_paciente == paciente_id)
    return db.execute(query).scalars()


def delete_enfermedad(db: Session, enfermedad_id: int):
    query = select(OtrasEnfermedades).where(
        OtrasEnfermedades.id == enfermedad_id)
    if (db.execute(query).scalar() is None):
        return False
    enfermedad = db.get(OtrasEnfermedades, enfermedad_id)
    db.delete(enfermedad)
    db.commit()
    return True
