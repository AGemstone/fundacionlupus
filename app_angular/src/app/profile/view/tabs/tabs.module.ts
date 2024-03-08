import { NgModule } from "@angular/core";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  SlicePipe,
  TitleCasePipe,
} from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { EmptyStringViewPipe } from "@app/pipes/empty-string-view.pipe";
import { BoolViewPipe } from "@app/pipes/bool-view.pipe";
import { EnfermedadViewComponent } from "./enfermedad/enfermedad.component";
import { PersonalViewComponent } from "./personal/personal.component";
import { SaludViewComponent } from "./salud/salud.component";
import { CastPipe } from "@app/pipes/cast.pipe";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    EnfermedadViewComponent,
    PersonalViewComponent,

    SaludViewComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,

    BoolViewPipe,
    DatePipe,
    DecimalPipe,
    EmptyStringViewPipe,
    TitleCasePipe,
    SlicePipe,
  ],
  exports: [EnfermedadViewComponent, PersonalViewComponent, SaludViewComponent],
})
export class ProfileTabsModule {}
