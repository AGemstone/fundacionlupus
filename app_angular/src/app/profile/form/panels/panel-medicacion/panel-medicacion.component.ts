import {
  Component,
  EventEmitter,
  Input,
  Output,
  input,
  inject,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-panel-medicacion",
  standalone: false,
  templateUrl: "./panel-medicacion.component.html",
  styleUrl: "./panel-medicacion.component.scss",
})
export class PanelMedicacionComponent {
  @Input() formGroup!: FormGroup;
  @Output() opened = new EventEmitter();

  step = input.required<number>();
  formBuilder = inject(FormBuilder).nonNullable;
  listControl = this.formBuilder.group({
    medicamento: [""],
    dosis_mg_ml: [""],
    frecuencia: [1],
  });

  fuentesMedicacion = [
    {
      value: "Obra Social",
      valueView: "Me la cubre completamente la obra social.",
    },
    {
      value: "Mixto",
      valueView: "Me la cubre parcialmente la obra social",
    },
    {
      value: "Ingresos propios",
      valueView: "La pago de mis ingresos en su totalidad",
    },
  ];

  sliderView(value: string): string {
    let freq_str = ["Cada 48 horas", "Cada 72 horas", "Semanalmente"];
    let frecuencia = Number(value);
    if (frecuencia! < 25) return `Cada ${frecuencia} horas`;
    else return `${freq_str[frecuencia - 25]}`;
  }

  tableColumns = ["medicamento", "dosis_mg_ml", "frecuencia", "borrar"];

  notifyOpen(value: number) {
    this.opened.emit(value);
  }

  addItem() {
    let medicamento = this.listControl.value.medicamento;
    let dosis = this.listControl.value.dosis_mg_ml;

    let arrayControl = this.formGroup.get(["list"]) as FormArray;
    let uniqueValues = arrayControl.value.filter((elem: any) =>
      medicamento
        ? elem.medicamento.toLowerCase() === medicamento.toLowerCase()
        : false
    );

    if (medicamento === "" || dosis === "") {
      return;
    }

    if (uniqueValues.length > 0) {
      console.log("existing item!");
      return;
    }

    arrayControl.push(
      this.formBuilder.group({
        medicamento: [medicamento],
        dosis_mg_ml: [dosis],
        frecuencia: this.listControl.value.frecuencia,
      })
    );
    this.listControl.reset();
  }

  removeItem(idx: number) {
    let arrayControl = this.formGroup.get(["list"]) as FormArray;
    arrayControl.removeAt(idx);
  }
}
