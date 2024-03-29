from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.sql import ColumnCollection

from db.models import Persona, Perfil, Cuidador
from db.crud.persona import query_persona_id

from db.schemas.perfil import PerfilBase, Ubicacion, PerfilView
from db.schemas.cuidador import CuidadorForm


def get_perfil(db: Session, nombres: str, apellidos: str, dni: int):
    perfil = select(Perfil, Persona).join(Persona)

    query = db.execute(perfil.where(Persona.nombres == nombres,
                                    Persona.apellidos == apellidos,
                                    Persona.dni == dni)).all()
    if query != []:
        return PerfilView(perfil=query[0][0].__dict__, persona=query[0][1].__dict__)


def add_perfil(db: Session, persona_id: int, id_cuidador: int | None, perfil: PerfilBase, ubicacion: Ubicacion):
    id_perfil = db.execute(select(Perfil).where(
        Perfil.id == persona_id)).scalar()
    if id_perfil is not None:
        return None

    perfil_nuevo = Perfil(
        id=persona_id, id_cuidador=id_cuidador, **perfil.model_dump(), **ubicacion.model_dump())
    db.add(perfil_nuevo)
    db.commit()
    return perfil


def delete_perfil(db: Session, nombres: str, apellidos: str, dni: int):
    query = query_persona_id(nombres, apellidos, dni)
    perfil_id = db.execute(query).scalar()
    if perfil_id is None:
        return False
    perfil = db.get(Perfil, perfil_id)
    db.delete(perfil)
    db.commit()
    return True
