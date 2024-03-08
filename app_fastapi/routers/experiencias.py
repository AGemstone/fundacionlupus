from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.crud.experiencia_hospitalaria import get_experiencias, delete_experiencia
from db.schemas.experiencia_hospitalaria import ExperienciaHospitalaria
from dependencies import get_db


router = APIRouter(
    prefix="/experiencia_hospitalaria",
    tags=["experiencia_hospitalaria"],
    responses={404: {"msg": "Not found"}},
)


@router.get("/", response_model=list[ExperienciaHospitalaria])
def get(nombres: str, apellidos: str, dni: int, db: Session = Depends(get_db)):
    return get_experiencias(db, nombres, apellidos, dni)


@router.delete("/", response_model=bool)
def delete(experiencia_id: int, db: Session = Depends(get_db)):
    response = delete_experiencia(db, experiencia_id)
    return response
