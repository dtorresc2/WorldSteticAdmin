import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroClientes'
})
export class ClientesPipe implements PipeTransform {

  transform(value: any, args: any): any {
    let arreglo = [];
    if (args) {
      for (const cliente of value) {
        if (cliente.NOMBRE.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
          cliente.NIT.toLowerCase().indexOf(args.toLowerCase()) > -1) {
            arreglo.push(cliente);
        };
      };
      return arreglo;
    }
    else {
      return value;
    }
  }
}
