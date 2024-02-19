from .engine import Base, engine, Reflected


class Persona(Reflected, Base):
    __tablename__ = "persona"


class Perfil(Reflected, Base):
    __tablename__ = "perfil"


class Cuidador(Reflected, Base):
    __tablename__ = "cuidador"


class ObraSocial(Reflected, Base):
    __tablename__ = "obra_social"


class ExperienciaHospitalaria(Reflected, Base):
    __tablename__ = "experiencia_hospitalaria"


class Medicacion(Reflected, Base):
    __tablename__ = "medicacion"


class LupusSistemico(Reflected, Base):
    __tablename__ = "lupus_sistemico"


class OtrasEnfermedades(Reflected, Base):
    __tablename__ = "otras_enfermedades"
