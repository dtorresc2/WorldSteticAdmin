import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovimientoService } from 'src/app/services/facturas/movimiento.service';

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

  carga: boolean = false;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private movimientoService: MovimientoService
  ) { }

  async ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      await this.obtenerMovimientos(params.id);
    }
  }

  async obtenerMovimientos(id):Promise<boolean> {
    this.carga = false;
    this.movimientos = await this.movimientoService.obtenerMovimientos(id);
    this.carga = true;
    return false;
  }
}
