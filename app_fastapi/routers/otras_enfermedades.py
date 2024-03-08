from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.crud.otras_enfermedades import get_enfermedades, delete_enfermedad
from db.schemas.otras_enfermedades import OtrasEnfermedades
from dependencies import get_db


router = APIRouter(
    prefix="/otras_enfermedades",
    tags=["otras_enfermedades"],
    responses={404: {"msg": "Not found"}},
)


@router.get("/", response_model=list[OtrasEnfermedades])
def get(nombres: str, apellidos: str, dni: int, db: Session = Depends(get_db)):
    return get_enfermedades(db, nombres, apellidos, dni)


@router.delete("/", response_model=bool)
def delete(enfermedad_id: int, db: Session = Depends(get_db)):
    response = delete_enfermedad(db, enfermedad_id)
    return response
