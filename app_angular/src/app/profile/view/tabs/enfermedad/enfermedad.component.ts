import { Component, Input, OnInit } from "@angular/core";
import { dbDataType } from "@app/interfaces/db-data.type";
import { EnfermedadInterface } from "@app/interfaces/enfermedad.interface";
import { ExperienciaInterface } from "@app/interfaces/experiencia.interface";
import { LupusSistemicoInterface } from "@app/interfaces/lupus-sistemico.interface";

@Component({
  selector: "app-profile-view-enfermedad",
  standalone: false,
  templateUrl: "./enfermedad.component.html",
  styleUrl: "./enfermedad.component.scss",
})
export class EnfermedadViewComponent implements OnInit {
  @Input() vista!: { [key: string]: dbDataType };
  enfermedades: EnfermedadInterface[] = [];
  experiencias: ExperienciaInterface[] = [];
  organosAfectados = {
    keys: Object.keys(<LupusSistemicoInterface>{}),
    data: <{ [key: string]: number | boolean | string }>{},
  };
  experienciasPagina = 0;
  enfermedadesPagina = 0;
  ngOnInit(): void {
    this.enfermedades = this.vista[
      "otras_enfermedades"
    ] as EnfermedadInterface[];
    this.experiencias = this.vista[
      "experiencia_hospitalaria"
    ] as ExperienciaInterface[];
    this.organosAfectados.data = this.vista["lupus_sistematico"] as {
      [key: string]: number | boolean | string;
    };
  }
}
