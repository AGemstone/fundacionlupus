import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  computed,
  inject,
  input,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { PanelComponent } from "@app/panel/panel.component";

@Component({
  selector: "app-panel-personal",
  standalone: false,

  templateUrl: "./panel-personal.component.html",
  styleUrl: "./panel-personal.component.scss",
})
export class PanelPersonalComponent {
  formBuilder = inject(FormBuilder);

  estadosCiviles = [
    "Soltero",
    "Casado",
    "Unión libre o unión de hecho",
    "Separado",
    "Divorciado",
    "Viudo",
  ];

  @Input() formGroup!: FormGroup;
  @Output() opened = new EventEmitter();
  step = input.required<number>();
  // a = this.formGroup.controls['email']

  handleError(prop: string): string {
    let err = this.formGroup.controls[prop].errors;
    if (!err) return "";
    if (err!["required"]) return "Este campo es obligatorio.";
    else if (err!["email"]) return "Email invalido!";
    else return "";
  }

  notifyOpen(value: number) {
    this.handleError("email");
    this.opened.emit(value);
  }
}
