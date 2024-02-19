#!/usr/bin/env python3

from fastapi import FastAPI
from routers import persona, perfil, extra
from db.engine import Reflected, engine
from fastapi.middleware.cors import CORSMiddleware


def create_app():
    app = FastAPI()
    # CORS
    origins = [
        "http://localhost:4200"
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    # Routes
    app.include_router(persona.router)
    app.include_router(perfil.router)
    app.include_router(extra.router)
    # Database

    return app

Reflected.prepare(engine)

app = create_app()
