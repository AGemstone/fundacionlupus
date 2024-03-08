#!/usr/bin/env python3

from fastapi import FastAPI
from routers.classes import routers
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
    for router in routers:
        app.include_router(router)

    return app


# Database
Reflected.prepare(engine)

app = create_app()
