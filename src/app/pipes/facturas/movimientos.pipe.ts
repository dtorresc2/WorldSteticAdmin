import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroMovimientos'
})
export class MovimientosPipe implements PipeTransform {

  transform(value: any, args: any, cargo_abono: any): any {
    let arreglo = value;
    let arregloAux = [];

    if (cargo_abono) {
      arreglo = value;
      arreglo = arreglo.filter(x => x.CARGO_ABONO == cargo_abono);
    }

    if (args) {
      for (const movimiento of arreglo) {
        if (
          movimiento.DESCRIPCION.toLowerCase().indexOf(args.toLowerCase()) > -1
        ) {
          arregloAux.push(movimiento);
        };
      };
      return arregloAux;
    }
    else {
      return arreglo;
    }
  }
}