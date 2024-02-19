import { Component, Injectable } from "@angular/core";
import { IPerson } from "@interfaces/iperson";
import { HttpClient } from "@angular/common/http";
import { DecimalPipe, DatePipe, KeyValuePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BackendProviderService } from "@app/backend-provider.service";

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
  ],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
})
export class ProfileListComponent {
  personasData: IPerson[] = [];
  displayedColumns = ["dni", "nombres", "apellidos", "email", "telefono"];
  constructor(
    private http: HttpClient,
    private backend: BackendProviderService
  ) {
    let backendUrl = backend.apiRoot;
    this.http.get<IPerson[]>(`${backendUrl}/personas`).subscribe((personas) => {
      this.personasData = personas;
    });
  }
  viewProfile(id: number) {}
}
