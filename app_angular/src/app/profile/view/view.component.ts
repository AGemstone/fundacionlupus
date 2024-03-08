import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { ActivatedRoute, Router } from "@angular/router";
import { BackendProviderService } from "@app/backend-provider.service";
import { PerfilInterface } from "@app/interfaces/perfil.interface";
import { PersonaInterface } from "@app/interfaces/persona.interface";
import { forkJoin, mergeMap, of } from "rxjs";
import { ProfileTabsModule } from "./tabs/tabs.module";
import { dbDataType } from "@app/interfaces/db-data.type";

@Component({
  selector: "app-profile-view",
  standalone: true,
  imports: [ProfileTabsModule, MatTabsModule],
  templateUrl: "./view.component.html",
  styleUrl: "./view.component.scss",
})
export class ProfileViewComponent {
  router = inject(Router);
  http = inject(HttpClient);
  backendRoot = inject(BackendProviderService).apiRoot;
  route = inject(ActivatedRoute);

  pacienteKey: { [key: string]: number | string } | null = null;
  dbData: { [key: string]: dbDataType } | null = null;

  vistas: { [key: string]: dbDataType }[] = [];

  constructor() {
    this.route.queryParams
      .pipe(
        mergeMap((queryParams) =>
          forkJoin({
            perfil: this.http.get(`${this.backendRoot}/perfil/`, {
              params: queryParams,
            }),
            cuidador: this.http.get(`${this.backendRoot}/cuidador/`, {
              params: queryParams,
            }),
            params: of(queryParams),
          })
        )
      )
      .subscribe((response) => {
        this.pacienteKey = response.params;
        let vista = {
          ...(response.perfil as {
            perfil: PerfilInterface;
            persona: PersonaInterface;
          }),
          cuidador: response.cuidador as PersonaInterface,
        };
        this.dbData = { ...vista };
        this.vistas[0] = vista;
      });
  }
  fetchIfNeeded(tabIndex: number) {
    const props: string[][] = [
      ["persona", "cuidador", "perfil"],
      ["perfil", "medicacion"],
      ["otras_enfermedades", "lupus_sistemico", "experiencia_hospitalaria"],
    ];

    let viewObject: any = {};
    for (let prop of props[tabIndex]) {
      if (this.dbData![prop]) {
        viewObject[prop] = this.dbData![prop];
      } else {
        this.http
          .get(`${this.backendRoot}/${prop}`, {
            params: this.pacienteKey!,
          })
          .subscribe((response) => (viewObject[prop] = response));
      }
    }
    this.vistas[tabIndex] = viewObject;
  }
}
