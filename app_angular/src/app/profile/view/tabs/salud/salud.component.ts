import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit, inject } from "@angular/core";
import { BackendProviderService } from "@app/backend-provider.service";
import { PerfilInterface } from "@app/interfaces/perfil.interface";
import { dbDataType } from "@app/interfaces/db-data.type";
import { MedicacionInterface } from "@app/interfaces/medicacion.interface";
@Component({
  selector: "app-profile-view-salud",
  standalone: false,
  templateUrl: "./salud.component.html",
  styleUrl: "./salud.component.scss",
})
export class SaludViewComponent implements OnInit {
  @Input() vista!: { [key: string]: dbDataType };
  perfil: PerfilInterface = <PerfilInterface>{};
  medicacion: MedicacionInterface[] = [];
  // = [{
  //   id: 1,
  //   medicamento: 'string',
  //   dosis_mg_ml: 0,
  //   frecuencia: 0
  // },
  // {
  //   id: 1,
  //   medicamento: 'string',
  //   dosis_mg_ml: 0,
  //   frecuencia: 0
  // },
  // {
  //   id: 1,
  //   medicamento: 'string',
  //   dosis_mg_ml: 0,
  //   frecuencia: 0
  // },
  // {
  //   id: 1,
  //   medicamento: 'string',
  //   dosis_mg_ml: 0,
  //   frecuencia: 0
  // },
  // {
  //   id: 1,
  //   medicamento: 'string',
  //   dosis_mg_ml: 0,
  //   frecuencia: 0
  // },
  // {
  //   id: 1,
  //   medicamento: 'string',
  //   dosis_mg_ml: 0,
  //   frecuencia: 0
  // },];
  medicacionPagina = 0;
  http = inject(HttpClient);
  backendRoot = inject(BackendProviderService).apiRoot;

  ngOnInit(): void {
    this.perfil = this.vista["perfil"] as PerfilInterface;
    this.medicacion = this.vista["medicacion"] as MedicacionInterface[];
  }

  getObraSocial(osId: number) {
    this.http.get(`${this.backendRoot}/obra_social/`, { params: { id: osId } });
  }
}
