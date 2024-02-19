from sqlalchemy import select
from sqlalchemy.orm import Session
from db.schemas.medicacion import MedicacionBase
from db.models import Medicacion


def get_medicacion(db: Session, paciente_id: int):
    query = select(Medicacion).where(Medicacion.paciente_id == paciente_id)
    return db.execute(query).scalar()


def add_medicacion(db: Session, paciente_id: int, medicamentos: list[MedicacionBase]):
    nuevos_medicamentos = []
    for medicamento in medicamentos:
        medicamento_nuevo = Medicacion(id_paciente=paciente_id,
                                       **medicamento.model_dump())
        nuevos_medicamentos.append(medicamento_nuevo)
        db.add(medicamento_nuevo)
    db.commit()
    return nuevos_medicamentos
