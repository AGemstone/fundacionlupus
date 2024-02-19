import { AbstractControl, ValidatorFn } from "@angular/forms";

export function codigoPostalValidator(): ValidatorFn {
  let regex = new RegExp("/^[a-zA-Z]\\d{4}$|^[a-zA-Z]\\d{4}[a-zA-Z]{3}$/");
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value === "" || regex.test(control.value)
      ? null
      : { cp_invalido: control.value };
}
