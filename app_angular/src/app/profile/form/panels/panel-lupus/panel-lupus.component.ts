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
  selector: "app-panel-lupus",
  standalone: false,
  templateUrl: "./panel-lupus.component.html",
  styleUrl: "./panel-lupus.component.scss",
})
export class PanelLupusComponent {
  formBuilder = inject(FormBuilder).nonNullable;
  @Input() formGroup!: FormGroup;
  @Input() disabled: boolean = false;
  @Output() opened = new EventEmitter();
  step = input.required<number>();

  organos = [
    { value: "cerebro", valueView: "Cerebro" },
    { value: "pulmones", valueView: "Pulmones" },
    { value: "corazon", valueView: "Corazon" },
    { value: "riñones", valueView: "Riñones" },
    { value: "cutaneo", valueView: "Cutaneo" },
    { value: "gastrointestinal", valueView: "Gastrointestinal" },
    { value: "oseo_musucular", valueView: "Oseo / musucular" },
  ];
  listControl = this.formBuilder.group({ organo: [""] });

  tableColumns = ["organo", "borrar"];

  notifyOpen(value: number) {
    this.opened.emit(value);
  }

  addItem() {
    let organo = this.listControl.value.organo;
    console.log(organo);
    let arrayControl = this.formGroup.get(["otros"]) as FormArray;
    let uniqueValues = arrayControl.value.filter((elem: any) =>
      organo ? elem.toLowerCase() === organo.toLowerCase() : false
    );

    if (organo === "") {
      return;
    }

    if (uniqueValues.length > 0) {
      console.log("existing item!");
      return;
    }

    arrayControl.push(this.formBuilder.control(organo));
    this.listControl.reset();
  }

  removeItem(idx: number) {
    let arrayControl = this.formGroup.get(["otros"]) as FormArray;
    arrayControl.removeAt(idx);
  }
}
