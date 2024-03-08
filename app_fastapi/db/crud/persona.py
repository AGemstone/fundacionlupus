from sqlalchemy import select
from sqlalchemy.orm import Session
import db.schemas.persona as persona_schema
from db.models import Persona, Perfil


def query_persona_id(nombres: str, apellidos: str, dni: int):
    table = select(Persona.id)
    return table.where(Persona.nombres == nombres,
                       Persona.apellidos == apellidos,
                       Persona.dni == dni)


def get_personas(db: Session, offset: int | None, limit: int = 10):
    if offset is None:
        offset = 0
    query = select(Persona).join(Perfil).offset(offset).limit(limit)
    return db.execute(query).scalars()


def add_persona(db: Session, persona: persona_schema.PersonaBase):
    query = query_persona_id(persona.nombres, persona.apellidos, persona.dni)
    persona_id = db.execute(query).scalar()
    if persona_id is not None:
        return None

    persona_nueva = Persona(**persona.model_dump())
    db.add(persona_nueva)
    db.commit()
    db.refresh(persona_nueva)
    return persona_nueva


def delete_persona(db: Session, nombres: str, apellidos: str, dni: int):
    query = query_persona_id(nombres, apellidos, dni)
    persona_id = db.execute(query).scalar()
    if persona_id is None:
        return False
    persona = db.get(Persona, persona_id)
    db.delete(persona)
    db.commit()
    return True
