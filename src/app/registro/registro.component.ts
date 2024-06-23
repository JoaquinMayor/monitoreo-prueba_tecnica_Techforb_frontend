import { Component, booleanAttribute } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../services/UsuarioService.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/perfil/Usuario';

/**
 * Componente destinado a al registro de un usuario nuevo.
 * Valida que los datos estén completos y que si el email ya se encuentra registrado.
 * Utiliza el UsuarioService y el Router.
 */
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  //Variable destinadoa  la funcionalidad de la imagen del ojo.
  hidePassword = true;
  //Ménsaje personalizado de si el usuario se encuentra ya registrado.
  mensaje:string  ="";
  //Bolleano para saber si mostrar el mensaje usuario ya encontrado.
  mostrarMensaje = false;
  constructor(private usuarioService:UsuarioService, private router:Router){
  }
//Formulario donde se solicitan los datos del usuario para registrarse.
  registro = new FormGroup({
    nombre: new FormControl("",[Validators.required]),
    apellido: new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required, Validators.email]),
    contrasenia:new FormControl("",[Validators.required, Validators.minLength(9)])
  });
  
  //Método que accede a la información del formulario para craer un nuevo usuario.
  //Valida la extención de la contraseña que tenga que ser mayor a 8 carcateres.
  //Valida si el usuario esta registrado mediante llamado a la api.
  //Valida que el email sea valido, además de los datos sean requeridos.
  registrarse(){

    this.usuarioService.existeUsuario(this.registro.get("email")?.value||"").subscribe({
      next:(response)=>{
        const existe = response.existe;
        if(!existe){
          const usuario:Usuario = new Usuario(this.registro.get("nombre")?.value||"",
          this.registro.get("apellido")?.value||"",
          this.registro.get("email")?.value||"",
          this.registro.get("contrasenia")?.value||"",
          true);
          this.usuarioService.registrarse(usuario);
          this.router.navigate([""])
        }else{
          this.mostrarMensaje = true;
          this.mensaje = "Ese mail ya se encuentra registrado"
        }

      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
