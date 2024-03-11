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
  organosAfectados: { name: string; data: { [key: string]: any } }[] | null =
    null;
  pager: { [key: string]: number } = { experiencias: 0, enfermedades: 0 };
  ngOnInit(): void {
    this.enfermedades = this.vista[
      "otras_enfermedades"
    ] as EnfermedadInterface[];
    this.experiencias = this.vista[
      "experiencia_hospitalaria"
    ] as ExperienciaInterface[];
    if (this.vista["lupus_sistemico"])
      this.organosAfectados = Object.keys(this.vista["lupus_sistemico"]).map(
        (prop) => {
          return {
            name: prop,
            data: (this.vista["lupus_sistemico"] as { [key: string]: any })[
              prop
            ],
          };
        }
      );
  }
  previousPage(pagerName: string) {
    this.pager[pagerName]--;
    console.log(this.pager)
  }
  nextPage(pagerName: string) {
    this.pager[pagerName]++;
    console.log(this.pager)
  }
}
