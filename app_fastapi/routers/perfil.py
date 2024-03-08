from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Annotated
from datetime import date
from sqlalchemy.orm import Session

from db.crud.persona import add_persona, query_persona_id
from db.crud.perfil import get_perfil, add_perfil, delete_perfil
from db.crud.cuidador import add_cuidador
from db.crud.medicacion import add_medicacion
from db.crud.otras_enfermedades import add_enfermedades
from db.crud.lupus_sistemico import add_lupus_organos
from db.crud.experiencia_hospitalaria import add_experiencias

from db.schemas.form_type import FormType
from db.schemas.perfil import PerfilBase, Perfil, PerfilView
from db.schemas.persona import Persona, PersonaBase
from db.schemas.cuidador import CuidadorBase

from dependencies import get_db


router = APIRouter(
    prefix="/perfil",
    tags=["perfiles"],
    responses={404: {"msg": "Not found"}},
)


@router.get("/", response_model=PerfilView | None)
def get(nombres: str,
        apellidos: str,
        dni: Annotated[int, Query(ge=0)],
        db: Session = Depends(get_db)):
    perfil = get_perfil(db, nombres, apellidos, dni)

    return perfil


@router.post("/", response_model=bool)
def post(form_data: FormType,
         db: Session = Depends(get_db)):

    if form_data.cuidador is None:
        today = date.today()
        # form_data.persona.fecha_nacimiento
        edad = today.year - form_data.persona.fecha_nacimiento.year
        edad -= (today.month, today.day) < (form_data.persona.fecha_nacimiento.month,
                                            form_data.persona.fecha_nacimiento.day)
        if edad < 18:
            raise HTTPException(status_code=422,
                                detail={"form":
                                        "Menor de edad necesita cuidador"
                                        })

    if (form_data.perfil.tipo_lupus == "Sistemico" and
            form_data.lupus_sistemico is None):
        raise HTTPException(status_code=422,
                            detail={"form":
                                    "Falta informacion sobre organos afectados"
                                    })

    id_perfil = None
    id_cuidador = None

    nueva_persona = add_persona(db, form_data.persona)

    if nueva_persona is None:
        id_perfil = db.execute(query_persona_id(form_data.persona.nombres,
                                                form_data.persona.apellidos,
                                                form_data.persona.dni)).scalar()
    else:
        id_perfil = nueva_persona.id

    if form_data.cuidador is not None:
        cuidador = add_cuidador(db, id_perfil, form_data.cuidador)
        if cuidador is None:
            raise HTTPException(status_code=422,
                                detail={"form":
                                        "El cuidador esta asociado al paciente"
                                        })
        id_cuidador = cuidador.id_cuidador

    add_perfil(db, id_perfil, id_cuidador,
               form_data.perfil, form_data.ubicacion)

    if form_data.lupus_sistemico is not None:
        add_lupus_organos(db, id_perfil, form_data.lupus_sistemico)

    add_enfermedades(db, id_perfil, form_data.otras_enfermedades)
    add_medicacion(db, id_perfil, form_data.medicacion)
    add_experiencias(db, id_perfil, form_data.experiencia_hospitalaria)
    return True


@router.delete("/")
def delete(nombres: str, apellidos: str, dni: int, db: Session = Depends(get_db)):
    response = delete_perfil(db, nombres, apellidos, dni)
    return response
