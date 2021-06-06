import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCompras'
})
export class ComprasPipe implements PipeTransform {

  transform(value: any, args: any): any {
    let arreglo = [];
    if (args) {
      for (const compra of value) {
        if (
          compra.DESCRIPCION.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
          // this.decimalPipe.transform(servicio.MONTO, '1.2-2').indexOf(this.decimalPipe.transform(args, '1.2-2')) > -1 ||
          compra.MONTO.indexOf(args) > -1
        ) {
          arreglo.push(compra);
        };
      };
      return arreglo;
    }
    else {
      return value;
    }
  }
}
