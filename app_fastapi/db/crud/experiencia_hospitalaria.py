from sqlalchemy import select
from sqlalchemy.orm import Session
from db.models import ExperienciaHospitalaria
from db.schemas.experiencia_hospitalaria import ExperienciaBase


def get_experiencias(db: Session, paciente_id: int):
    query = select(ExperienciaHospitalaria).where(ExperienciaHospitalaria.paciente_id == paciente_id)
    return db.execute(query).scalar()


def add_experiencias(db: Session, paciente_id: int, experiencias: list[ExperienciaBase]):
    nuevas_experiencias = []
    for experiencia in experiencias:
        experiencia_nueva = ExperienciaHospitalaria(id_paciente=paciente_id,
                                                    **experiencia.model_dump())
        nuevas_experiencias.append(experiencia_nueva)
        db.add(experiencia_nueva)
    db.commit()
    return nuevas_experiencias
