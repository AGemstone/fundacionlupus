import { Component, Injectable, inject } from "@angular/core";
import { PersonaInterface } from "@interfaces/persona.interface";
import { HttpClient } from "@angular/common/http";
import { DecimalPipe, DatePipe, KeyValuePipe } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BackendProviderService } from "@app/backend-provider.service";
import { EmptyStringViewPipe } from "@app/pipes/empty-string-view.pipe";

@Component({
  selector: "app-profile-list",
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe,
    KeyValuePipe,
    RouterLink,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    EmptyStringViewPipe
  ],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
})
export class ProfileListComponent {
  http = inject(HttpClient)
  backend = inject(BackendProviderService)
  router = inject(Router)
  
  personasData: PersonaInterface[] = [];
  displayedColumns = ["DNI", "Nombres", "Apellidos", "Email", "Telefono"];
  
  constructor() {
    this.http.get<PersonaInterface[]>(`${this.backend.apiRoot}/persona`)
      .subscribe((personas) => {
        this.personasData = personas;
      });
  }
}
