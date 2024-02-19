
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import time
from db.crud.persona import get_personas, add_persona, delete_persona
from db.schemas.persona import Persona, PersonaBase
from dependencies import get_db


router = APIRouter(
    prefix="/persona",
    tags=["personas"],
    # dependencies=[],
    responses={404: {"msg": "Not found"}},
)


@router.get("/", response_model=list[Persona])
def get(offset: int | None = None, db: Session = Depends(get_db)):
    return get_personas(db, offset)


# @router.post("/", response_model=PersonaBase)
# def post(persona: PersonaBase,
#          db: Session = Depends(get_db)):
#     response = add_persona(db, persona)
#     if not response:
#         raise HTTPException(
#             status_code=400, detail="La persona esta registrada en la base de datos.")
#     return response


@router.delete("/")
def delete(nombres: str, apellidos: str, dni: int, db: Session = Depends(get_db)):
    response = delete_persona(db, nombres, apellidos, dni)
    print(response)
    # if response == 404:
    #     raise HTTPException(
    #         status_code=404, detail="No se encontro la persona en la base de datos.")
    return response
