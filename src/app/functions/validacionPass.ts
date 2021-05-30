import { FormGroup } from "@angular/forms";

export function passwordMatchValidator(g: FormGroup): { invalid: boolean } {
   return g.get('pass').value === g.get('confirmPass').value ? null : { invalid: true };
}