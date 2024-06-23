import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../services/UsuarioService.service';
import { Router } from '@angular/router';
/**
 * Página de logueo del usuario
 * Solicita mail y contraseña registradas.
 * Valida si el usuario existe y que el mail y la contraseña sean requeridos, además de que el email sea con el formato de un email.
 * Utiliza el UsuarioService y el Router.
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  //Formulario de login solicitando email y contraseñia.
  logueo = new FormGroup({
    email: new FormControl("",[Validators.email, Validators.required]),
    contrasenia:new FormControl("",[Validators.required])
  });
  //Mensaje que se actualiza en base al error ocurrido
  mensaje:string = "";
  //Variable para el sistema de mostrar el ojo tachado o no.
  hidePassword = true;

  constructor(private usuarioService:UsuarioService, private router:Router){}
//Método de logueo que valida el email tanto en su estructura como si es valdio.
//En caso de loguearse con exito te redirige al dashboard, recibe y almacena el token y los datos del usuario.
  async login(){
    localStorage.setItem("email",this.logueo.get("email")?.value || "")
    await this.usuarioService.login(this.logueo.get("email")?.value || "", this.logueo.get("contrasenia")?.value ||"")
    .subscribe({next:async (response) => {
      await this.usuarioService.guardarToken(response.token);
      await this.usuarioService.guardarUsuario(response.email);
      this.router.navigate(["dashboard"]);
    },
    error:(err)=>{
        this.mensaje = "Email o contraseña incorrectos";
    }
  
    })
   
  }
//Método para redireccionar a la pagina de registrar usuario.
  irRegistro(){
    this.router.navigate(["registrarse"]);
  }



}
