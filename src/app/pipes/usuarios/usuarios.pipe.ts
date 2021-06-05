import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuarios'
})
export class UsuariosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
