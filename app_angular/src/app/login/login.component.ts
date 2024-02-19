import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  emailInput!: string;
  passwordInput!: string;
  onSubmit() {
    // alert(`${this.emailInput} ${this.passwordInput}`)
  }
}
