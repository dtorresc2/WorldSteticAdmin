import { FormGroup } from "@angular/forms";

export function nitMatchValidator(g: FormGroup): { nitInvalido: boolean } {
   let txtN = g.get('nit').value;

   if (txtN != '') {
      txtN = txtN.toUpperCase();

      if (txtN == "CF" || txtN == "C/F") return null;

      var nit = txtN;
      var pos = nit.indexOf("-");

      if (pos < 0) {
         var correlativo = txtN.substr(0, txtN.length - 1);
         correlativo = correlativo + "-";

         var pos2 = correlativo.length - 2;
         var digito = txtN.substr(pos2 + 1);
         nit = correlativo + digito;
         pos = nit.indexOf("-");
         txtN = nit;
      }

      var Correlativo = nit.substr(0, pos);
      var DigitoVerificador = nit.substr(pos + 1);
      var Factor = Correlativo.length + 1;
      var Suma = 0;
      var Valor = 0;

      for (let x = 0; x <= (pos - 1); x++) {
         Valor = eval(nit.substr(x, 1));
         var Multiplicacion = Valor * Factor;
         Suma = Suma + Multiplicacion;
         Factor = Factor - 1;
      }

      var xMOd11 = 0;
      xMOd11 = (11 - (Suma % 11)) % 11;
      var s = xMOd11;

      if ((xMOd11 == 10 && DigitoVerificador == "K") || (s == DigitoVerificador)) {
         return null;
      }
      else {
         return { nitInvalido: true };
      }
   }
}