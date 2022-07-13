import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Usuario } from '../interfaces/usuario';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuarios: Usuario[] = [];

  usuarioFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    correo: ['', [Validators.required, Validators.minLength(8)]],
  });


  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  async guardar() {

    if (this.usuarioFormulario.invalid) {
      this.usuarioFormulario.markAllAsTouched();
      return;
    }

    const response = await this.usuariosService.crearUsuario(this.usuarioFormulario.value);
  }

  campoEsValido(campo: string) {
    return this.usuarioFormulario.controls[campo].errors && this.usuarioFormulario.controls[campo].touched;
  }

  async borrar(usuario: Usuario) {
    const response = await this.usuariosService.borrarUsuario(usuario);
    console.log(response);
  }

}
