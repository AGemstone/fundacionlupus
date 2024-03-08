# A wrapper for all routers

from . import cuidador, experiencias, medicacion, obra_social
from . import otras_enfermedades, perfil, persona, lupus_sistemico


routers = [
    cuidador.router,
    experiencias.router,
    medicacion.router,
    obra_social.router,
    otras_enfermedades.router,
    perfil.router,
    persona.router,
    lupus_sistemico.router
]
