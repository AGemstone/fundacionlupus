from sqlalchemy import select
from sqlalchemy.orm import Session
from db.models import ExperienciaHospitalaria
from db.schemas.experiencia_hospitalaria import ExperienciaBase
from db.crud.persona import query_persona_id


def add_experiencias(db: Session, paciente_id: int, experiencias: list[ExperienciaBase]):
    nuevas_experiencias = []
    for experiencia in experiencias:
        experiencia_nueva = ExperienciaHospitalaria(id_paciente=paciente_id,
                                                    **experiencia.model_dump())
        nuevas_experiencias.append(experiencia_nueva)
        db.add(experiencia_nueva)
    db.commit()
    return nuevas_experiencias


def get_experiencias(db: Session, nombres: str, apellidos: str, dni: int):
    paciente_id = query_persona_id(nombres, apellidos, dni)
    query = select(ExperienciaHospitalaria).where(
        ExperienciaHospitalaria.id_paciente == paciente_id)
    return db.execute(query).scalars()


def delete_experiencia(db: Session, experiencia_id: int):
    query = select(ExperienciaHospitalaria).where(
        ExperienciaHospitalaria.id == experiencia_id)
    if (db.execute(query).scalar() is None):
        return False
    experiencia = db.get(ExperienciaHospitalaria, experiencia_id)
    db.delete(experiencia)
    db.commit()
    return True
