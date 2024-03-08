from sqlalchemy import select
from sqlalchemy.orm import Session
from db.schemas.medicacion import MedicacionBase
from db.crud.persona import query_persona_id
from db.models import Medicacion


def add_medicacion(db: Session, paciente_id: int, medicamentos: list[MedicacionBase]):
    nuevos_medicamentos = []
    for medicamento in medicamentos:
        medicamento_nuevo = Medicacion(id_paciente=paciente_id,
                                       **medicamento.model_dump())
        nuevos_medicamentos.append(medicamento_nuevo)
        db.add(medicamento_nuevo)
    db.commit()
    return nuevos_medicamentos


def get_medicacion(db: Session, nombres: str, apellidos: str, dni: int):
    paciente_id = query_persona_id(nombres, apellidos, dni)
    query = select(Medicacion).where(Medicacion.id_paciente == paciente_id)
    return db.execute(query).scalars()


def delete_medicacion(db: Session, medicacion_id: int):
    query = select(Medicacion).where(Medicacion.id == medicacion_id)
    if (db.execute(query).scalar() is None):
        return False
    medicacion = db.get(Medicacion, medicacion_id)
    db.delete(medicacion)
    db.commit()
    return True
