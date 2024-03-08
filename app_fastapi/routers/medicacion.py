from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.crud.medicacion import get_medicacion, delete_medicacion
from db.schemas.medicacion import Medicacion
from dependencies import get_db


router = APIRouter(
    prefix="/medicacion",
    tags=["medicacion"],
    responses={404: {"msg": "Not found"}},
)


@router.get("/", response_model=list[Medicacion])
def get(nombres: str, apellidos: str, dni: int, db: Session = Depends(get_db)):
    return get_medicacion(db, nombres, apellidos, dni)


@router.delete("/", response_model=bool)
def delete(medicacion_id: int, db: Session = Depends(get_db)):
    response = delete_medicacion(db, medicacion_id)
    return response
