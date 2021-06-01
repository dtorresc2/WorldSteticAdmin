import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from 'src/app/services/facturas/factura.service';

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

  carga: boolean = false;

  constructor(
    private router: Router,
    private facturaService: FacturaService
  ) { }

  async ngOnInit() {
    this.carga = false;
    this.facturas = await this.facturaService.obtenerFacturas();
    this.carga = true;
  }

  crearFactura() {
    this.router.navigate(['facturas', 'crear']);
  }

  editarFactura(id) {
    this.router.navigate(['facturas', id, 'editar']);
  }

  verMovimientos(id) {
    this.router.navigate(['facturas', id, 'movimientos']);
  }

}
