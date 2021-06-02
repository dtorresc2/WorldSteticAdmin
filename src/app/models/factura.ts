import { FacturaDetalle } from "./facturaDetalle";

export interface Factura {
   ID_FACTURA?: number;
   SERIE?: string;
   NUMERO_FACTURA?: number;
   NOMBRE_FACTURA?: string;
   DIRECCION_FACTURA?: string;
   MONTO?: number;
   IVA?: number;
   MONTO_SIN_IVA?: number;
   FECHA_EMISION?: string;
   ESTADO?: number;
   CONTADO_CREDITO?: number;
   ID_CLIENTE?: number;
   ID_USUARIO?: number;
   DETALLE?: Array<FacturaDetalle>;
}