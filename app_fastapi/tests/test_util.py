import random
import string
from datetime import date

from db.schemas.perfil import PerfilBase, Ubicacion
from db.schemas.cuidador import CuidadorForm
from db.schemas.persona import PersonaForm
from db.schemas.lupus_sistemico import LupusSistemicoBase
from db.schemas.medicacion import MedicacionBase
from db.schemas.experiencia_hospitalaria import ExperienciaBase
from db.schemas.otras_enfermedades import EnfermedadBase
from db.schemas.form_type import FormType


CHOICES = {
    "estado_civil": ["Soltero"],
    "fuente_medicacion": ["Obra Social"],
    "tipo_lupus": ["Sistemico", "Discoide"],
    "provincia": ["Buenos Aires"],
    "sexo": ["Femenino", "Masculino"],
}


def rand_string(length: int = 16):
    return ''.join(random.choice(string.ascii_uppercase) for _ in range(length))


def rand_bool(p=0.5):
    return random.random() > p


def rand_date_naive_formatted() -> str:
    return date(random.randint(1900, 2024),
                random.randint(1, 12),
                random.randint(1, 28)).strftime("%Y-%m-%d")


def generate_persona(nombres=None, apellidos=None, dni=None, telefono=None,
                     email=None, fecha_nacimiento=None):

    if nombres is None:
        nombres: str = rand_string()
    if apellidos is None:
        apellidos: str = rand_string()
    if dni is None:
        dni: int = random.randint(9000000, 50000000)
    if telefono is None:
        telefono: int = random.randint(1000000000, 9999999999)
    if email is None:
        email: str = f'{rand_string()}@{rand_string()}'
    if fecha_nacimiento is None:
        fecha_nacimiento = rand_date_naive_formatted()

    return PersonaForm(nombres=nombres, apellidos=apellidos, dni=dni,
                       telefono=telefono, email=email,
                       fecha_nacimiento=fecha_nacimiento)


def generate_perfil_basico(sexo=None, estado_civil=None, ocupacion=None,
                           obra_social=None, cud=None, medicacion_check=None,
                           visita_check=None, urgencia_check=None,
                           fecha_diagnostico=None, ultima_visita=None,
                           fuente_medicacion=None, tipo_lupus=None):

    if sexo is None:
        sexo = random.choice(CHOICES['sexo'])
    if estado_civil is None:
        estado_civil = random.choice(CHOICES['estado_civil'])
    if ocupacion is None:
        ocupacion = rand_string()
    if obra_social is None:
        obra_social = None
    if cud is None:
        cud = rand_bool()
    if medicacion_check is None:
        medicacion_check = rand_bool()
    if visita_check is None:
        visita_check = rand_bool()
    if urgencia_check is None:
        urgencia_check = rand_bool()
    if fecha_diagnostico is None:
        fecha_diagnostico = rand_date_naive_formatted()
    if ultima_visita is None:
        ultima_visita = rand_date_naive_formatted()
    if fuente_medicacion is None:
        fuente_medicacion = random.choice(CHOICES['fuente_medicacion'])
    if tipo_lupus is None:
        tipo_lupus = random.choice(CHOICES['tipo_lupus'])

    return PerfilBase(sexo=sexo,
                      estado_civil=estado_civil,
                      ocupacion=ocupacion,
                      obra_social=obra_social,
                      cud=cud,
                      medicacion_check=medicacion_check,
                      visita_check=visita_check,
                      urgencia_check=urgencia_check,
                      fecha_diagnostico=fecha_diagnostico,
                      ultima_visita=ultima_visita,
                      fuente_medicacion=fuente_medicacion,
                      tipo_lupus=tipo_lupus)


def generate_ubicacion(provincia=None, localidad=None, barrio=None,
                       direccion=None, codigo_postal=None):
    if provincia is None:
        provincia = random.choice(CHOICES['provincia'])
    if localidad is None:
        localidad = rand_string()
    if barrio is None:
        barrio = rand_string()
    if direccion is None:
        direccion = rand_string()
    if codigo_postal is None:
        codigo_postal = f"{rand_string(1)}{random.randint(5000, 6000)}{rand_string(3)}"

    return Ubicacion(provincia=provincia,
                     localidad=localidad,
                     barrio=barrio,
                     direccion=direccion,
                     codigo_postal=codigo_postal)


def generate_cuidador(nombres=None, apellidos=None, dni=None, email=None,
                      telefono=None, parentesco=None):

    if nombres is None:
        nombres = rand_string()
    if apellidos is None:
        apellidos = rand_string()
    if dni is None:
        dni = random.randint(9000000, 50000000)
    if email is None:
        email = rand_string()
    if telefono is None:
        telefono = random.randint(1000000000, 9999999999)
    if parentesco is None:
        parentesco = rand_string()

    CuidadorForm(nombres=nombres,
                 apellidos=apellidos,
                 dni=dni,
                 email=email,
                 telefono=telefono,
                 parentesco=parentesco)


def generate_lupus_sistemico(cerebro=None, pulmones=None, corazon=None,
                             riñones=None, cutaneo=None, gastrointestinal=None,
                             oseo_musucular=None, otros=None):

    if cerebro is None:
        cerebro = rand_bool()
    if pulmones is None:
        pulmones = rand_bool()
    if corazon is None:
        corazon = rand_bool()
    if riñones is None:
        riñones = rand_bool()
    if cutaneo is None:
        cutaneo = rand_bool()
    if gastrointestinal is None:
        gastrointestinal = rand_bool()
    if oseo_musucular is None:
        oseo_musucular = rand_bool()
    if otros is None:
        otros = ','.join([rand_string() for _ in range(random.randint(1, 10))])

    return LupusSistemicoBase(cerebro=cerebro,
                              pulmones=pulmones,
                              corazon=corazon,
                              riñones=riñones,
                              cutaneo=cutaneo,
                              gastrointestinal=gastrointestinal,
                              oseo_musucular=oseo_musucular,
                              otros=otros)


def generate_medicacion(medicamento=None, dosis_mg_ml=None, frecuencia=None):
    if medicamento is None:
        medicamento = rand_string()
    if dosis_mg_ml is None:
        dosis_mg_ml = random.random() * 1000
    if frecuencia is None:
        frecuencia = random.randint(1, 27)

    return MedicacionBase(medicamento=medicamento,
                          dosis_mg_ml=dosis_mg_ml,
                          frecuencia=frecuencia)


def generate_otras_enfermedades(enfermedad=None):
    if enfermedad is None:
        enfermedad = rand_string()
    return EnfermedadBase(enfermedad=enfermedad)


def generate_experiencia_hospitalaria(unidad_hospitalaria=None,
                                      experiencia=None):
    if unidad_hospitalaria is None:
        unidad_hospitalaria = rand_string()
    if experiencia is None:
        experiencia = rand_string(512)
    return ExperienciaBase(unidad_hospitalaria=unidad_hospitalaria,
                           experiencia=experiencia)
