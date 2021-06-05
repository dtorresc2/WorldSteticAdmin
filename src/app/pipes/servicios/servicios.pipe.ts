import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroServicios'
})
export class ServiciosPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) { }

  transform(value: any, args: any): any {
    let arreglo = [];
    if (args) {
      for (const servicio of value) {
        if (
          servicio.DESCRIPCION.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
          this.decimalPipe.transform(servicio.MONTO, '1.2-2').indexOf(this.decimalPipe.transform(args, '1.2-2')) > -1 ||
          servicio.MONTO.indexOf(args) > -1
        ) {
          arreglo.push(servicio);
        };
      };
      return arreglo;
    }
    else {
      return value;
    }
  }
}
