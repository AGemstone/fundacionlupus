from sqlalchemy import select
from sqlalchemy.orm import Session
from db.models import LupusSistemico
from db.schemas.lupus_sistemico import LupusSistemicoBase


def get_lupus_organos(db: Session, paciente_id: int):
    query = select(LupusSistemico).where(
        LupusSistemico.paciente_id == paciente_id)
    organos = db.execute(query).scalar().model_dump()
    otros_organos = organos.otros.split(",")
    del organos["otros"]
    return LupusSistemicoBase(**organos, otros=otros_organos)


def add_lupus_organos(db: Session, paciente_id: int, organos: LupusSistemicoBase):
    organos_afectados = LupusSistemico(
        id_paciente=paciente_id, **organos.model_dump())
    db.add(organos_afectados)
    db.commit()
    db.refresh(organos_afectados)
    return organos
