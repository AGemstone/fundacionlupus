import { EnfermedadInterface } from "./enfermedad.interface";
import { ExperienciaInterface } from "./experiencia.interface";
import { LupusSistemicoInterface } from "./lupus-sistemico.interface";
import { MedicacionInterface } from "./medicacion.interface";
import { PerfilInterface } from "./perfil.interface";
import { PersonaInterface } from "./persona.interface";

export type dbDataType =
  | PerfilInterface
  | PersonaInterface
  | ExperienciaInterface[]
  | EnfermedadInterface[]
  | LupusSistemicoInterface
  | MedicacionInterface[];
