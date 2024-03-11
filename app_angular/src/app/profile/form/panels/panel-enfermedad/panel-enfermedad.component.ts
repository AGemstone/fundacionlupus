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
  selector: "app-panel-enfermedad",
  standalone: false,
  templateUrl: "./panel-enfermedad.component.html",
  styleUrl: "./panel-enfermedad.component.scss",
})
export class PanelEnfermedadComponent {
  @Input() formGroup!: FormGroup;
  @Output() opened = new EventEmitter();
  step = input.required<number>();
  formBuilder = inject(FormBuilder);

  listControl = this.formBuilder.group({ enfermedad: [""] });
  tableColumns = ["enfermedad", "borrar"];

  notifyOpen(value: number) {
    this.opened.emit(value);
  }

  addItem() {
    let enfermedad = this.listControl.value.enfermedad;
    let arrayControl = this.formGroup.get(["otras_enfermedades"]) as FormArray;

    let uniqueValues = arrayControl.value.filter((elem: any) =>
      enfermedad
        ? elem.enfermedad.toLowerCase() === enfermedad.toLowerCase()
        : false
    );

    if (enfermedad === "") {
      return;
    }

    if (uniqueValues.length > 0) {
      console.log("existing item!");
      return;
    }
    arrayControl.push(this.formBuilder.group({ enfermedad: enfermedad }));

    this.listControl.controls.enfermedad.reset("");
  }

  checkUnique() {}

  removeItem(idx: number) {
    let arrayControl = this.formGroup.get(["otras_enfermedades"]) as FormArray;
    arrayControl.removeAt(idx);
  }
}
