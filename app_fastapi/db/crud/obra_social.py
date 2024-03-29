from sqlalchemy import select
from sqlalchemy.orm import Session
from db.models import ObraSocial


def get_obras_sociales(db: Session):
    return db.execute(select(ObraSocial)).scalars()


def get_obra_social(db: Session, osid: int):
    return db.execute(select(ObraSocial).where(ObraSocial.rnos == osid))
