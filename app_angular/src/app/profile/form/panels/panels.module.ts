import { NgModule } from "@angular/core";
import { AsyncPipe, CommonModule } from "@angular/common";
import { PanelSaludComponent } from "./panel-salud/panel-salud.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { PanelComponent } from "@app/panel/panel.component";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { PanelPersonalComponent } from "./panel-personal/panel-personal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CastPipe } from "@app/pipes/cast.pipe";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { PanelMedicacionComponent } from "./panel-medicacion/panel-medicacion.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { PanelLupusComponent } from "./panel-lupus/panel-lupus.component";
import { PanelHospitalComponent } from "./panel-hospital/panel-hospital.component";
import { PanelEnfermedadComponent } from "./panel-enfermedad/panel-enfermedad.component";
import { MatButtonModule } from "@angular/material/button";
import { MatSliderModule } from "@angular/material/slider";

@NgModule({
  declarations: [
    PanelSaludComponent,
    PanelPersonalComponent,
    PanelMedicacionComponent,
    PanelLupusComponent,
    PanelHospitalComponent,
    PanelEnfermedadComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    PanelComponent,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTableModule,
    AsyncPipe,
    CastPipe,
    MatButtonModule,
    MatSliderModule,
  ],
  exports: [
    PanelSaludComponent,
    PanelPersonalComponent,
    PanelMedicacionComponent,
    PanelLupusComponent,
    PanelHospitalComponent,
    PanelEnfermedadComponent,
  ],
})
export class PanelsModule {}
