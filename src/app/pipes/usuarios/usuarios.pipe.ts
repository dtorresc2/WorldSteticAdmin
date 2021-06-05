import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuarios'
})
export class UsuariosPipe implements PipeTransform {

  transform(value: any, args: any): any {
    let arreglo = [];
    if (args) {
      for (const usuario of value) {
        if (usuario.USUARIO.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          arreglo.push(usuario);
        };
      };
      return arreglo;
    }
    else {
      return value;
    }
  }

}
