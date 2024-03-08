import { Component, Input, OnInit } from "@angular/core";
import { dbDataType } from "@app/interfaces/db-data.type";
import { PerfilInterface } from "@app/interfaces/perfil.interface";
import { PersonaInterface } from "@app/interfaces/persona.interface";

@Component({
  selector: "app-profile-view-personal",
  standalone: false,
  templateUrl: "./personal.component.html",
  styleUrl: "./personal.component.scss",
})
export class PersonalViewComponent implements OnInit {
  @Input() vista!: { [key: string]: dbDataType };
  persona: PersonaInterface = <PersonaInterface>{};
  cuidador: PersonaInterface | null = null;
  perfil: PerfilInterface = <PerfilInterface>{};

  ngOnInit(): void {
    this.persona = this.vista["persona"] as PersonaInterface;
    this.cuidador = this.vista["persona"] as PersonaInterface | null;
    this.perfil = this.vista["perfil"] as PerfilInterface;
  }
}
