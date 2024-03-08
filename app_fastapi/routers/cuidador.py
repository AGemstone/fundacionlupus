from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Annotated
from datetime import date
from sqlalchemy.orm import Session

from dependencies import get_db

from db.schemas.cuidador import CuidadorForm
from db.schemas.persona import Persona
from db.crud.cuidador import get_cuidador

router = APIRouter(
    prefix="/cuidador",
    tags=["cuidadores"],
    responses={404: {"msg": "Not found"}},
)


@router.get("/", response_model=CuidadorForm | None)
def get(nombres: str,
        apellidos: str,
        dni: Annotated[int, Query(ge=0)],
        db: Session = Depends(get_db)):
    cuidador = get_cuidador(db, nombres, apellidos, dni)
    # print(cuidador)
    return cuidador
