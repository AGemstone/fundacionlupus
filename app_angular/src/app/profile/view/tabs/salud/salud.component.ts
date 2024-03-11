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
  pager: { [key: string]: number } = { medicacion: 0 };
  http = inject(HttpClient);
  backendRoot = inject(BackendProviderService).apiRoot;

  ngOnInit(): void {
    this.perfil = this.vista["perfil"] as PerfilInterface;
    this.medicacion = this.vista["medicacion"] as MedicacionInterface[];
    console.log(Object.keys(this.vista));
  }

  getObraSocial(osId: number) {
    this.http.get(`${this.backendRoot}/obra_social/`, { params: { id: osId } });
  }
  previousPage(pagerName: string) {
    this.pager[pagerName]--;
  }
  nextPage(pagerName: string) {
    this.pager[pagerName]++;
  }
}
