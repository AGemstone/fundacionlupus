from sqlalchemy import select
from sqlalchemy.orm import Session
from db.models import LupusSistemico 
from db.schemas.lupus_sistemico import LupusSistemico as LupusSistemicoSchema
from db.crud.persona import query_persona_id


def get_lupus_organos(db: Session, nombres: str, apellidos: str, dni: int):
    paciente_id = query_persona_id(nombres, apellidos, dni)
    query = select(LupusSistemico).where(
        LupusSistemico.id_paciente == paciente_id)
    return db.execute(query).scalar()


def add_lupus_organos(db: Session, paciente_id: int, organos: LupusSistemicoSchema):
    # print(organos)
    organos_afectados = LupusSistemico(id_paciente=paciente_id, 
                                       **organos.model_dump())
    db.add(organos_afectados)
    db.commit()
    db.refresh(organos_afectados)
    return organos
