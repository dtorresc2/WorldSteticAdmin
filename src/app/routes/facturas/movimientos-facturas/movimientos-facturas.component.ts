import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimientos-facturas',
  templateUrl: './movimientos-facturas.component.html',
  styleUrls: ['./movimientos-facturas.component.css']
})
export class MovimientosFacturasComponent implements OnInit {
  movimientos = [];
  // Paginacion
  page = 1;
  pageSize = 10;

  closeResult = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < 25; i++) {
      this.movimientos.push({
        ID: (i + 1),
        TIPO_MOVIMIENTO: 1,
        NUMERO: (2 * i) + 1,
        NOMBRE: "Diego Roberto Torres Claros",
        FECHA: "10/10/2020",
        MONTO: 12.32,
        ESTADO: 0
      });

      this.movimientos.push({
        ID: (i + 1),
        TIPO_MOVIMIENTO: 0,
        NUMERO: (2 * i) + 2,
        NOMBRE: "Diego Roberto Torres Claros",
        FECHA: "10/10/2020",
        MONTO: 12.32,
        ESTADO: 1
      });
    }
  }
}
