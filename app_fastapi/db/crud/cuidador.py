from sqlalchemy import select
from sqlalchemy.orm import Session
from db.crud.persona import query_persona_id, add_persona
from db.schemas.cuidador import CuidadorForm
from db.schemas.persona import Persona
from db.models import Cuidador, Persona as PersonaDB
import time

def get_cuidador(db: Session, nombres: str, apellidos: str, dni: int):
    paciente_id = select(Cuidador.id_paciente)
    paciente_id = paciente_id.join(PersonaDB,
                                   onclause=Cuidador.id_paciente == PersonaDB.id)
    paciente_id = paciente_id.where(PersonaDB.nombres == nombres,
                                    PersonaDB.apellidos == apellidos,
                                    PersonaDB.dni == dni).scalar_subquery()

    cuidador = select(PersonaDB, Cuidador.parentesco)
    cuidador = cuidador.join(Cuidador,
                             onclause=Cuidador.id_cuidador == PersonaDB.id)
    query = db.execute(cuidador.where(
        Cuidador.id_paciente == paciente_id)).all()
    if query != []:
        return CuidadorForm(**query[0][0].__dict__, parentesco=query[0][1])

def add_cuidador(db: Session, id_paciente: int, cuidador: CuidadorForm):
    query_id_cuidador = query_persona_id(
        cuidador.nombres, cuidador.apellidos, cuidador.dni)
    id_cuidador = db.execute(query_id_cuidador).scalar()

    query_cuidador = select(Cuidador.id_cuidador).where(Cuidador.id_paciente == id_paciente,
                                                        Cuidador.id_cuidador == id_cuidador)
    cuidador_info = db.execute(query_cuidador).scalar()
    # Cuidador existe y esta asociado al paciente
    if cuidador_info is not None:
        return None

    # Cuidador no existe
    if id_cuidador is None:
        persona_nueva = Persona(**cuidador.model_dump(exclude="parentesco"),
                                    fecha_nacimiento=None)
        add_persona(db, persona_nueva)
        id_cuidador = db.execute(query_id_cuidador).scalar()
    # Cuidador existe
    cuidador_nuevo = Cuidador(id_cuidador=id_cuidador,
                              id_paciente=id_paciente,
                              parentesco=cuidador.parentesco)
    db.add(cuidador_nuevo)
    db.commit()
    db.refresh(cuidador_nuevo)
    return cuidador_nuevo


def delete_cuidador(db: Session, nombres: str, apellidos: str, dni: int):
    query = query_persona_id(nombres, apellidos, dni)
    persona_id = db.execute(query).scalar()
    if persona_id is None:
        return False
    perfil = db.get(PersonaDB, persona_id)
    db.delete(perfil)
    db.commit()
    return True
