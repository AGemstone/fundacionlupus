from sqlalchemy import select
from sqlalchemy.orm import Session
from db.models import LupusSistemico as LupusSistemicoDB
from db.schemas.lupus_sistemico import LupusSistemico
from db.crud.persona import query_persona_id


def get_lupus_organos(db: Session, nombres: str, apellidos: str, dni: int):
    paciente_id = query_persona_id(nombres, apellidos, dni)
    query = select(LupusSistemicoDB).where(
        LupusSistemicoDB.id_paciente == paciente_id)
    # organos = db.execute(query).scalar().model_dump()
    # otros_organos = organos.otros.split(",")
    # del organos["otros"]
    # LupusSistemico(**organos, otros=otros_organos)
    return db.execute(query).scalar()


def add_lupus_organos(db: Session, paciente_id: int, organos: LupusSistemico):
    organos_afectados = LupusSistemico(
        id_paciente=paciente_id, **organos.model_dump())
    db.add(organos_afectados)
    db.commit()
    db.refresh(organos_afectados)
    return organos
