import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { ActivatedRoute, Router } from "@angular/router";
import { BackendProviderService } from "@app/backend-provider.service";
import { PerfilInterface } from "@app/interfaces/perfil.interface";
import { PersonaInterface } from "@app/interfaces/persona.interface";
import { firstValueFrom, forkJoin, mergeMap, of } from "rxjs";
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

  vistas: { [key: string]: dbDataType }[] = [{}, {}, {}];
  dataLoaded = [false, false, false];

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
        this.dataLoaded[0] = true;
      });
  }
  async fetchIfNeeded(tabIndex: number) {
    const props: string[][] = [
      ["persona", "cuidador", "perfil"],
      ["perfil", "medicacion"],
      ["otras_enfermedades", "lupus_sistemico", "experiencia_hospitalaria"],
    ];

    for (let prop of props[tabIndex]) {
      console.log(this.dbData![prop]);
      if (this.dbData![prop]) {
        if (!this.vistas[tabIndex])
          this.vistas.splice(tabIndex, 0, { [prop]: this.dbData![prop] });
        else this.vistas[tabIndex][prop] = this.dbData![prop];
      } else {
        this.vistas[tabIndex][prop] = (await firstValueFrom(
          this.http.get(`${this.backendRoot}/${prop}`, {
            params: this.pacienteKey!,
            observe: "response",
          })
        ).then((response) => response.body)) as dbDataType;
      }
    }
    // this.vistas[tabIndex] = viewObject;
    // console.log(this.vistas)
    console.log(this.vistas)
    this.dataLoaded[tabIndex] = true;
  }
}
