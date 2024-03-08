import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "emptyStringView",
  standalone: true,
})
export class EmptyStringViewPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): string {
    if (args.length >= 1 && args[0] === "num") {
      return Number(value) !== 0 ? value : "-";
    }
    return value ? value : "-";
  }
}
