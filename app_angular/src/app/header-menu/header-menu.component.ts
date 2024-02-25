import { Component, inject } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";
import { Router } from "@angular/router";
import { MenuPanelComponent } from "@app/menu-panel/menu-panel.component";

@Component({
  selector: "app-header-menu",
  standalone: true,
  imports: [MatToolbarModule, NgOptimizedImage, MenuPanelComponent],
  templateUrl: "./header-menu.component.html",
  styleUrl: "./header-menu.component.scss",
})
export class HeaderMenuComponent {
  router = inject(Router);
  menuMouseOver: { [key: string]: boolean } = {
    admin: false,
    perfil: false,
  };
  timedOutCloser: { [key: string]: any } = {
    admin: null,
    perfil: null,
  };

  menus = [
    {
      name: "Perfil",
      items: [{ name: "Formulario", route: "profile/form" }],
    },
    {
      name: "Admin",
      items: [{ name: "Perfiles", route: "admin/profile/list" }],
    },
  ];

  YEETLOG() {
    console.log("YEET");
  }
}
