import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'servicios'
})
export class ServiciosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
