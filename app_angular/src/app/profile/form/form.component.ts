import { Component, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { formatDate } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { BackendProviderService } from "../../backend-provider.service";
import { PanelsModule } from "./panels/panels.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { catchError, map, firstValueFrom, of } from "rxjs";
import { codigoPostalValidator } from "@app/custom-validators/codigoPostal.validator";

@Component({
  selector: "app-profile-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    PanelsModule,
  ],
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss",
})
export class ProfileFormComponent {
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  backend = inject(BackendProviderService);

  panelControl = this.formBuilder.group({
    personal: this.formBuilder.group({
      nombres: ["", Validators.required],
      apellidos: ["", Validators.required],
      dni: [, [Validators.required, Validators.min(0)]],
      sexo: ["", Validators.required],
      estado_civil: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telefono: ["", Validators.min(0)],
      fecha_nacimiento: ["", Validators.required],
      ocupacion: [""],
    }),
    salud: this.formBuilder.group({
      ubicacion: this.formBuilder.group({
        provincia: ["", Validators.required],
        localidad: [""],
        barrio: [""],
        direccion: [""],
        codigo_postal: ["", codigoPostalValidator()],
      }),
      cud: [false],
      visita_check: [false],
      tipo_lupus: ["", Validators.required],
      fecha_diagnostico: ["", Validators.required],
      fecha_visita: ["", Validators.required],
      urgencia_check: [false],
      obra_social: this.formBuilder.group({
        id: [{ value: "", disabled: true }],
        rnos: [{ value: "", disabled: true }, Validators.required],
      }),
      cuidador: this.formBuilder.group({
        nombres: ["", Validators.required],
        apellidos: ["", Validators.required],
        dni: ["", Validators.required],
        email: ["", Validators.required],
        telefono: ["", Validators.required],
        parentesco: ["", Validators.required],
      }),
    }),
    lupus_sistemico: this.formBuilder.group({
      cerebro: [false],
      pulmones: [false],
      corazon: [false],
      riñones: [false],
      cutaneo: [false],
      gastrointestinal: [false],
      oseo_musucular: [false],
      otros: this.formBuilder.array([]),
    }),
    medicacion: this.formBuilder.group({
      check: [false],
      fuente: ["", Validators.required],
      list: this.formBuilder.array([]),
    }),
    experiencia_hospitalaria: this.formBuilder.array([]),
    otras_enfermedades: this.formBuilder.array([]),
  });

  step = 0;

  setStep(value: number) {
    this.step = value;
  }

  calcAge(): number {
    if (this.panelControl.value.personal!.fecha_nacimiento === "") return 0;
    let nacimiento = new Date(
      this.panelControl.value.personal!.fecha_nacimiento!
    ).getTime();
    return new Date(new Date().getTime() - nacimiento).getUTCFullYear() - 1970;
  }

  async onSubmit() {
    let getUserStatus = await firstValueFrom(
      this.http
        .get(`${this.backend.apiRoot}/perfil/`, {
          params: {
            nombres: this.panelControl.value.personal!.nombres!,
            apellidos: this.panelControl.value.personal!.apellidos!,
            dni: this.panelControl.value.personal!.dni!,
          },
          observe: "response",
        })
        .pipe(
          map((response) => response.status),
          catchError((response) => {
            return of(response.status);
          })
        )
    );

    if (getUserStatus === null) return;
    if (this.panelControl.invalid) {
      return;
    }

    let { otros, ...organos } = this.panelControl.value.lupus_sistemico!;
    let formDataLupusSistemico = { otros: otros?.join(), ...organos };
    let {
      sexo,
      estado_civil,
      ocupacion,
      telefono,
      fecha_nacimiento,
      ...formDataPersonal
    } = this.panelControl.value.personal!;
    let {
      obra_social,
      fecha_diagnostico,
      fecha_visita,
      ubicacion,
      ...formDataSalud
    } = this.panelControl.value.salud!;

    let formDataSubmit = {
      persona: {
        ...formDataPersonal,
        telefono: Number(telefono),
        fecha_nacimiento: formatDate(fecha_nacimiento!, "yyyy-MM-dd", "en"),
      },
      cuidador: this.panelControl.get(["salud", "cuidador"])!.enabled
        ? this.panelControl.value.salud!.cuidador
        : null,
      perfil: {
        ...formDataSalud,
        sexo: sexo,
        estado_civil: estado_civil,
        ocupacion: ocupacion,
        obra_social: obra_social ? obra_social.rnos : null,
        fecha_diagnostico: formatDate(fecha_diagnostico!, "yyyy-MM-dd", "en"),
        ultima_visita: formatDate(fecha_visita!, "yyyy-MM-dd", "en"),
        medicacion_check: this.panelControl.value.medicacion!.check,
        fuente_medicacion: this.panelControl.value.medicacion!.fuente,
      },
      ubicacion: ubicacion,
      lupus_sistemico:
        formDataSalud.tipo_lupus === "Sistemico"
          ? formDataLupusSistemico
          : null,
      otras_enfermedades: this.panelControl.value.otras_enfermedades,
      medicacion: this.panelControl.value.medicacion!.list,
      experiencia_hospitalaria:
        this.panelControl.value.experiencia_hospitalaria,
    };

    this.http
      .post(`${this.backend.apiRoot}/perfil/`, formDataSubmit)
      .subscribe();
  }
}
