import { FormControl } from "@angular/forms";

export interface PanelInterface {
  id?: string;
  depends?: { parent_id: string; input_name: string };
  title: string;
  description: string;
  disabled: boolean;
  inputs: {
    name: string;
    type: string;
    label: string;
    control: FormControl;
  }[];
}
