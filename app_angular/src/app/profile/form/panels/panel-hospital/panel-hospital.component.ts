import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  input,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-panel-hospital",
  standalone: false,
  templateUrl: "./panel-hospital.component.html",
  styleUrl: "./panel-hospital.component.scss",
})
export class PanelHospitalComponent {
  @Input() formGroup!: FormGroup;
  @Output() opened = new EventEmitter();
  step = input.required<number>();
  formBuilder = inject(FormBuilder);
  listControl = this.formBuilder.group({
    unidad_hospitalaria: [""],
    experiencia: [""],
  });

  tableColumns = ["unidad_hospitalaria", "experiencia", "borrar"];

  notifyOpen(value: number) {
    this.opened.emit(value);
  }

  addItem() {
    let unidad_hospitalaria = this.listControl.value.unidad_hospitalaria;
    let experiencia = this.listControl.value.experiencia;
    let arrayControl = this.formGroup.get([
      "experiencia_hospitalaria",
    ]) as FormArray;
    let uniqueValues = arrayControl.value.filter((elem: any) =>
      unidad_hospitalaria
        ? elem.toLowerCase() === unidad_hospitalaria.toLowerCase()
        : false
    );

    if (unidad_hospitalaria === "" || experiencia === "") {
      return;
    }

    if (uniqueValues.length > 0) {
      console.log("existing item!");
      return;
    }

    arrayControl.push(
      this.formBuilder.group({
        unidad_hospitalaria: [unidad_hospitalaria],
        experiencia: [experiencia],
      })
    );

    this.listControl.controls.unidad_hospitalaria.reset("");
    this.listControl.controls.experiencia.reset("");
  }

  checkUnique() {}

  removeItem(idx: number) {
    let arrayControl = this.formGroup.get([
      "experiencia_hospitalaria",
    ]) as FormArray;
    arrayControl.removeAt(idx);
  }
}
