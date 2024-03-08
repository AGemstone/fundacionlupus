import { Component, Input, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { Router } from "@angular/router";
import { HeaderMenuPanelItemInterface } from "@app/interfaces/header-menu-panel-item.interface";

@Component({
  selector: "app-menu-panel",
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],

  templateUrl: "./menu-panel.component.html",
  styleUrl: "./menu-panel.component.scss",
})
export class MenuPanelComponent {
  @Input() menuName!: string;
  @Input() menuItems!: HeaderMenuPanelItemInterface[];
  
  router = inject(Router);
  
  timedOutCloser: any = null;

  menuOpen(trigger: MatMenuTrigger) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  menuClose(trigger: MatMenuTrigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }
}
