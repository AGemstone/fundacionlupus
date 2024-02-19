from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.crud.obra_social import get_obras_sociales
from db.schemas.obra_social import ObraSocial
from dependencies import get_db

router = APIRouter(
    prefix="/extra",
    tags=["Extra"],
    # dependencies=[],
    responses={401: {"Response": "Malformed request"}},
)


@router.get("/obra_social", response_model=list[ObraSocial])
def get_os(db: Session = Depends(get_db)):
    return get_obras_sociales(db)
