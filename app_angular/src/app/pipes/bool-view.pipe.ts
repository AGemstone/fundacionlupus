import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolView',
  standalone: true
})
export class BoolViewPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    return value? "Si" : "No";
  }

}
