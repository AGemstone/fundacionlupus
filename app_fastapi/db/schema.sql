CREATE TABLE IF NOT EXISTS lupus_db;
-- Enums 
CREATE TYPE IF NOT EXISTS T_sexo AS ENUM('Masculino', 'Femenino');
CREATE TYPE IF NOT EXISTS T_estado_civil AS ENUM(
    'Soltero',
    'Casado',
    'Unión libre o unión de hecho',
    'Separado',
    'Divorciado',
    'Viudo'
);
CREATE TYPE IF NOT EXISTS T_provincia AS ENUM(
    'Buenos Aires',
    'Ciudad Autónoma de Buenos Aires',
    'Catamarca',
    'Chaco',
    'Chubut',
    'Córdoba',
    'Corrientes',
    'Entre Ríos',
    'Formosa',
    'Jujuy',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'Misiones',
    'Neuquén',
    'Río Negro',
    'Salta',
    'San Juan',
    'San Luis',
    'Santa Cruz',
    'Santa Fe',
    'Santiago del Estero',
    'Tierra del Fuego, Antártida e Islas del Atlántico Sur',
    'Tucumán'
);
CREATE TYPE IF NOT EXISTS T_fuente AS ENUM('Obra Social', 'Ingresos propios', 'Mixto');
CREATE TYPE IF NOT EXISTS T_lupus AS ENUM('Sistemico', 'Discoide', 'Indefinido');
-- Table schemas
CREATE TABLE IF NOT EXISTS persona(
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(128) NOT NULL,
    apellidos VARCHAR(128) NOT NULL,
    fecha_nacimiento DATE,
    dni BIGINT UNIQUE NOT NULL,
    email VARCHAR(254),
    telefono BIGINT,
    CHECK(email IS NOT NULL OR telefono IS NOT NULL)
);
CREATE TABLE IF NOT EXISTS cuidador(
    id SERIAL PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_cuidador INT NOT NULL,
    parentesco VARCHAR(64) NOT NULL,
    CHECK(id_cuidador != id_paciente),
    UNIQUE(id_cuidador, id_paciente),
    FOREIGN KEY (id_paciente) REFERENCES persona(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cuidador) REFERENCES persona(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS obra_social(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(300) NOT NULL
    -- sigla VARCHAR(20)
);
CREATE TABLE IF NOT EXISTS perfil(
    id INT PRIMARY KEY,
    id_cuidador INT,
    sexo T_sexo NOT NULL,
    estado_civil T_estado_civil NOT NULL,
    ocupacion VARCHAR(128),
    -- Ubicacion
    provincia T_provincia NOT NULL,
    localidad VARCHAR(128),
    barrio VARCHAR(128),
    direccion VARCHAR(128),
    codigo_postal VARCHAR(8),
    -- Medico
    obra_social INT,
    cud BOOLEAN NOT NULL,
    medicacion_check BOOLEAN NOT NULL,
    visita_check BOOLEAN NOT NULL,
    urgencia_check BOOLEAN NOT NULL,
    fecha_diagnostico DATE NOT NULL,
    ultima_visita DATE NOT NULL,
    fuente_medicacion T_fuente NOT NULL,
    tipo_lupus T_lupus NOT NULL,
    FOREIGN KEY (obra_social) REFERENCES obra_social(rnos),
    FOREIGN KEY (id) REFERENCES persona(id) ON DELETE CASCADE
    -- FOREIGN KEY (id_cuidador) REFERENCES cuidador(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS medicacion(
    id BIGSERIAL PRIMARY KEY,
    id_paciente INT NOT NULL,
    medicamento VARCHAR(64) NOT NULL,
    dosis_mg_ml REAL NOT NULL,
    -- <24: horas
    -- 25: 48 horas
    -- 26: 72 horas
    -- 27: Semanalmente
    frecuencia INT NOT NULL,
    UNIQUE(id_paciente, medicamento),
    CHECK(frecuencia <= 27),
    FOREIGN KEY (id_paciente) REFERENCES perfil(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS otras_enfermedades(
    id SERIAL PRIMARY KEY,
    id_paciente INT NOT NULL,
    enfermedad VARCHAR(64),
    FOREIGN KEY (id_paciente) REFERENCES perfil(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS lupus_sistemico(
    id_paciente INT PRIMARY KEY,
    cerebro BOOLEAN NOT NULL,
    pulmones BOOLEAN NOT NULL,
    corazon BOOLEAN NOT NULL,
    riñones BOOLEAN NOT NULL,
    cutaneo BOOLEAN NOT NULL,
    gastrointestinal BOOLEAN NOT NULL,
    oseo_musucular BOOLEAN NOT NULL,
    otros TEXT,
    FOREIGN KEY (id_paciente) REFERENCES perfil(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS  experiencia_hospitalaria(
    id SERIAL PRIMARY KEY,
    id_paciente INT,
    unidad_hospitalaria VARCHAR(128) NOT NULL,
    experiencia TEXT,
    UNIQUE(id_paciente, unidad_hospitalaria),
    FOREIGN KEY (id_paciente) REFERENCES perfil(id) ON DELETE SET NULL
);