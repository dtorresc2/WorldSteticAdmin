import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/functions/validacionPass';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/catalogos/usuarios/usuarios.service';
import Swal from 'sweetalert2';

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
    }, {
      validators: passwordMatchValidator
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

  async registrarUsuario() {
    if (!this.usuario.invalid) {
      if (!this.modoEdicion) {
        let usuario : Usuario = {
          USUARIO : this.usuario.get('usuario').value,
          PASSWORD : this.usuario.get('pass').value,
          ESTADO : this.usuario.get('estado').value
        };

        let respuesta = await this.usuarioService.registrarUsuario(usuario);
        if ((<any>respuesta.ESTADO == 1)) {
          Swal.fire({
            title: 'Usuarios',
            text: 'Usuario registrado correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
          this.router.navigate(['catalogos', 'usuarios']);
        }
        else {
          Swal.fire({
            title: 'Usuarios',
            text: 'Fallo al registrar',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
        }
      }
      else {
        let usuario : Usuario = {
          USUARIO : this.usuario.get('usuario').value
        }

        let respuesta = await this.usuarioService.actualizarUsuario(this.ID_USUARIO, usuario);
        if ((<any>respuesta.ESTADO == 1)) {
          Swal.fire({
            title: 'Usuarios',
            text: 'Usuario actualizado correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
          this.router.navigate(['catalogos', 'usuarios']);
        }
        else {
          Swal.fire({
            title: 'Usuarios',
            text: 'Fallo al actualizar',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2a3848',
            showCloseButton: true
          });
        }
      }
    }
    else {
      Swal.fire({
        title: 'Usuarios',
        text: 'Faltan campos o hay datos incorrectos',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2a3848',
        showCloseButton: true
      });
    }
  }
}