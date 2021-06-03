export interface FacturaDetalle {
   ID_FACTURA?: number;
   ID_SERVICIO?: number;
   ID_DETALLE?: number;
   CANTIDAD?: number;
   BIEN_SERVICIO?: string;
   DESCRIPCION?: string;
   MONTO_UNITARIO?: number;
   MONTO?: number;
}