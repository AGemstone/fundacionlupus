from sqlalchemy import select
from sqlalchemy.orm import Session
from db.models import ObraSocial

def get_obras_sociales(db: Session):
    return db.execute(select(ObraSocial)).scalars()