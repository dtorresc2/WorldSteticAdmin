import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/catalogos/usuarios/usuarios.service';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent implements OnInit {
  modoEdicion: boolean = false;
  ID_USUARIO: any = 0;

  usuario: FormGroup;

  carga: boolean = false;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private usuarioService: UsuariosService
  ) {
    this.usuario = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.pattern('^([a-z]*)$')]),
      pass: new FormControl('', [Validators.required]),
      confirmPass: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.modoEdicion = true;
      this.ID_USUARIO = params.id;
      this.rellenarFormulario(await this.usuarioService.obtenerUsuario(this.ID_USUARIO))
    }
    else {
      this.modoEdicion = false;
      this.usuario.get('estado').setValue('1');
      this.usuario.get('tipo').setValue('1');
      this.carga = true;
    }
  }

  rellenarFormulario(valores) {
    this.usuario.get('estado').setValue((<any>valores).ESTADO);
    this.usuario.get('tipo').setValue((<any>valores).ADMIN);
    this.usuario.get('usuario').setValue((<any>valores).USUARIO);
    this.usuario.get('pass').setValue('0');
    this.usuario.get('confirmPass').setValue('0');
    this.carga = true;
  }
}