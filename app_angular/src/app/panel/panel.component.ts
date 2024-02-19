import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: "app-panel",
  standalone: true,
  imports: [MatExpansionModule, MatDividerModule, ReactiveFormsModule],
  templateUrl: "./panel.component.html",
  styleUrl: "./panel.component.scss",
})
export class PanelComponent {
  @Input() title!: string;
  @Input() description = "";
  @Input() expanded!: boolean;
  @Output() opened = new EventEmitter();
  @Input() disabled?: boolean;
  @Input() id: number = 0;
  
  onOpen(value:number) {
    this.opened.emit(value);
  }
}
