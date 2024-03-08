from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.crud.persona import get_personas, add_persona, delete_persona
from db.schemas.persona import Persona, PersonaBase
from dependencies import get_db


router = APIRouter(
    prefix="/persona",
    tags=["personas"],
    responses={404: {"msg": "Not found"}},
)


@router.get("/", response_model=list[Persona])
def get(offset: int | None = None, db: Session = Depends(get_db)):
    return get_personas(db, offset)


@router.delete("/")
def delete(nombres: str, apellidos: str, dni: int, db: Session = Depends(get_db)):
    response = delete_persona(db, nombres, apellidos, dni)
    return response
