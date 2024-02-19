import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
  input,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Observable, startWith, map } from "rxjs";
import { IObraSocial } from "@app/interfaces/iobra-social";
import { BackendProviderService } from "@app/backend-provider.service";

@Component({
  selector: "app-panel-salud",
  standalone: false,
  // imports: [],
  templateUrl: "./panel-salud.component.html",
  styleUrl: "./panel-salud.component.scss",
})
export class PanelSaludComponent implements OnInit {
  formBuilder = inject(FormBuilder).nonNullable;
  @Input() formGroup!: FormGroup;
  @Output() opened = new EventEmitter();
  step = input.required<number>();

  http = inject(HttpClient);
  backend = inject(BackendProviderService);
  @Input() edad!: number;
  cuidador_check = this.formBuilder.control(true);
  obra_social_check = this.formBuilder.control(false);

  provincias = [
    "Buenos Aires",
    "Ciudad Autónoma de Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán",
  ];
  formGroup_T = FormGroup;
  obrasSociales: IObraSocial[] = [];
  obrasSocialesFiltered: Observable<{ name: string; rnos: number | null }[]> =
    new Observable<{ name: string; rnos: number | null }[]>();

  constructor() {
    this.http
      .get<IObraSocial[]>(`${this.backend.apiRoot}/extra/obra_social`)
      .subscribe((data) => {
        this.obrasSociales = data;
      });
  }

  ngOnInit() {
    console.log(this.obrasSociales);
    this.cuidador_check.valueChanges.subscribe(() => {
      if (this.edad < 18) {
        this.cuidador_check.setValue(true, { emitEvent: false });
      }
    });

    this.obrasSocialesFiltered = this.formGroup
      .get(["obra_social", "id"])!
      .valueChanges.pipe(
        startWith(""),
        map((value) => this._filterObraSociales(value || ""))
      );
    // console.log(this.formGroup);
  }

  private _filterObraSociales(
    value: string
  ): { name: string; rnos: number | null }[] {
    const searchValue = value.toLowerCase();
    const obrasSocialesStr = this.obrasSociales.map((obra_social) => {
      return {
        name: `${obra_social.nombre} (${obra_social.sigla})`,
        rnos: obra_social.rnos,
      };
    });
    return obrasSocialesStr.filter((option) =>
      option.name.toLowerCase().includes(searchValue)
    );
  }

  notifyOpen(value: number) {
    // console.log(this.formGroup.get().disabled)
    this.opened.emit(value);
  }

  toggleControlEnable(prop: string | string[], ignore?: boolean) {
    if (ignore) return;
    let control = this.formGroup.get(prop);

    if (!control) {
      console.log(`invalid prop: ${prop}`);
      return;
    }
    if (control.enabled) control.disable();
    else control.enable();
  }
  themeCheckboxDisabled(condition: boolean) {
    if (condition) return "accent";
    return "primary";
  }
}
