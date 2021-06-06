import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFacturas'
})
export class FacturasPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) { }

  transform(value: any, args: any): any {
    let arreglo = [];
    if (args) {
      for (const factura of value) {
        if (
          factura.NOMBRE_FACTURA.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
          factura.NIT.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
          factura.SERIE.toLowerCase().indexOf(args.toLowerCase()) > -1 
          // ||
          // this.decimalPipe.transform(factura.MONTO, '1.2-2').indexOf(this.decimalPipe.transform(args, '1.2-2')) > -1 ||
          // factura.MONTO.indexOf(args) > -1
        ) {
          arreglo.push(factura);
        };
      };
      return arreglo;
    }
    else {
      return value;
    }
  }

}
