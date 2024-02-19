# import random
from datetime import date
from conftest import client
from db.schemas.form_type import FormType
# from test_util import rand_string

from test_util import generate_persona
from test_util import generate_perfil_basico
from test_util import generate_ubicacion
from test_util import generate_cuidador
from test_util import generate_lupus_sistemico
from test_util import generate_medicacion
from test_util import generate_otras_enfermedades
from test_util import generate_experiencia_hospitalaria


class TestPerfil:

    perfiles = []

    def test_0(self):
        perfil = FormType(persona=generate_persona(),
                          perfil=generate_perfil_basico(),
                          ubicacion=generate_ubicacion(),
                          cuidador=generate_cuidador(),
                          lupus_sistemico=generate_lupus_sistemico(),
                          medicacion=[generate_medicacion()],
                          otras_enfermedades=[generate_otras_enfermedades()],
                          experiencia_hospitalaria=[
                              generate_experiencia_hospitalaria()]
                          )
        self.perfiles.append(perfil.persona)
        response = client.post("/perfil",
                               json={**perfil.model_dump(mode="json")})
        assert response.status_code == 200

        response = client.get("/perfil",
                              params=perfil.persona.model_dump(include=["nombres", "apellidos", "dni"]))
        assert response.json() is not None

    def test_1(self):
        perfil = FormType(persona=generate_persona(),
                          perfil=generate_perfil_basico(),
                          ubicacion=generate_ubicacion(),
                          cuidador=generate_cuidador(),
                          lupus_sistemico=generate_lupus_sistemico(),
                          medicacion=[],
                          otras_enfermedades=[],
                          experiencia_hospitalaria=[]
                          )
        self.perfiles.append(perfil.persona)
        response = client.post("/perfil",
                               json={**perfil.model_dump(mode="json")})
        assert response.status_code == 200

        response = client.get("/perfil",
                              params=perfil.persona.model_dump(include=["nombres", "apellidos", "dni"]))
        assert response.json() is not None

    def test_2(self):
        nacimiento = date(1990, 1, 1).strftime("%Y-%m-%d")
        perfil = FormType(persona=generate_persona(fecha_nacimiento=nacimiento),
                          perfil=generate_perfil_basico(),
                          ubicacion=generate_ubicacion(),
                          cuidador=None,
                          lupus_sistemico=generate_lupus_sistemico(),
                          medicacion=[],
                          otras_enfermedades=[],
                          experiencia_hospitalaria=[]
                          )
        self.perfiles.append(perfil.persona)
        response = client.post("/perfil",
                               json={**perfil.model_dump(mode="json")})
        assert response.status_code == 200

        response = client.get("/perfil",
                              params=perfil.persona.model_dump(include=["nombres", "apellidos", "dni"]))
        assert response.json() is not None

    def test_3(self):
        nacimiento = date(1990, 1, 1).strftime("%Y-%m-%d")
        perfil = FormType(persona=generate_persona(fecha_nacimiento=nacimiento),
                          perfil=generate_perfil_basico(tipo_lupus="Discoide"),
                          ubicacion=generate_ubicacion(),
                          cuidador=None,
                          lupus_sistemico=None,
                          medicacion=[],
                          otras_enfermedades=[],
                          experiencia_hospitalaria=[]
                          )
        self.perfiles.append(perfil.persona)
        response = client.post("/perfil",
                               json={**perfil.model_dump(mode="json")})
        assert response.status_code == 200

        response = client.get("/perfil",
                              params=perfil.persona.model_dump(include=["nombres", "apellidos", "dni"]))
        assert response.json() is not None
    # test insert invalid

    def test_4(self):
        perfil = FormType(persona=generate_persona(),
                          perfil=generate_perfil_basico(tipo_lupus="Sistemico"),
                          ubicacion=generate_ubicacion(),
                          cuidador=generate_cuidador(),
                          lupus_sistemico=None,
                          medicacion=[],
                          otras_enfermedades=[],
                          experiencia_hospitalaria=[]
                          )
        self.perfiles.append(perfil.persona)
        response = client.post("/perfil",
                               json={**perfil.model_dump(mode="json")})
        assert response.status_code == 422, "Lupus sistemico, falta informacion para la tabla lupus_sistemico"

        response = client.get("/perfil",
                              params=perfil.persona.model_dump(include=["nombres", "apellidos", "dni"]))
        assert response.json() is None
        self.perfiles.pop()

    def test_5(self):
        nacimiento = date.today().strftime("%Y-%m-%d")
        perfil = FormType(persona=generate_persona(fecha_nacimiento=nacimiento),
                          perfil=generate_perfil_basico(
                              tipo_lupus="Discoide"),
                          ubicacion=generate_ubicacion(),
                          cuidador=None,
                          lupus_sistemico=None,
                          medicacion=[],
                          otras_enfermedades=[],
                          experiencia_hospitalaria=[]
                          )
        self.perfiles.append(perfil.persona)
        response = client.post("/perfil",
                               json={**perfil.model_dump(mode="json")})
        assert response.status_code == 422, "Menor de edad, necesita cuidador"

        response = client.get("/perfil",
                              params=perfil.persona.model_dump(include=["nombres", "apellidos", "dni"]))
        assert response.json() is None
        self.perfiles.pop()
    # test deletion

    def test_10_0(self):
        for perfil in self.perfiles:
            print(perfil)
            response = client.delete(
                "/perfil", params=perfil.model_dump(include=["nombres", "apellidos", "dni"]))
            assert response.status_code == 200

    def test_10_1(self):
        response = client.get("/persona")
        for persona in response.json():
            response = client.delete(
                "/persona", params={key: persona[key] for key in ["nombres", "apellidos", "dni"]})
