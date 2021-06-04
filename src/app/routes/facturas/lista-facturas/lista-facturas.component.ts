import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from 'src/app/services/facturas/factura.service';
import Swal from 'sweetalert2';

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
    await this.obtenerFacturas();
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

  async eliminarFactura(id) {
    Swal.fire({
      title: '¿Desea eliminar la factura?',
      text: "No se puede revertir esta accion.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2a3848',
      cancelButtonColor: '#dd4236',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let respuesta = await this.facturaService.eliminarFactura(id);
        if ((<any>respuesta.ESTADO == 1)) {
          Swal.fire({
            title: 'Facturas',
            text: 'Factura eliminada correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
          await this.obtenerFacturas();
        }
        else {
          Swal.fire({
            title: 'Facturas',
            text: 'Fallo al eliminar',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
        }
      }
    });
  }

  async anularFactura(id) {
    Swal.fire({
      title: '¿Desea anular la factura?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2a3848',
      cancelButtonColor: '#dd4236',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let respuesta = await this.facturaService.anularFactura(id);
        if ((<any>respuesta.ESTADO == 1)) {
          Swal.fire({
            title: 'Facturas',
            text: 'Factura anulada correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
          await this.obtenerFacturas();
        }
        else {
          Swal.fire({
            title: 'Facturas',
            text: 'Fallo al anular',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
        }
      }
    });
  }

  async habilitarFactura(id) {
    Swal.fire({
      title: '¿Desea habilitar la factura?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2a3848',
      cancelButtonColor: '#dd4236',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let respuesta = await this.facturaService.anularFactura(id);
        if ((<any>respuesta.ESTADO == 1)) {
          Swal.fire({
            title: 'Facturas',
            text: 'Factura habilitada correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
          await this.obtenerFacturas();
        }
        else {
          Swal.fire({
            title: 'Facturas',
            text: 'Fallo al habilitar',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
        }
      }
    });
  }


  async obtenerFacturas(): Promise<boolean> {
    this.carga = false;
    this.facturas = await this.facturaService.obtenerFacturas();
    this.carga = true;
    return true;
  }
}
