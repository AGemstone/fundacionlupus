import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";
import { Router } from "@angular/router";
@Component({
  selector: "app-header-menu",
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgOptimizedImage,
  ],
  templateUrl: "./header-menu.component.html",
  styleUrl: "./header-menu.component.scss",
})
export class HeaderMenuComponent {
  router = inject(Router);

  menuOpen(trigger: MatMenuTrigger) {
    setTimeout(() => trigger.openMenu(), 100);
  }
  menuClose(trigger: MatMenuTrigger) {
    setTimeout(() => trigger.closeMenu(), 100);
  }
}
