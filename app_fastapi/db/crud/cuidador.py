from sqlalchemy import select
from sqlalchemy.orm import Session
from db.crud.persona import query_persona_id, add_persona
from db.schemas.cuidador import CuidadorForm
from db.schemas.persona import PersonaBase
from db.models import Cuidador, Persona


def get_cuidador():
    pass


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
        persona_nueva = PersonaBase(
            **cuidador.model_dump(exclude="parentesco"), fecha_nacimiento=None)
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
    perfil = db.get(Persona, persona_id)
    db.delete(perfil)
    db.commit()
    return True
