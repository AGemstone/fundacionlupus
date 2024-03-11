from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.crud.lupus_sistemico import get_lupus_organos
from db.schemas.lupus_sistemico import LupusSistemico
from dependencies import get_db


router = APIRouter(
    prefix="/lupus_sistemico",
    tags=["lupus_sistemico"],
    responses={404: {"msg": "Not found"}},
)


@router.get("/", response_model=LupusSistemico|None)
def get(nombres: str, apellidos: str, dni: int, db: Session = Depends(get_db)):
    return get_lupus_organos(db, nombres, apellidos, dni)


# @router.delete("/", response_model=bool)
# def delete(enfermedad_id: int, db: Session = Depends(get_db)):
#     response = delete_enfermedad(db, enfermedad_id)
#     return response
