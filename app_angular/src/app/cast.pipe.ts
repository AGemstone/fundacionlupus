import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cast",
  standalone: true,
})
export class CastPipe implements PipeTransform {
  transform<T>(value: unknown, _type: (new (...args: any[]) => T) | T): T {
    return value as T;
  }
}
