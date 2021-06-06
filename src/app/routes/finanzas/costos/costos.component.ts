import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/services/compras/compra.service';

@Component({
  selector: 'app-costos',
  templateUrl: './costos.component.html',
  styleUrls: ['./costos.component.css']
})
export class CostosComponent implements OnInit {
  costos = [];
  // Paginacion
  page = 1;
  pageSize = 10;

  carga: boolean = false;
  modoEdicion: boolean = false;
  filtro: any = '';

  constructor(
    private compraService: CompraService
  ) { }

  async ngOnInit() {
    await this.obtenerCompras();
    // console.log(await this.compraService.obtenerCompras());
    // for (let i = 0; i < 25; i++) {
    //   this.costos.push({
    //     ID: (i + 1),
    //     DESCRIPCION: "COSTO",
    //     FECHA: "12/10/2020",
    //     MONTO: 12.32
    //   });
    // }
  }

  async obtenerCompras(): Promise<boolean> {
    this.carga = false;
    this.costos = await this.compraService.obtenerCompras();
    this.carga = true;
    return true;
  }

}
