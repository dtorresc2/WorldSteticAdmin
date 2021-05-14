import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class ListaFacturasComponent implements OnInit {
  facturas = [];
  // Paginacion
  page = 1;
  pageSize = 10;

  constructor(private router: Router) { }

  ngOnInit(): void {
    for (let i = 0; i < 25; i++) {
      this.facturas.push({
        ID: (i + 1),
        SERIE: "A",
        NUMERO: (2 * i),
        NOMBRE: "Diego Roberto Torres Claros",
        NIT: "1232112312",
        FECHA: "10/10/2020",
        MONTO: 12.32,
        ESTADO: 0,
        TIPO_FACTURA: 1,
      });

      this.facturas.push({
        ID: (i + 1),
        SERIE: "A",
        NUMERO: (2 * i),
        NOMBRE: "Diego Roberto Torres Claros",
        NIT: "1232112312",
        FECHA: "10/10/2020",
        MONTO: 12.32,
        ESTADO: 1,
        TIPO_FACTURA: 0,
      });
    }
  }

  crearFactura() {
    this.router.navigate(['facturas', 'crear']);
  }

  editarFactura(id) {
    this.router.navigate(['facturas', id, 'editar']);
  }

}
