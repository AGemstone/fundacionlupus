import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { HeaderMenuComponent } from "@app/header-menu/header-menu.component";
import { FooterComponent } from "@app/footer/footer.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderMenuComponent,
    FooterComponent,
    FontAwesomeModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "front_lupus";
}
